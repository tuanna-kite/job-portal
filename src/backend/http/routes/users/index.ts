import { Hono } from "hono";

import { prisma } from "@/backend/db";
import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { authMiddleware } from "@/backend/http/middlewares/auth.middleware";

import type { CreateUserDto } from "@/shared/validation/users/create-user.schema";
import type { UpdateUserDto } from "@/shared/validation/users/update-user.schema";

const UsersRoute = new Hono();

UsersRoute.post("/", authMiddleware, async (ctx) => {
  const dto = await ctx.req.json<CreateUserDto>();

  const user = await prisma.user.create({
    data: {
      fullName: dto.fullName,
      gender: dto.gender,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
      disabilityType: dto.disabilityType,
      skills: dto.skills || [],
      desiredJob: dto.desiredJob,
      regionId: dto.regionId,
      repId: dto.repId,
      status: dto.status,
    },
  });

  return ctx.json(ResponseBuilder.ok(user));
});

UsersRoute.get("/", authMiddleware, async (ctx) => {
  const { searchParams } = new URL(ctx.req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const regionId = searchParams.get("regionId");
  const repId = searchParams.get("repId");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: any = {};

  if (regionId) where.regionId = regionId;
  if (repId) where.repId = repId;
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { disabilityType: { contains: search, mode: "insensitive" } },
      { desiredJob: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        region: true,
        representative: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where }),
  ]);

  return ctx.json(
    ResponseBuilder.ok({
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }),
  );
});

UsersRoute.get("/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      region: true,
      representative: true,
      cases: {
        include: {
          opportunity: true,
          assignedRep: true,
        },
      },
      needReports: true,
    },
  });

  if (!user) {
    const exception = HttpExceptionBuilder.notFound("User not found");
    return ctx.json(exception, 404);
  }

  return ctx.json(ResponseBuilder.ok(user));
});

UsersRoute.patch("/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");
  const dto = await ctx.req.json<UpdateUserDto>();

  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    const exception = HttpExceptionBuilder.notFound("User not found");
    return ctx.json(exception, 404);
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      fullName: dto.fullName,
      gender: dto.gender,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : undefined,
      disabilityType: dto.disabilityType,
      skills: dto.skills,
      desiredJob: dto.desiredJob,
      regionId: dto.regionId,
      repId: dto.repId,
      status: dto.status,
    },
    include: {
      region: true,
      representative: true,
    },
  });

  return ctx.json(ResponseBuilder.ok(user));
});

UsersRoute.delete("/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");

  const existingUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!existingUser) {
    const exception = HttpExceptionBuilder.notFound("User not found");
    return ctx.json(exception, 404);
  }

  await prisma.user.update({
    where: { id },
    data: { status: "archived" },
  });

  return ctx.json(ResponseBuilder.ok(null));
});

UsersRoute.get("/:id/cases", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    const exception = HttpExceptionBuilder.notFound("User not found");
    return ctx.json(exception, 404);
  }

  const cases = await prisma.case.findMany({
    where: { userId: id },
    include: {
      opportunity: true,
      assignedRep: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return ctx.json(ResponseBuilder.ok(cases));
});

export default UsersRoute;

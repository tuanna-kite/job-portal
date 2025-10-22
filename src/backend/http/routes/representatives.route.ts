import { Hono } from "hono";

import { prisma } from "@/backend/db";
import { HashingHelper } from "@/backend/helpers/hashing.helper";
import { HttpExceptionBuilder } from "@/backend/http/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/response-builder";
import { RequestValidation } from "@/backend/http/validations/request-validation";
import { authMiddleware } from "@/backend/middlewares/auth.middleware";
import { CreateRepSchema } from "@/shared/validation/reps/create-rep.schema";
import { UpdateRepSchema } from "@/shared/validation/reps/update-rep.schema";

import type { CreateRepDto } from "@/shared/validation/reps/create-rep.schema";
import type { UpdateRepDto } from "@/shared/validation/reps/update-rep.schema";

const RepresentativesRoute = new Hono().basePath("/api/reps");

RepresentativesRoute.post(
  "/",
  RequestValidation.json(CreateRepSchema),
  authMiddleware,
  async (ctx) => {
    const dto = await ctx.req.json<CreateRepDto>();
    const admin = ctx.get("admin");

    if (admin.role !== "super_admin") {
      const exception = HttpExceptionBuilder.forbidden();
      return ctx.json(exception, 403);
    }

    const existingRep = await prisma.representative.findUnique({
      where: { email: dto.email },
    });

    if (existingRep) {
      const exception = HttpExceptionBuilder.conflict("Email already exists");
      return ctx.json(exception, 409);
    }

    const hashedPassword = await HashingHelper.hash("defaultPassword123");

    const newAdmin = await prisma.admin.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        role: "coordinator",
      },
    });

    const rep = await prisma.representative.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        organization: dto.organization,
        regionScopeId: dto.regionScopeId,
        role: dto.role,
        accountId: newAdmin.id,
      },
      include: {
        regionScope: true,
        account: true,
      },
    });

    return ctx.json(ResponseBuilder.ok(rep));
  },
);

RepresentativesRoute.get("/", authMiddleware, async (ctx) => {
  const admin = ctx.get("admin");
  const { searchParams } = new URL(ctx.req.url);
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const regionScopeId = searchParams.get("regionScopeId");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: any = {};

  if (regionScopeId) where.regionScopeId = regionScopeId;
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { organization: { contains: search, mode: "insensitive" } },
    ];
  }

  const [reps, total] = await Promise.all([
    prisma.representative.findMany({
      where,
      include: {
        regionScope: true,
        account: true,
        _count: {
          select: {
            users: true,
            assignedCases: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.representative.count({ where }),
  ]);

  return ctx.json(
    ResponseBuilder.ok({
      data: reps,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }),
  );
});

RepresentativesRoute.patch(
  "/:id",
  RequestValidation.json(UpdateRepSchema),
  authMiddleware,
  async (ctx) => {
    const admin = ctx.get("admin");
    const id = ctx.req.param("id");
    const dto = await ctx.req.json<UpdateRepDto>();

    const existingRep = await prisma.representative.findUnique({
      where: { id },
    });

    if (!existingRep) {
      const exception = HttpExceptionBuilder.notFound("Representative not found");
      return ctx.json(exception, 404);
    }

    const rep = await prisma.representative.update({
      where: { id },
      data: {
        fullName: dto.fullName,
        phone: dto.phone,
        organization: dto.organization,
        regionScopeId: dto.regionScopeId,
        role: dto.role,
        status: dto.status,
      },
      include: {
        regionScope: true,
        account: true,
      },
    });

    return ctx.json(ResponseBuilder.ok(rep));
  },
);

RepresentativesRoute.get("/:id/users", authMiddleware, async (ctx) => {
  const admin = ctx.get("admin");
  const id = ctx.req.param("id");

  const rep = await prisma.representative.findUnique({
    where: { id },
  });

  if (!rep) {
    const exception = HttpExceptionBuilder.notFound("Representative not found");
    return ctx.json(exception, 404);
  }

  const { searchParams } = new URL(ctx.req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const status = searchParams.get("status");

  const where: any = { repId: id };
  if (status) where.status = status;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        region: true,
        _count: {
          select: {
            cases: true,
            needReports: true,
          },
        },
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

export default RepresentativesRoute;

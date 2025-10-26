import { Hono } from "hono";

import { prisma } from "@/backend/db";
import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { authMiddleware } from "@/backend/http/middlewares/auth.middleware";

import type { CreateCaseDto } from "@/shared/validation/cases/create-case.schema";
import type { UpdateCaseDto } from "@/shared/validation/cases/update-case.schema";

const CasesRoute = new Hono();

CasesRoute.post("/", authMiddleware, async (ctx) => {
  const dto = await ctx.req.json<CreateCaseDto>();

  const user = await prisma.user.findUnique({
    where: { id: dto.userId },
  });

  if (!user) {
    const exception = HttpExceptionBuilder.notFound("User not found");
    return ctx.json(exception, 404);
  }

  const opportunity = await prisma.opportunity.findUnique({
    where: { id: dto.opportunityId },
  });

  if (!opportunity) {
    const exception = HttpExceptionBuilder.notFound("Opportunity not found");
    return ctx.json(exception, 404);
  }

  if (dto.assignedRepId) {
    const rep = await prisma.representative.findUnique({
      where: { id: dto.assignedRepId },
    });

    if (!rep) {
      const exception = HttpExceptionBuilder.notFound(
        "Representative not found",
      );
      return ctx.json(exception, 404);
    }
  }

  const case_ = await prisma.case.create({
    data: {
      userId: dto.userId,
      opportunityId: dto.opportunityId,
      assignedRepId: dto.assignedRepId,
      status: dto.status,
      notes: dto.notes,
    },
    include: {
      user: true,
      opportunity: true,
      assignedRep: true,
    },
  });

  return ctx.json(ResponseBuilder.ok(case_));
});

CasesRoute.get("/", authMiddleware, async (ctx) => {
  const { searchParams } = new URL(ctx.req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const userId = searchParams.get("userId");
  const opportunityId = searchParams.get("opportunityId");
  const assignedRepId = searchParams.get("assignedRepId");
  const status = searchParams.get("status");

  const where: any = {};

  if (userId) where.userId = userId;
  if (opportunityId) where.opportunityId = opportunityId;
  if (assignedRepId) where.assignedRepId = assignedRepId;
  if (status) where.status = status;

  const [cases, total] = await Promise.all([
    prisma.case.findMany({
      where,
      include: {
        user: {
          include: {
            region: true,
          },
        },
        opportunity: true,
        assignedRep: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.case.count({ where }),
  ]);

  return ctx.json(
    ResponseBuilder.ok({
      data: cases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }),
  );
});

CasesRoute.patch("/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");
  const dto = await ctx.req.json<UpdateCaseDto>();

  const existingCase = await prisma.case.findUnique({
    where: { id },
  });

  if (!existingCase) {
    const exception = HttpExceptionBuilder.notFound("Case not found");
    return ctx.json(exception, 404);
  }

  if (dto.assignedRepId) {
    const rep = await prisma.representative.findUnique({
      where: { id: dto.assignedRepId },
    });

    if (!rep) {
      const exception = HttpExceptionBuilder.notFound(
        "Representative not found",
      );
      return ctx.json(exception, 404);
    }
  }

  const case_ = await prisma.case.update({
    where: { id },
    data: {
      assignedRepId: dto.assignedRepId,
      status: dto.status,
      notes: dto.notes,
    },
    include: {
      user: {
        include: {
          region: true,
        },
      },
      opportunity: true,
      assignedRep: true,
    },
  });

  return ctx.json(ResponseBuilder.ok(case_));
});

CasesRoute.get("/:id/timeline", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");

  const case_ = await prisma.case.findUnique({
    where: { id },
    include: {
      user: true,
      opportunity: true,
      assignedRep: true,
    },
  });

  if (!case_) {
    const exception = HttpExceptionBuilder.notFound("Case not found");
    return ctx.json(exception, 404);
  }

  const timeline = [
    {
      id: "created",
      action: "Case created",
      timestamp: case_.createdAt,
      details: `Case created for user ${case_.user.fullName} with opportunity ${case_.opportunity.title}`,
    },
    {
      id: "updated",
      action: "Case updated",
      timestamp: case_.updatedAt,
      details: case_.notes || "Case status updated",
    },
  ];

  return ctx.json(ResponseBuilder.ok(timeline));
});

export default CasesRoute;

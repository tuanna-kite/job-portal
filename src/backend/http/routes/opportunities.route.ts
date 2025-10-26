import { Hono } from "hono";

import { prisma } from "@/backend/db";
import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { authMiddleware } from "@/backend/http/middlewares/auth.middleware";

import type { CreateOpportunityDto } from "@/shared/validation/opportunities/create-opportunity.schema";

export const OpportunitiesRoute = new Hono();

OpportunitiesRoute.post("/", authMiddleware, async (ctx) => {
  const dto = await ctx.req.json<CreateOpportunityDto>();

  const opportunity = await prisma.opportunity.create({
    data: {
      title: dto.title,
      description: dto.description,
      requirements: dto.requirements,
      locationType: dto.locationType,
      salaryRange: dto.salaryRange,
      source: dto.source,
      status: dto.status,
    },
  });

  return ctx.json(ResponseBuilder.ok(opportunity));
});

OpportunitiesRoute.get("/", authMiddleware, async (ctx) => {
  const { searchParams } = new URL(ctx.req.url);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const locationType = searchParams.get("locationType");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: any = {};

  if (locationType) where.locationType = locationType;
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { requirements: { contains: search, mode: "insensitive" } },
    ];
  }

  const [opportunities, total] = await Promise.all([
    prisma.opportunity.findMany({
      where,
      include: {
        _count: {
          select: {
            cases: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.opportunity.count({ where }),
  ]);

  return ctx.json(
    ResponseBuilder.ok({
      data: opportunities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }),
  );
});

OpportunitiesRoute.get("/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");

  const opportunity = await prisma.opportunity.findUnique({
    where: { id },
    include: {
      cases: {
        include: {
          user: true,
          assignedRep: true,
        },
      },
    },
  });

  if (!opportunity) {
    const exception = HttpExceptionBuilder.notFound("Opportunity not found");
    return ctx.json(exception, 404);
  }

  return ctx.json(ResponseBuilder.ok(opportunity));
});

OpportunitiesRoute.patch("/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");
  const dto = await ctx.req.json<Partial<CreateOpportunityDto>>();

  const existingOpportunity = await prisma.opportunity.findUnique({
    where: { id },
  });

  if (!existingOpportunity) {
    const exception = HttpExceptionBuilder.notFound("Opportunity not found");
    return ctx.json(exception, 404);
  }

  const opportunity = await prisma.opportunity.update({
    where: { id },
    data: {
      title: dto.title,
      description: dto.description,
      requirements: dto.requirements,
      locationType: dto.locationType,
      salaryRange: dto.salaryRange,
      source: dto.source,
      status: dto.status,
    },
  });

  return ctx.json(ResponseBuilder.ok(opportunity));
});

OpportunitiesRoute.delete("/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");

  const existingOpportunity = await prisma.opportunity.findUnique({
    where: { id },
  });

  if (!existingOpportunity) {
    const exception = HttpExceptionBuilder.notFound("Opportunity not found");
    return ctx.json(exception, 404);
  }

  await prisma.opportunity.update({
    where: { id },
    data: { status: "closed" },
  });

  return ctx.json(ResponseBuilder.ok(null));
});

export default OpportunitiesRoute;

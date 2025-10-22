import { Hono } from "hono";

import { prisma } from "@/backend/db";
import { HttpExceptionBuilder } from "@/backend/http/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/response-builder";
import { RequestValidation } from "@/backend/http/validations/request-validation";
import { authMiddleware } from "@/backend/middlewares/auth.middleware";
import { CreateReportSchema } from "@/shared/validation/reports/create-report.schema";
import { UpdateReportSchema } from "@/shared/validation/reports/update-report.schema";

import type { CreateReportDto } from "@/shared/validation/reports/create-report.schema";
import type { UpdateReportDto } from "@/shared/validation/reports/update-report.schema";

const ReportsRoute = new Hono().basePath("/api/reports");

ReportsRoute.post(
  "/",
  RequestValidation.json(CreateReportSchema),
  authMiddleware,
  async (ctx) => {
    const dto = await ctx.req.json<CreateReportDto>();
    const admin = ctx.get("admin");

    const user = await prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      const exception = HttpExceptionBuilder.notFound("User not found");
      return ctx.json(exception, 404);
    }

    if (dto.assignedToId) {
      const rep = await prisma.representative.findUnique({
        where: { id: dto.assignedToId },
      });

      if (!rep) {
        const exception = HttpExceptionBuilder.notFound("Representative not found");
        return ctx.json(exception, 404);
      }
    }

    const report = await prisma.needReport.create({
      data: {
        userId: dto.userId,
        createdBy: dto.createdBy,
        category: dto.category,
        description: dto.description,
        attachments: dto.attachments || [],
        assignedToId: dto.assignedToId,
      },
      include: {
        user: {
          include: {
            region: true,
          },
        },
        assignedTo: true,
      },
    });

    return ctx.json(ResponseBuilder.ok(report));
  },
);

ReportsRoute.get("/", authMiddleware, async (ctx) => {
  const admin = ctx.get("admin");
  const { searchParams } = new URL(ctx.req.url);
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const userId = searchParams.get("userId");
  const assignedToId = searchParams.get("assignedToId");
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const createdBy = searchParams.get("createdBy");

  const where: any = {};

  if (userId) where.userId = userId;
  if (assignedToId) where.assignedToId = assignedToId;
  if (status) where.status = status;
  if (category) where.category = category;
  if (createdBy) where.createdBy = createdBy;

  const [reports, total] = await Promise.all([
    prisma.needReport.findMany({
      where,
      include: {
        user: {
          include: {
            region: true,
          },
        },
        assignedTo: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.needReport.count({ where }),
  ]);

  return ctx.json(
    ResponseBuilder.ok({
      data: reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }),
  );
});

ReportsRoute.get("/:id", authMiddleware, async (ctx) => {
  const admin = ctx.get("admin");
  const id = ctx.req.param("id");

  const report = await prisma.needReport.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          region: true,
        },
      },
      assignedTo: true,
    },
  });

  if (!report) {
    const exception = HttpExceptionBuilder.notFound("Report not found");
    return ctx.json(exception, 404);
  }

  return ctx.json(ResponseBuilder.ok(report));
});

ReportsRoute.patch(
  "/:id",
  RequestValidation.json(UpdateReportSchema),
  authMiddleware,
  async (ctx) => {
    const admin = ctx.get("admin");
    const id = ctx.req.param("id");
    const dto = await ctx.req.json<UpdateReportDto>();

    const existingReport = await prisma.needReport.findUnique({
      where: { id },
    });

    if (!existingReport) {
      const exception = HttpExceptionBuilder.notFound("Report not found");
      return ctx.json(exception, 404);
    }

    if (dto.assignedToId) {
      const rep = await prisma.representative.findUnique({
        where: { id: dto.assignedToId },
      });

      if (!rep) {
        const exception = HttpExceptionBuilder.notFound("Representative not found");
        return ctx.json(exception, 404);
      }
    }

    const report = await prisma.needReport.update({
      where: { id },
      data: {
        assignedToId: dto.assignedToId,
        status: dto.status,
        description: dto.description,
        attachments: dto.attachments,
      },
      include: {
        user: {
          include: {
            region: true,
          },
        },
        assignedTo: true,
      },
    });

    return ctx.json(ResponseBuilder.ok(report));
  },
);

ReportsRoute.delete("/:id", authMiddleware, async (ctx) => {
  const admin = ctx.get("admin");
  const id = ctx.req.param("id");

  const existingReport = await prisma.needReport.findUnique({
    where: { id },
  });

  if (!existingReport) {
    const exception = HttpExceptionBuilder.notFound("Report not found");
    return ctx.json(exception, 404);
  }

  await prisma.needReport.update({
    where: { id },
    data: { status: "resolved" },
  });

  return ctx.json(ResponseBuilder.ok(null));
});

export default ReportsRoute;

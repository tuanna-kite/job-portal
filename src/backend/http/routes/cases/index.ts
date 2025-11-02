import { prisma } from "@/backend/db";
import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { authMiddleware } from "@/backend/http/middlewares/auth.middleware";
import { CasesService } from "@/backend/services/cases.service";

import type { CreateCaseDto } from "@/shared/validation/cases/create-case.schema";
import type { UpdateCaseDto } from "@/shared/validation/cases/update-case.schema";
import type { OpenAPIHono } from "@hono/zod-openapi";

function registerCasesRoute(app: OpenAPIHono) {
  const casesService = new CasesService();

  // Create case from need report
  app.post("/cases/from-need-report", authMiddleware, async (ctx) => {
    try {
      const body = await ctx.req.json<{
        needReportId: string;
        opportunityId: string;
        assignedRepId?: string;
        notes?: string;
      }>();

      const newCase = await casesService.createFromNeedReport(body);
      return ctx.json(ResponseBuilder.ok(newCase), 201);
    } catch (error: any) {
      const exception = HttpExceptionBuilder.fromError(error);
      return ctx.json(exception, exception.statusCode);
    }
  });

  app.post("/cases", authMiddleware, async (ctx) => {
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

app.get("/cases", authMiddleware, async (ctx) => {
  const cases = await prisma.case.findMany({
    include: {
      user: {
        include: {
          region: true,
        },
      },
      opportunity: {
        include: {
          partner: true,
        },
      },
      assignedRep: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return ctx.json(ResponseBuilder.ok(cases));
});

app.patch("/cases/:id", authMiddleware, async (ctx) => {
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

app.delete("/cases/:id", authMiddleware, async (ctx) => {
  const id = ctx.req.param("id");

  const existingCase = await prisma.case.findUnique({
    where: { id },
  });

  if (!existingCase) {
    const exception = HttpExceptionBuilder.notFound("Case not found");
    return ctx.json(exception, 404);
  }

  await prisma.case.delete({
    where: { id },
  });

  return ctx.json(ResponseBuilder.ok({ message: "Case deleted successfully" }));
});

app.get("/cases/:id/timeline", authMiddleware, async (ctx) => {
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
}

export default registerCasesRoute;

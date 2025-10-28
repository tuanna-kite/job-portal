// src/server/openapi.ts
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, z } from "@hono/zod-openapi";

import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";
import registerAuthRoute from "@/backend/http/routes/auth";
import registerOpportunitiesRoute from "@/backend/http/routes/opportunities";
import registerPartnerRoute from "@/backend/http/routes/partners";
import createNeedReportRoute from "@/backend/http/routes/reports";
import registerRepsRoute from "@/backend/http/routes/reps";
import registerUserRoute from "@/backend/http/routes/users";
import { RequestValidation } from "@/backend/http/validations/request-validation";

const OpenApiApp = new OpenAPIHono({
  defaultHook: (result, ctx) => {
    if (!result.success) {
      return ctx.json(
        HttpExceptionBuilder.validationErrors(
          RequestValidation.toFieldErrors(result.error),
        ),
        422,
      );
    }
  },
}).basePath("/api");

// meta
OpenApiApp.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Job Portal API",
    version: "1.0.0",
  },
});

// UI
OpenApiApp.get("/docs", swaggerUI({ url: "/api/doc" }));

OpenApiApp.openapi(
  {
    method: "get",
    path: "/health",
    tags: ["Health Check"],
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: z.object({ ok: z.boolean() }),
          },
        },
      },
    },
  },
  (c) => c.json({ ok: true }),
);

registerAuthRoute(OpenApiApp);
registerRepsRoute(OpenApiApp);
createNeedReportRoute(OpenApiApp);
registerUserRoute(OpenApiApp);
registerPartnerRoute(OpenApiApp);
registerOpportunitiesRoute(OpenApiApp);

export default OpenApiApp;

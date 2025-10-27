import { createRoute } from "@hono/zod-openapi";

import {
  CreateReportByUserSchema,
  CreateReportResponseSchema,
} from "@/shared/validation/reports/create-report-by-user.schema";

const createReportByUserRoute = createRoute({
  method: "post",
  path: "/reports",
  tags: ["Reports"],
  summary: "Create a Need Support Report",
  request: {
    body: {
      required: true,
      content: {
        "application/json": { schema: CreateReportByUserSchema },
      },
    },
  },
  responses: {
    201: {
      description: "Created",
      content: {
        "application/json": { schema: CreateReportResponseSchema },
      },
    },
  },
});

export default createReportByUserRoute;

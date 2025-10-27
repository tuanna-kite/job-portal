import { createRoute, z } from "@hono/zod-openapi";

import { NeedReportDetailResponseSchema } from "@/shared/validation/reports/get-report-detail.schema";

const ReportIdParamSchema = z.object({
  id: z.uuid().openapi({
    param: { name: "id", in: "path" },
    example: "0561f21d-1c6c-4480-bbbd-f892ec3fa77c",
  }),
});

const getReportDetailRoute = createRoute({
  method: "get",
  path: "/reports/{id}",
  tags: ["Reports"],
  summary: "Get Need Report detail by id",
  request: {
    params: ReportIdParamSchema,
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": { schema: NeedReportDetailResponseSchema },
      },
    },
  },
});

export default getReportDetailRoute;

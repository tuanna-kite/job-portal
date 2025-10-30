import { createRoute, z } from "@hono/zod-openapi";

const deleteReportRoute = createRoute({
  method: "delete",
  path: "/reports/{id}",
  tags: ["Reports"],
  summary: "Delete a need report",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.object({
              message: z.string(),
            }),
          }),
        },
      },
      description: "Report deleted successfully",
    },
  },
});

export default deleteReportRoute;

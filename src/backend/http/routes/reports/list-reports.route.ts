import { createRoute, z } from "@hono/zod-openapi";

const listReportsRoute = createRoute({
  method: "get",
  path: "/reports",
  tags: ["Reports"],
  summary: "Get all need reports",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.any(),
          }),
        },
      },
      description: "List of need reports",
    },
  },
});

export default listReportsRoute;

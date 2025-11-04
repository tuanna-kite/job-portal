import { createRoute, z } from "@hono/zod-openapi";

const getStatusCountsRoute = createRoute({
  method: "get",
  path: "/users/status/counts",
  tags: ["User"],
  summary: "Get user status counts",
  request: {},
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.object({
              all: z.number(),
              active: z.number(),
              banned: z.number(),
            }),
          }),
        },
      },
    },
  },
});

export default getStatusCountsRoute;


import { createRoute, z } from "@hono/zod-openapi";

const getUserByIdRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  tags: ["User"],
  summary: "Get user by ID",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.any(),
          }),
        },
      },
    },
  },
});

export default getUserByIdRoute;


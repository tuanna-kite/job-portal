import { createRoute, z } from "@hono/zod-openapi";

const deleteUserRoute = createRoute({
  method: "delete",
  path: "/users/{id}",
  tags: ["User"],
  summary: "Archive user (soft delete)",
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
            data: z.object({
              message: z.string(),
            }),
          }),
        },
      },
    },
  },
});

export default deleteUserRoute;


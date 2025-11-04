import { createRoute, z } from "@hono/zod-openapi";

import { UpdateUserSchema } from "@/shared/validation/users/update-user.schema";

const updateUserRoute = createRoute({
  method: "patch",
  path: "/users/{id}",
  tags: ["User"],
  summary: "Update user",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateUserSchema,
        },
      },
    },
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

export default updateUserRoute;


import { createRoute, z } from "@hono/zod-openapi";

const unarchiveUserRoute = createRoute({
  method: "patch",
  path: "/users/{id}/unarchive",
  tags: ["User"],
  summary: "Unarchive user (restore from archived status)",
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
    400: { description: "Bad request (e.g. user is not archived)" },
    404: { description: "User not found" },
  },
});

export default unarchiveUserRoute;


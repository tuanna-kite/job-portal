import { createRoute, z } from "@hono/zod-openapi";

const listUsersRoute = createRoute({
  method: "get",
  path: "/users",
  tags: ["User"],
  summary: "Get all users with pagination and filters",
  request: {
    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
      search: z.string().optional(),
      status: z.enum(["pending", "active", "archived"]).optional(),
      role: z.enum(["rep", "partner", "all"]).optional(),
    }),
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.array(z.any()),
            pagination: z.object({
              page: z.number(),
              limit: z.number(),
              totalItems: z.number(),
              totalPages: z.number(),
              hasNextPage: z.boolean(),
            }),
          }),
        },
      },
    },
  },
});

export default listUsersRoute;

import { createRoute } from "@hono/zod-openapi";

const listUsersRoute = createRoute({
  method: "get",
  path: "/users",
  tags: ["User"],
  summary: "Get all users",
  request: {},
  responses: {
    200: { description: "OK" },
  },
});

export default listUsersRoute;

import { createRoute } from "@hono/zod-openapi";

// TODO: Config create user route
const createUserRoute = createRoute({
  method: "post",
  path: "/users",
  tags: ["Users"],
  summary: "",
  request: {},
  responses: {},
});

export default createUserRoute;

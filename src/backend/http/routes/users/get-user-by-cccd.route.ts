import { createRoute } from "@hono/zod-openapi";

export const getUserByCccdRoute = createRoute({
  method: "get",
  path: "/users/cccd/{cccd}",
  request: {},
  responses: {
    200: { description: "OK" },
  },
});

export default getUserByCccdRoute;

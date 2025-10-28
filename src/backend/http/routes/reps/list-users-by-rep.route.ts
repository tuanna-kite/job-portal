import { createRoute } from "@hono/zod-openapi";

const listUsersByRepRoute = createRoute({
  method: "get",
  path: "/reps/{repId}/users",
  tags: ["Reps"],
  request: {},
  responses: {
    200: { description: "OK" },
  },
});

export default listUsersByRepRoute;

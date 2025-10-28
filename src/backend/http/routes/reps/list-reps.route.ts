import { createRoute } from "@hono/zod-openapi";

const listRepsRoute = createRoute({
  method: "get",
  path: "/reps",
  tags: ["Reps"],
  request: {},
  responses: {
    200: { description: "OK" },
  },
});

export default listRepsRoute;

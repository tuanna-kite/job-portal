import { createRoute } from "@hono/zod-openapi";

const listOpportunitiesRoute = createRoute({
  method: "get",
  path: "/opportunities",
  tags: ["Opportunities"],
  summary: "",
  request: {},
  responses: {
    201: { description: "OK" },
  },
});

export default listOpportunitiesRoute;

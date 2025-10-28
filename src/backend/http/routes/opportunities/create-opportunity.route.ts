import { createRoute } from "@hono/zod-openapi";

const createOpportunityRoute = createRoute({
  method: "post",
  path: "/opportunities",
  tags: ["Opportunities"],
  summary: "",
  request: {},
  responses: {
    201: { description: "OK" },
  },
});

export default createOpportunityRoute;

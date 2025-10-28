import { createRoute } from "@hono/zod-openapi";

const createPartnerRoute = createRoute({
  method: "post",
  path: "/partners",
  tags: ["Partner"],
  summary: "",
  request: {},
  responses: {
    201: { description: "OK" },
  },
});

export default createPartnerRoute;

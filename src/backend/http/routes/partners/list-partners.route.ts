import { createRoute } from "@hono/zod-openapi";

const listPartners = createRoute({
  method: "get",
  path: "/partners",
  tags: ["Partner"],
  summary: "",
  request: {},
  responses: {
    200: { description: "OK" },
  },
});

export default listPartners;

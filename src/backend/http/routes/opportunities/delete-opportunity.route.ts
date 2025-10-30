import { createRoute, z } from "@hono/zod-openapi";

const deleteOpportunityRoute = createRoute({
  method: "delete",
  path: "/opportunities/{id}",
  tags: ["Opportunities"],
  summary: "Delete an opportunity",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.object({
              message: z.string(),
            }),
          }),
        },
      },
      description: "Opportunity deleted successfully",
    },
  },
});

export default deleteOpportunityRoute;

import { createRoute, z } from "@hono/zod-openapi";

const OpportunityLocationTypeEnum = z.enum(["remote", "hybrid", "onsite"]);
const OpportunityStatusEnum = z.enum(["open", "closed"]);

const UpdateOpportunitySchema = z.object({
  title: z.string().min(1).optional(),
  partnerId: z.string().uuid().optional(),
  locationType: OpportunityLocationTypeEnum.optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  salaryRange: z.string().optional(),
  status: OpportunityStatusEnum.optional(),
});

const updateOpportunityRoute = createRoute({
  method: "patch",
  path: "/opportunities/{id}",
  tags: ["Opportunities"],
  summary: "Update an opportunity",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateOpportunitySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.any(),
          }),
        },
      },
      description: "Opportunity updated successfully",
    },
  },
});

export default updateOpportunityRoute;

import { z } from "@hono/zod-openapi";

import { OpportunityLocationType } from "@/shared/domains/opportunities/enums/opportunity-location-type.enum";
import { OpportunityStatus } from "@/shared/domains/opportunities/enums/opportunity-status.enum";

export const CreateOpportunitySchema = z.object({
  title: z.string().min(3),
  partnerId: z.uuid(),
  locationType: z
    .enum(OpportunityLocationType)
    .default(OpportunityLocationType.REMOTE),
  address: z.string(),
  description: z.string().optional(),
  requirements: z.string().optional(),
  salaryRange: z.string().optional(),
  status: z.enum(OpportunityStatus).default(OpportunityStatus.OPEN),
});

export type CreateOpportunityDto = z.infer<typeof CreateOpportunitySchema>;

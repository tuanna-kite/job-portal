import { z } from "zod/v3";

import { OpportunityLocationType } from "@/shared/domains/opportunities/enums/opportunity-location-type.enum";
import { OpportunityStatus } from "@/shared/domains/opportunities/enums/opportunity-status.enum";

export const CreateOpportunitySchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  requirements: z.string().optional(),
  locationType: z
    .enum([
      OpportunityLocationType.HYBRID,
      OpportunityLocationType.ONSITE,
      OpportunityLocationType.REMOTE,
    ])
    .default(OpportunityLocationType.REMOTE),
  salaryRange: z.string().optional(),
  source: z.string().optional(),
  status: z
    .enum([OpportunityStatus.OPEN, OpportunityStatus.CLOSED])
    .default(OpportunityStatus.OPEN),
});

export type CreateOpportunityDto = z.infer<typeof CreateOpportunitySchema>;

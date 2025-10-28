import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { OpportunityLocationType } from "@/shared/domains/opportunities/enums/opportunity-location-type.enum";

type CreateOpportunityInput = {
  title: string;
  partnerId: string;
  locationType: OpportunityLocationType;
  address: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
};

export class OpportunitiesRepository {
  constructor(private db: PrismaTx = prisma) {}

  create(input: CreateOpportunityInput) {
    return this.db.opportunity.create({ data: input });
  }

  findAll() {
    return this.db.opportunity.findMany();
  }
}

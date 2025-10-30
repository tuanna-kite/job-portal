import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type {
  OpportunityLocationType,
  OpportunityStatus,
} from "@prisma/client";

type CreateOpportunityInput = {
  title: string;
  partnerId: string;
  locationType: OpportunityLocationType;
  address: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
};

type UpdateOpportunityInput = {
  title?: string;
  partnerId?: string;
  locationType?: OpportunityLocationType;
  address?: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
  status?: OpportunityStatus;
};

export class OpportunitiesRepository {
  constructor(private db: PrismaTx = prisma) {}

  create(input: CreateOpportunityInput) {
    return this.db.opportunity.create({
      data: input,
      include: {
        partner: true,
      },
    });
  }

  findAll() {
    return this.db.opportunity.findMany({
      include: {
        partner: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: string) {
    return this.db.opportunity.findUnique({
      where: { id },
      include: {
        partner: true,
      },
    });
  }

  update(id: string, input: UpdateOpportunityInput) {
    return this.db.opportunity.update({
      where: { id },
      data: input,
      include: {
        partner: true,
      },
    });
  }

  delete(id: string) {
    return this.db.opportunity.delete({
      where: { id },
    });
  }
}

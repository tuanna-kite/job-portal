import { AppError } from "@/backend/errors/app-error";
import { OpportunitiesRepository } from "@/backend/repositories/opportunities.repository";
import { PartnersRepository } from "@/backend/repositories/partners.repository";

import type { CreateOpportunityDto } from "@/shared/validation/opportunities/create-opportunity.schema";

export class OpportunitiesService {
  constructor(
    private opportunitiesRepo = new OpportunitiesRepository(),
    private partnerRepo = new PartnersRepository(),
  ) {}

  async create(dto: CreateOpportunityDto) {
    const partner = await this.partnerRepo.findById(dto.partnerId);
    if (!partner) {
      throw new AppError("NOT_FOUND");
    }
    return this.opportunitiesRepo.create(dto);
  }

  async findAll() {
    return this.opportunitiesRepo.findAll();
  }
}

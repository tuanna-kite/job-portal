import { AppError } from "@/backend/errors/app-error";
import { OpportunitiesRepository } from "@/backend/repositories/opportunities.repository";
import { PartnersRepository } from "@/backend/repositories/partners.repository";

import type { CreateOpportunityDto } from "@/shared/validation/opportunities/create-opportunity.schema";
import type {
  OpportunityLocationType,
  OpportunityStatus,
} from "@prisma/client";

type UpdateOpportunityDto = {
  title?: string;
  partnerId?: string;
  locationType?: OpportunityLocationType;
  address?: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
  status?: OpportunityStatus;
};

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

  async findById(id: string) {
    const opportunity = await this.opportunitiesRepo.findById(id);
    if (!opportunity) {
      throw new AppError("NOT_FOUND");
    }
    return opportunity;
  }

  async update(id: string, dto: UpdateOpportunityDto) {
    const opportunity = await this.opportunitiesRepo.findById(id);
    if (!opportunity) {
      throw new AppError("NOT_FOUND");
    }

    if (dto.partnerId) {
      const partner = await this.partnerRepo.findById(dto.partnerId);
      if (!partner) {
        throw new AppError("NOT_FOUND");
      }
    }

    return this.opportunitiesRepo.update(id, dto);
  }

  async delete(id: string) {
    const opportunity = await this.opportunitiesRepo.findById(id);
    if (!opportunity) {
      throw new AppError("NOT_FOUND");
    }
    return this.opportunitiesRepo.delete(id);
  }
}

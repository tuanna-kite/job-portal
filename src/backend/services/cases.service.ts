import { AppError } from "@/backend/errors/app-error";
import { CasesRepository } from "@/backend/repositories/cases.repository";
import { OpportunitiesRepository } from "@/backend/repositories/opportunities.repository";
import { UsersRepository } from "@/backend/repositories/users.repository";

import type { CaseStatus } from "@prisma/client";

type CreateCaseDto = {
  userId: string;
  opportunityId: string;
  assignedRepId?: string;
  status?: CaseStatus;
  notes?: string;
};

type UpdateCaseDto = {
  assignedRepId?: string | null;
  status?: CaseStatus;
  notes?: string | null;
};

export class CasesService {
  constructor(
    private casesRepo = new CasesRepository(),
    private usersRepo = new UsersRepository(),
    private opportunitiesRepo = new OpportunitiesRepository(),
  ) {}

  async findAll() {
    return this.casesRepo.findAll();
  }

  async findById(id: string) {
    const caseRecord = await this.casesRepo.findById(id);
    if (!caseRecord) {
      throw new AppError("NOT_FOUND");
    }
    return caseRecord;
  }

  async create(dto: CreateCaseDto) {
    const user = await this.usersRepo.findById(dto.userId);
    if (!user) {
      throw new AppError("NOT_FOUND");
    }

    const opportunity = await this.opportunitiesRepo.findById(
      dto.opportunityId,
    );
    if (!opportunity) {
      throw new AppError("NOT_FOUND");
    }

    return this.casesRepo.create(dto);
  }

  async update(id: string, dto: UpdateCaseDto) {
    const caseRecord = await this.casesRepo.findById(id);
    if (!caseRecord) {
      throw new AppError("NOT_FOUND");
    }

    return this.casesRepo.update(id, dto);
  }

  async delete(id: string) {
    const caseRecord = await this.casesRepo.findById(id);
    if (!caseRecord) {
      throw new AppError("NOT_FOUND");
    }

    return this.casesRepo.delete(id);
  }
}

import { AppError } from "@/backend/errors/app-error";
import { CasesRepository } from "@/backend/repositories/cases.repository";
import { NeedReportsRepository } from "@/backend/repositories/need-reports.repository";
import { OpportunitiesRepository } from "@/backend/repositories/opportunities.repository";
import { UsersRepository } from "@/backend/repositories/users.repository";

import type { CaseStatus } from "@prisma/client";

type CreateCaseDto = {
  userId: string;
  opportunityId?: string;
  assignedRepId?: string;
  status?: CaseStatus;
  notes?: string;
  needReportId?: string;
};

type CreateCaseFromNeedReportDto = {
  needReportId: string;
  opportunityId: string;
  assignedRepId?: string;
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
    private needReportsRepo = new NeedReportsRepository(),
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

    // Opportunity is optional now (can be null for auto-created cases)
    if (dto.opportunityId) {
      const opportunity = await this.opportunitiesRepo.findById(
        dto.opportunityId,
      );
      if (!opportunity) {
        throw new AppError("NOT_FOUND", "Opportunity not found");
      }
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

  async createFromNeedReport(dto: CreateCaseFromNeedReportDto) {
    // Validate need report exists and not already converted
    const needReport = await this.needReportsRepo.findById(dto.needReportId);
    if (!needReport) {
      throw new AppError("NOT_FOUND", "Need report not found");
    }

    // Check if already converted to case
    const existingCase = await this.casesRepo.findAll();
    const alreadyConverted = existingCase.some(
      (c) => c.needReportId === dto.needReportId,
    );
    if (alreadyConverted) {
      throw new AppError(
        "INVALID_STATE",
        "This support request has already been converted to a case",
      );
    }

    // Validate opportunity exists
    const opportunity = await this.opportunitiesRepo.findById(
      dto.opportunityId,
    );
    if (!opportunity) {
      throw new AppError("NOT_FOUND", "Opportunity not found");
    }

    // Create case with needReportId
    const newCase = await this.casesRepo.create({
      userId: needReport.userId,
      opportunityId: dto.opportunityId,
      assignedRepId: dto.assignedRepId,
      needReportId: dto.needReportId,
      notes: dto.notes,
      status: "pending",
    });

    // Update need report status to resolved
    await this.needReportsRepo.update(dto.needReportId, {
      status: "resolved",
    });

    return newCase;
  }
}

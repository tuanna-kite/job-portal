import { prisma } from "@/backend/db";
import { AppError } from "@/backend/errors/app-error";
import { CasesRepository } from "@/backend/repositories/cases.repository";
import { NeedReportsRepository } from "@/backend/repositories/need-reports.repository";
import { RegionsRepository } from "@/backend/repositories/regions.repository";
import { UsersRepository } from "@/backend/repositories/users.repository";

import type { NeedReportCategory } from "@/shared/domains/reports/need-report-category.enum";
import type { NeedReportCreatedBy } from "@/shared/domains/reports/need-report-created-by.enum";
import type { NeedReportStatus } from "@/shared/domains/reports/need-report-status.enum";
import type { CreateReportByUserDto } from "@/shared/validation/reports/create-report-by-user.schema";
import type { NeedReportDetailSchema } from "@/shared/validation/reports/get-report-detail.schema";
import type { z } from "@hono/zod-openapi";

export class NeedSupportsService {
  constructor(private repo = new NeedReportsRepository()) {}

  async createNeedReportByUser(dto: CreateReportByUserDto) {
    return prisma.$transaction(async (tx) => {
      const usersRepo = new UsersRepository(tx);
      const reportsRepo = new NeedReportsRepository(tx);
      const regionsRepo = new RegionsRepository(tx);

      // lay thong tin theo cccd
      let user = await usersRepo.findByCccd(dto.cccd);
      // Neu chua co thi tao user
      if (!user) {
        if (!dto.userInfo) {
          throw new AppError(
            "INVALID_STATE",
            "Người dùng chưa tồn tại, cần bổ sung thông tin tối thiểu để tạo hồ sơ.",
          );
        }
        // Kiem tra region thoa man
        const region = await regionsRepo.findById(dto.userInfo.regionId);
        if (!region) {
          throw new AppError("INVALID_STATE", "Khu vực không tồn tại");
        }
        const phoneExisted = await usersRepo.findByPhone(dto.userInfo.phone);
        if (phoneExisted) {
          throw new AppError(
            "CONFLICT",
            "Số điện thoại đã tồn tại trên hệ thống",
          );
        }

        user = await usersRepo.createUser({
          cccd: dto.cccd,
          ...dto.userInfo,
        });
      }
      // Tao report
      const report = await reportsRepo.createReport({
        description: dto.description,
        userId: user.id,
        attachments: dto.attachments,
        category: dto.category,
      });

      // Auto-create Case if category is JOB_SEEKING
      let caseId: string | undefined;
      if (dto.category === "JOB_SEEKING") {
        const casesRepo = new CasesRepository(tx);
        const newCase = await casesRepo.create({
          userId: user.id,
          needReportId: report.id,
          status: "pending",
          notes: `Tự động tạo từ yêu cầu hỗ trợ: ${dto.description.substring(0, 100)}`,
        });
        caseId = newCase.id;
      }

      return { reportId: report.id, caseId };
    });
  }

  async findAll() {
    return this.repo.findAll();
  }

  async createNeedSupportByRep() {}

  async findById(id: string): Promise<z.infer<typeof NeedReportDetailSchema>> {
    const report = await this.repo.findById(id);
    if (!report) {
      throw new AppError("NOT_FOUND");
    }
    return {
      ...report,
      status: report.status as NeedReportStatus,
      category: report.category as NeedReportCategory,
      createdBy: report.createdBy as NeedReportCreatedBy,
      createdAt: report.createdAt.toISOString(),
      updatedAt: report.updatedAt.toISOString(),
      user: {
        id: report.user.id,
        fullName: report.user.fullName,
        gender: report.user.gender!,
        birthDate: report.user.birthDate!.toISOString(),
        phone: report.user.phone,
        disabilityType: report.user.disabilityType,
        status: report.user.status,
      },
      assignedTo: report.assignedTo
        ? {
            id: report.assignedTo.id,
            fullName: report.assignedTo.fullName,
            phone: report.assignedTo.phone,
          }
        : null,
    };
  }

  async update(
    id: string,
    dto: {
      status?: string;
      assignedToId?: string | null;
      description?: string;
    },
  ) {
    const report = await this.repo.findById(id);
    if (!report) {
      throw new AppError("NOT_FOUND");
    }
    return this.repo.update(id, dto);
  }

  async delete(id: string) {
    const report = await this.repo.findById(id);
    if (!report) {
      throw new AppError("NOT_FOUND");
    }
    return this.repo.delete(id);
  }
}

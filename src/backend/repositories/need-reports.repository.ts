import { Prisma } from "@prisma/client";

import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { NeedReportCategory } from "@/shared/domains/reports/need-report-category.enum";

type CreateReportByUserInput = {
  userId: string;
  category: NeedReportCategory;
  description: string;
  attachments?: string[];
};

export class NeedReportsRepository {
  private fullInclude = Prisma.validator<Prisma.NeedReportInclude>()({
    user: {},
    assignedTo: {},
  } as const);

  constructor(private db: PrismaTx = prisma) {}

  createReport(input: CreateReportByUserInput) {
    return this.db.needReport.create({ data: input });
  }

  async findById(id: string) {
    return this.db.needReport.findUnique({
      where: { id },
      include: this.fullInclude,
    });
  }
}

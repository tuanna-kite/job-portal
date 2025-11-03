import { Prisma } from "@prisma/client";

import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { NeedReportCategory } from "@/shared/domains/reports/need-report-category.enum";
import type { NeedReportStatus } from "@prisma/client";

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
    case: true,
  } as const);

  constructor(private db: PrismaTx = prisma) {}

  findAll() {
    return this.db.needReport.findMany({
      include: this.fullInclude,
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  createReport(input: CreateReportByUserInput) {
    return this.db.needReport.create({ data: input });
  }

  async findById(id: string) {
    return this.db.needReport.findUnique({
      where: { id },
      include: this.fullInclude,
    });
  }

  async update(
    id: string,
    data: {
      status?: NeedReportStatus;
      assignedToId?: string | null;
      description?: string;
    },
  ) {
    const updateData: Prisma.NeedReportUpdateInput = {
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.description !== undefined
        ? { description: data.description }
        : {}),
      ...(data.assignedToId !== undefined
        ? {
            assignedTo: data.assignedToId
              ? { connect: { id: data.assignedToId } }
              : { disconnect: true },
          }
        : {}),
    };

    return this.db.needReport.update({
      where: { id },
      data: updateData,
      include: this.fullInclude,
    });
  }

  async delete(id: string) {
    return this.db.needReport.delete({
      where: { id },
    });
  }
}

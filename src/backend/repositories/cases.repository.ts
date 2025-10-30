import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { CaseStatus } from "@prisma/client";

type CreateCaseInput = {
  userId: string;
  opportunityId: string;
  assignedRepId?: string;
  status?: CaseStatus;
  notes?: string;
};

type UpdateCaseInput = {
  assignedRepId?: string | null;
  status?: CaseStatus;
  notes?: string | null;
};

export class CasesRepository {
  constructor(private db: PrismaTx = prisma) {}

  findAll() {
    return this.db.case.findMany({
      include: {
        user: true,
        opportunity: {
          include: {
            partner: true,
          },
        },
        assignedRep: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  findById(id: string) {
    return this.db.case.findUnique({
      where: { id },
      include: {
        user: true,
        opportunity: {
          include: {
            partner: true,
          },
        },
        assignedRep: true,
      },
    });
  }

  create(input: CreateCaseInput) {
    return this.db.case.create({
      data: input,
      include: {
        user: true,
        opportunity: {
          include: {
            partner: true,
          },
        },
        assignedRep: true,
      },
    });
  }

  update(id: string, input: UpdateCaseInput) {
    return this.db.case.update({
      where: { id },
      data: input,
      include: {
        user: true,
        opportunity: {
          include: {
            partner: true,
          },
        },
        assignedRep: true,
      },
    });
  }

  delete(id: string) {
    return this.db.case.delete({
      where: { id },
    });
  }
}

import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";

export class RepsRepository {
  constructor(private db: PrismaTx = prisma) {}

  findByEmail(email: string) {
    return this.db.representative.findUnique({
      where: { email },
    });
  }

  linkAccount(repId: string, accountId: string) {
    return this.db.representative.update({
      where: { id: repId },
      data: { accountId },
    });
  }

  createProfile(data: {
    fullName: string;
    email: string;
    phone: string;
    organization: string;
    regionScopeId: string;
  }) {
    return this.db.representative.create({ data });
  }

  async findById(id: string) {
    return this.db.representative.findUnique({ where: { id } });
  }

  findAll() {
    return this.db.representative.findMany();
  }
}

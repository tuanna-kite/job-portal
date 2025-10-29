import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";

export class RegionsRepository {
  constructor(private db: PrismaTx = prisma) {}

  findById(id: string) {
    return this.db.region.findUnique({ where: { id } });
  }

  findAll() {
    return this.db.region.findMany({
      orderBy: { name: "asc" },
    });
  }
}

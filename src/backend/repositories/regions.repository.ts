import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { RegionLevel } from "@prisma/client";

export class RegionsRepository {
  constructor(private db: PrismaTx = prisma) {}

  findById(id: string) {
    return this.db.region.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
      },
    });
  }

  findAll() {
    return this.db.region.findMany({
      orderBy: { name: "asc" },
      include: {
        parent: true,
      },
    });
  }

  create(data: { name: string; level: RegionLevel; parentId?: string }) {
    return this.db.region.create({
      data,
      include: {
        parent: true,
      },
    });
  }

  update(
    id: string,
    data: { name?: string; level?: RegionLevel; parentId?: string | null },
  ) {
    return this.db.region.update({
      where: { id },
      data,
      include: {
        parent: true,
      },
    });
  }

  delete(id: string) {
    return this.db.region.delete({
      where: { id },
    });
  }
}

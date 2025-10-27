import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";

export class OpportunitiesRepository {
  constructor(private db: PrismaTx = prisma) {}
}

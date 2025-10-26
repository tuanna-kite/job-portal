import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/repositories/type";

export class CasesRepository {
  constructor(private db: PrismaTx = prisma) {}
}

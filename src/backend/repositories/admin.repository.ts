import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/repositories/type";
import type { AdminRole } from "@/shared/domains/admins/admin-role.enum";

export class AdminRepository {
  constructor(private db: PrismaTx = prisma) {}

  findByEmail(email: string) {
    return this.db.admin.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.db.admin.findUnique({ where: { id } });
  }

  createAdmin(data: {
    email: string;
    password: string;
    fullName: string;
    role: AdminRole;
  }) {
    return this.db.admin.create({ data });
  }
}

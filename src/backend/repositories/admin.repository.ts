import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { AdminRole } from "@/shared/domains/admins/admin-role.enum";

export class AdminRepository {
  constructor(private db: PrismaTx = prisma) {}

  findByEmail(email: string) {
    return this.db.admin.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.db.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  createAdmin(data: {
    email: string;
    password: string;
    fullName: string;
    role: AdminRole;
  }) {
    return this.db.admin.create({ data });
  }

  updateProfile(
    id: string,
    data: { fullName?: string; phone?: string; avatar?: string },
  ) {
    return this.db.admin.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  updatePassword(id: string, hashedPassword: string) {
    return this.db.admin.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  // For password verification
  findByIdWithPassword(id: string) {
    return this.db.admin.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });
  }
}

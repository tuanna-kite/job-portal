import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { DisabilityType } from "@/shared/domains/users/disability-type.enum";
import type { Gender } from "@/shared/domains/users/gender.enum";
import type { UpdateUserDto } from "@/shared/validation/users/update-user.schema";

export type CreateUserInput = {
  cccd: string;
  fullName: string;
  phone: string;
  gender: Gender;
  birthDate: Date;
  disabilityType: DisabilityType;
  skills?: string[];
  regionId: string;
  address: string;
  desiredJob?: string;
};

export class UsersRepository {
  constructor(private db: PrismaTx = prisma) {}

  createUser(data: CreateUserInput) {
    return this.db.user.create({
      data,
    });
  }

  findById(id: string) {
    return this.db.user.findUnique({
      where: { id },
      include: {
        region: true,
      },
    });
  }

  findByCccd(cccd: string) {
    return this.db.user.findUnique({ where: { cccd } });
  }

  findByPhone(phone: string) {
    return this.db.user.findUnique({ where: { phone } });
  }

  findByRep(repId: string) {
    return this.db.user.findMany({ where: { repId } });
  }

  findAll() {
    return this.db.user.findMany({
      include: {
        region: true,
      },
    });
  }

  async findManyWithPagination(
    filters: {
      page?: number;
      limit?: number;
      search?: string;
      status?: string;
      role?: string; // "rep" | "partner" | "all"
    } = {},
  ) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Filter by status
    if (filters.status) {
      where.status = filters.status;
    }

    // Filter by role
    if (filters.role === "rep") {
      where.repId = { not: null };
    } else if (filters.role === "partner") {
      // Users không có repId có thể là partner hoặc user thường
      // Tạm thời filter theo repId null
      where.repId = null;
    }

    // Search filter
    if (filters.search) {
      where.OR = [
        { fullName: { contains: filters.search, mode: "insensitive" } },
        { phone: { contains: filters.search, mode: "insensitive" } },
        { cccd: { contains: filters.search, mode: "insensitive" } },
        { desiredJob: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const [items, totalItems] = await Promise.all([
      this.db.user.findMany({
        where,
        include: {
          region: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      this.db.user.count({ where }),
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        hasNextPage: page < Math.ceil(totalItems / limit),
      },
    };
  }

  async getStatusCounts() {
    const [all, active, archived] = await Promise.all([
      this.db.user.count(),
      this.db.user.count({ where: { status: "active" } }),
      this.db.user.count({ where: { status: "archived" } }),
    ]);

    return {
      all,
      active,
      banned: archived,
    };
  }

  async update(id: string, data: UpdateUserDto) {
    const updateData: any = {};

    if (data.fullName) updateData.fullName = data.fullName;
    if (data.gender) updateData.gender = data.gender;
    if (data.birthDate) updateData.birthDate = new Date(data.birthDate);
    if (data.disabilityType) updateData.disabilityType = data.disabilityType;
    if (data.skills) updateData.skills = data.skills;
    if (data.desiredJob !== undefined) updateData.desiredJob = data.desiredJob;
    if (data.regionId !== undefined) updateData.regionId = data.regionId;
    if (data.repId !== undefined) updateData.repId = data.repId;
    if (data.status) updateData.status = data.status;

    return this.db.user.update({
      where: { id },
      data: updateData,
      include: {
        region: true,
      },
    });
  }

  async archive(id: string) {
    return this.db.user.update({
      where: { id },
      data: { status: "archived" },
    });
  }

  async unarchive(id: string) {
    return this.db.user.update({
      where: { id },
      data: { status: "active" },
    });
  }
}

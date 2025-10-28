import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { DisabilityType } from "@/shared/domains/users/disability-type.enum";
import type { Gender } from "@/shared/domains/users/gender.enum";

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
    return this.db.user.findUnique({ where: { id } });
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
    return this.db.user.findMany();
  }
}

import { prisma } from "@/backend/db";

import type { PrismaTx } from "@/backend/types/type";
import type { PartnerMajor } from "@/shared/domains/partners/partner-major.enum";

type CreatePartnerInput = {
  email: string;
  phone: string;
  major: PartnerMajor;
  address: string;
  notes?: string;
};

export class PartnersRepository {
  constructor(private db: PrismaTx = prisma) {}

  create(input: CreatePartnerInput) {
    return this.db.partner.create({ data: input });
  }

  findByEmail(email: string) {
    return this.db.partner.findUnique({ where: { email } });
  }

  findByPhone(phone: string) {
    return this.db.partner.findUnique({ where: { phone } });
  }

  findAll() {
    return this.db.partner.findMany();
  }

  async findById(id: string) {
    return this.db.partner.findUnique({ where: { id } });
  }
}

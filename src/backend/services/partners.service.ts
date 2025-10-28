import { AppError } from "@/backend/errors/app-error";
import { PartnersRepository } from "@/backend/repositories/partners.repository";

import type { CreatePartnerDto } from "@/shared/validation/partners/create-partner.schema";

export class PartnersService {
  constructor(private partnerRepo = new PartnersRepository()) {}

  async create(dto: CreatePartnerDto) {
    const emailExisting = await this.partnerRepo.findByEmail(dto.email);
    if (emailExisting) {
      throw new AppError("CONFLICT");
    }
    const phoneExisting = await this.partnerRepo.findByEmail(dto.phone);
    if (phoneExisting) {
      throw new AppError("CONFLICT");
    }

    return this.partnerRepo.create(dto);
  }

  async findAll() {
    return this.partnerRepo.findAll();
  }
}

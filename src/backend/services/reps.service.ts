import { AppError } from "@/backend/errors/app-error";
import { RepsRepository } from "@/backend/repositories/reps.repository";

import type { CreateRepDto } from "@/shared/validation/reps/create-rep.schema";

export class RepsService {
  constructor(private repsRepo = new RepsRepository()) {}

  public async create(dto: CreateRepDto) {
    const existing = await this.repsRepo.findByEmail(dto.email);
    if (existing) {
      throw new AppError("CONFLICT");
    }

    return this.repsRepo.createProfile(dto);
  }

  async findById(repId: string) {
    const existing = await this.repsRepo.findById(repId);
    if (!existing) {
      throw new AppError("NOT_FOUND");
    }

    return existing;
  }
}

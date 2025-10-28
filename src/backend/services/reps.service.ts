import { AppError } from "@/backend/errors/app-error";
import { RegionsRepository } from "@/backend/repositories/regions.repository";
import { RepsRepository } from "@/backend/repositories/reps.repository";
import { UsersRepository } from "@/backend/repositories/users.repository";

import type { CreateRepDto } from "@/shared/validation/reps/create-rep.schema";

export class RepsService {
  constructor(
    private repsRepo = new RepsRepository(),
    private regionsRepo = new RegionsRepository(),
    private usersRepo = new UsersRepository(),
  ) {}

  public async create(dto: CreateRepDto) {
    const existing = await this.repsRepo.findByEmail(dto.email);
    if (existing) {
      throw new AppError("CONFLICT");
    }

    const region = await this.regionsRepo.findById(dto.regionScopeId);
    if (!region) {
      throw new AppError("NOT_FOUND");
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

  async findAll() {
    return this.repsRepo.findAll();
  }

  async listUsersByRep(repId: string) {
    const rep = await this.repsRepo.findById(repId);
    if (!rep) {
      throw new AppError("NOT_FOUND");
    }

    if (rep.status === "suspended") {
      throw new AppError("FORBIDDEN");
    }

    return this.usersRepo.findByRep(rep.id);
  }
}

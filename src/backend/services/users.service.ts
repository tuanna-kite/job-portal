import { AppError } from "@/backend/errors/app-error";
import { UsersRepository } from "@/backend/repositories/users.repository";

import type { CreateUserDto } from "@/shared/validation/users/create-user.schema";

export class UsersService {
  constructor(private repo = new UsersRepository()) {}

  async findById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      return new AppError("NOT_FOUND");
    }
    return user;
  }

  async findByCccd(cccd: string) {
    const user = await this.repo.findByCccd(cccd);
    if (!user) {
      return new AppError("NOT_FOUND");
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {}

  async findAll() {
    return this.repo.findAll();
  }
}

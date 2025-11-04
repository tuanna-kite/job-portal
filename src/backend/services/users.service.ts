import { AppError } from "@/backend/errors/app-error";
import { UsersRepository } from "@/backend/repositories/users.repository";

import type { CreateUserDto } from "@/shared/validation/users/create-user.schema";
import type { UpdateUserDto } from "@/shared/validation/users/update-user.schema";

export class UsersService {
  constructor(private repo = new UsersRepository()) {}

  async findById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new AppError("NOT_FOUND", "User not found");
    }
    return user;
  }

  async findByCccd(cccd: string) {
    const user = await this.repo.findByCccd(cccd);
    if (!user) {
      throw new AppError("NOT_FOUND", "User not found");
    }

    return user;
  }

  async createUser(dto: CreateUserDto) {
    // TODO: Implement create user
    throw new AppError("INTERNAL_ERROR", "Create user not implemented");
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findManyWithPagination(filters: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    role?: string;
  }) {
    return this.repo.findManyWithPagination(filters);
  }

  async getStatusCounts() {
    return this.repo.getStatusCounts();
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new AppError("NOT_FOUND", "User not found");
    }

    return this.repo.update(id, dto);
  }

  async delete(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new AppError("NOT_FOUND", "User not found");
    }

    return this.repo.archive(id);
  }

  async unarchive(id: string) {
    const user = await this.repo.findById(id);
    if (!user) {
      throw new AppError("NOT_FOUND", "User not found");
    }

    if (user.status !== "archived") {
      throw new AppError("INVALID_STATE", "User is not archived");
    }

    return this.repo.unarchive(id);
  }
}

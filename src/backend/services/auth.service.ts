import { prisma } from "@/backend/db";
import { AppError } from "@/backend/errors/app-error";
import { AuthErrors } from "@/backend/errors/auth-errors";
import { HashingHelper } from "@/backend/helpers/hashing.helper";
import { JwtHelper } from "@/backend/helpers/jwt.helper";
import { AdminRepository } from "@/backend/repositories/admin.repository";
import { RepsRepository } from "@/backend/repositories/reps.repository";
import { AdminRole } from "@/shared/domains/admins/admin-role.enum";

import type { ChangePasswordDto } from "@/shared/validation/auth/change-password-dto.schema";
import type { LoginDto } from "@/shared/validation/auth/login-dto.schema";
import type { RegisterDto } from "@/shared/validation/auth/register-dto.schema";
import type { UpdateProfileDto } from "@/shared/validation/auth/update-profile-dto.schema";

export class AuthService {
  constructor(
    private adminRepo = new AdminRepository(),
    private repsRepo = new RepsRepository(),
  ) {}

  public async login(dto: LoginDto) {
    const admin = await this.adminRepo.findByEmail(dto.email);

    if (!admin) {
      throw AuthErrors.invalidCredentials();
    }

    const verify = await HashingHelper.verify(dto.password, admin.password);
    if (!verify) {
      throw AuthErrors.invalidCredentials();
    }

    return JwtHelper.generateCredential({
      sub: admin.id,
    });
  }

  public async register(actor: { id: string; role: string }, dto: RegisterDto) {
    if (actor.role !== AdminRole.SUPER_ADMIN) {
      throw new AppError("FORBIDDEN", "Only super admin can create accounts");
    }
    return prisma
      .$transaction(async (tx) => {
        const admins = new AdminRepository(tx);
        const reps = new RepsRepository(tx);

        const rep = await reps.findById(dto.repId);
        if (!rep) {
          throw new AppError("NOT_FOUND", "Representative profile not found");
        } else if (rep.accountId) {
          throw new AppError(
            "CONFLICT",
            "Representative profile already linked with an account",
          );
        }
        const existedAdmin = await admins.findByEmail(rep.email);
        if (existedAdmin) {
          throw new AppError("CONFLICT", "Admin email already exists");
        }

        const hashedPassword = await HashingHelper.hash(dto.password);
        const newAdmin = await this.adminRepo.createAdmin({
          email: rep.email,
          password: hashedPassword,
          fullName: rep.fullName,
          role: AdminRole.COORDINATOR,
        });

        await this.repsRepo.linkAccount(rep.id, newAdmin.id);
        return {
          repId: rep.id,
          accountId: newAdmin.id,
        };
      })
      .catch((err) => {
        // P2002 = Unique constraint failed
        if (err?.code === "P2002") {
          throw new AppError("CONFLICT", "Unique constraint failed");
        }
        throw err;
      });
  }

  public async getProfile(adminId: string) {
    const admin = await this.adminRepo.findById(adminId);
    if (!admin) {
      throw new AppError("NOT_FOUND", "Admin not found");
    }
    return admin;
  }

  public async updateProfile(adminId: string, dto: UpdateProfileDto) {
    const admin = await this.adminRepo.findById(adminId);
    if (!admin) {
      throw new AppError("NOT_FOUND", "Admin not found");
    }

    return this.adminRepo.updateProfile(adminId, {
      fullName: dto.fullName,
      phone: dto.phone,
      avatar: dto.avatar,
    });
  }

  public async changePassword(adminId: string, dto: ChangePasswordDto) {
    const admin = await this.adminRepo.findByIdWithPassword(adminId);
    if (!admin) {
      throw new AppError("NOT_FOUND", "Admin not found");
    }

    // Verify old password
    const verify = await HashingHelper.verify(dto.oldPassword, admin.password);
    if (!verify) {
      throw new AppError("INVALID_STATE", "Mật khẩu cũ không đúng");
    }

    // Hash new password
    const hashedPassword = await HashingHelper.hash(dto.newPassword);
    await this.adminRepo.updatePassword(adminId, hashedPassword);

    return { message: "Đổi mật khẩu thành công" };
  }
}

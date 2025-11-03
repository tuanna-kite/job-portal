import { setCookie } from "hono/cookie";

import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { AuthService } from "@/backend/services/auth.service";

import type { ChangePasswordDto } from "@/shared/validation/auth/change-password-dto.schema";
import type { LoginDto } from "@/shared/validation/auth/login-dto.schema";
import type { RegisterDto } from "@/shared/validation/auth/register-dto.schema";
import type { UpdateProfileDto } from "@/shared/validation/auth/update-profile-dto.schema";
import type { Context } from "hono";

export class AuthController {
  constructor(private service = new AuthService()) {}

  public login = async (ctx: Context) => {
    const dto = await ctx.req.json<LoginDto>();
    const { accessToken } = await this.service.login(dto);

    setCookie(ctx, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    return ctx.json(ResponseBuilder.ok(null));
  };

  public register = async (ctx: Context) => {
    const dto = await ctx.req.json<RegisterDto>();
    const admin = ctx.get("admin")!;
    const result = await this.service.register(admin, dto);

    return ctx.json(ResponseBuilder.ok(result));
  };

  public getProfile = async (ctx: Context) => {
    const admin = ctx.get("admin")!;
    const profile = await this.service.getProfile(admin.id);

    return ctx.json(ResponseBuilder.ok(profile));
  };

  public updateProfile = async (ctx: Context) => {
    const admin = ctx.get("admin")!;
    const dto = await ctx.req.json<UpdateProfileDto>();
    const updated = await this.service.updateProfile(admin.id, dto);

    return ctx.json(ResponseBuilder.ok(updated));
  };

  public changePassword = async (ctx: Context) => {
    const admin = ctx.get("admin")!;
    const dto = await ctx.req.json<ChangePasswordDto>();
    const result = await this.service.changePassword(admin.id, dto);

    return ctx.json(ResponseBuilder.ok(result));
  };
}

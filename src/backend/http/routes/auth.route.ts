import { Hono } from "hono";
import { setCookie } from "hono/cookie";

import { prisma } from "@/backend/db";
import { HashingHelper } from "@/backend/helpers/hashing.helper";
import { JwtHelper } from "@/backend/helpers/jwt.helper";
import { HttpExceptionBuilder } from "@/backend/http/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/response-builder";
import { RequestValidation } from "@/backend/http/validations/request-validation";
import { authMiddleware } from "@/backend/middlewares/auth.middleware";
import { LoginDtoSchema } from "@/shared/validation/auth/login-dto.schema";
import { RegisterDtoSchema } from "@/shared/validation/auth/register-dto.schema";

import type { LoginDto } from "@/shared/validation/auth/login-dto.schema";
import type { RegisterDto } from "@/shared/validation/auth/register-dto.schema";

const AuthRoute = new Hono().basePath("/api/auth");

AuthRoute.post(
  "/login",
  RequestValidation.json(LoginDtoSchema),
  async (ctx) => {
    const dto = await ctx.req.json<LoginDto>();
    const admin = await prisma.admin.findFirst({ where: { email: dto.email } });
    if (!admin) {
      const exception = HttpExceptionBuilder.unauthorized();
      return ctx.json(exception, 401);
    }

    const verify = await HashingHelper.verify(dto.password, admin.password);
    if (!verify) {
      const exception = HttpExceptionBuilder.unauthorized();
      return ctx.json(exception, 401);
    }

    const { accessToken } = JwtHelper.generateCredential({
      sub: admin.id,
    });

    setCookie(ctx, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    return ctx.json(ResponseBuilder.ok(null));
  },
);

AuthRoute.post(
  "/register",
  RequestValidation.json(RegisterDtoSchema),
  authMiddleware,
  async (ctx) => {
    const dto = await ctx.req.json<RegisterDto>();
    const admin = ctx.get("admin");

    if (admin.role !== "super_admin") {
      const exception = HttpExceptionBuilder.forbidden();
      return ctx.json(exception, 403);
    }

    const existingRep = await prisma.representative.findUnique({
      where: { email: dto.email },
    });

    if (existingRep) {
      const exception = HttpExceptionBuilder.conflict("Email already exists");
      return ctx.json(exception, 409);
    }

    const hashedPassword = await HashingHelper.hash(dto.password);

    const newAdmin = await prisma.admin.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        role: "coordinator",
      },
    });

    const newRep = await prisma.representative.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        organization: dto.organization,
        regionScopeId: dto.regionScopeId,
        accountId: newAdmin.id,
      },
    });

    return ctx.json(ResponseBuilder.ok({ id: newRep.id }));
  },
);

AuthRoute.post("/verify", authMiddleware, async (ctx) => {
  const admin = ctx.get("admin");
  return ctx.json(ResponseBuilder.ok({ user: admin }));
});

export default AuthRoute;

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

import type { LoginDto } from "@/shared/validation/auth/login-dto.schema";

const AuthRoute = new Hono().basePath("/api/auth");

AuthRoute.post(
  "/login",
  RequestValidation.json(LoginDtoSchema),
  authMiddleware,
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
      secure: true, // Đặt false nếu đang dev local (http)
      sameSite: "Strict",
      path: "/",
    });

    return ctx.json(ResponseBuilder.ok(null));
  },
);

export default AuthRoute;

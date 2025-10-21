import { getCookie } from "hono/cookie";

import { prisma } from "@/backend/db";
import { JwtHelper } from "@/backend/helpers/jwt.helper";
import { HttpExceptionBuilder } from "@/backend/http/http-exception-builder";

import type { Admin } from "@prisma/client";
import type { MiddlewareHandler } from "hono";

type AppEnv = {
  Variables: {
    admin: Omit<Admin, "password">;
  };
};

export const authMiddleware: MiddlewareHandler<AppEnv> = async (ctx, next) => {
  const token = getCookie(ctx, "accessToken");
  const exception = HttpExceptionBuilder.unauthorized();
  if (!token) {
    return ctx.json(exception, 401);
  }

  const payload = JwtHelper.verify(token);
  const admin = await prisma.admin.findUnique({
    where: { id: payload.sub },
    omit: {
      password: true,
    },
  });

  if (!admin) {
    return ctx.json(exception, 401);
  }

  ctx.set("admin", admin);
  await next();
};

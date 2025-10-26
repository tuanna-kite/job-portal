import { getCookie } from "hono/cookie";

import { prisma } from "@/backend/db";
import { JwtHelper } from "@/backend/helpers/jwt.helper";
import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";

import type { MiddlewareHandler } from "hono";

export const authMiddleware: MiddlewareHandler = async (ctx, next) => {
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

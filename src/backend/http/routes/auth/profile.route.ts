import { createRoute } from "@hono/zod-openapi";

import { AuthController } from "@/backend/controllers/auth.controller";
import { authMiddleware } from "@/backend/http/middlewares/auth.middleware";
import { changePasswordDtoSchema } from "@/shared/validation/auth/change-password-dto.schema";
import { updateProfileDtoSchema } from "@/shared/validation/auth/update-profile-dto.schema";

import type { OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "hono";

const controller = new AuthController();

const getProfileRoute = createRoute({
  method: "get",
  path: "/auth/profile",
  middleware: [authMiddleware] as any,
  tags: ["Auth"],
  summary: "Get admin profile",
  responses: {
    200: { description: "Admin profile retrieved successfully" },
  },
});

const updateProfileRoute = createRoute({
  method: "patch",
  path: "/auth/profile",
  middleware: [authMiddleware] as any,
  tags: ["Auth"],
  summary: "Update admin profile",
  request: {
    body: {
      content: {
        "application/json": { schema: updateProfileDtoSchema },
      },
    },
  },
  responses: {
    200: { description: "Profile updated successfully" },
  },
});

const changePasswordRoute = createRoute({
  method: "post",
  path: "/auth/change-password",
  middleware: [authMiddleware] as any,
  tags: ["Auth"],
  summary: "Change admin password",
  request: {
    body: {
      content: {
        "application/json": { schema: changePasswordDtoSchema },
      },
    },
  },
  responses: {
    200: { description: "Password changed successfully" },
  },
});

export function registerProfileRoutes(app: OpenAPIHono<Env>) {
  app.openapi(getProfileRoute, controller.getProfile);
  app.openapi(updateProfileRoute, controller.updateProfile);
  app.openapi(changePasswordRoute, controller.changePassword);
}


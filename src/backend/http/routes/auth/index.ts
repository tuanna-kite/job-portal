import { AuthController } from "@/backend/controllers/auth.controller";
import { authMiddleware } from "@/backend/http/middlewares/auth.middleware";
import loginRoute from "@/backend/http/routes/auth/login.route";
import { registerProfileRoutes } from "@/backend/http/routes/auth/profile.route";
import registerRoute from "@/backend/http/routes/auth/register.route";

import type { OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "hono";

function registerAuthRoute(app: OpenAPIHono<Env>) {
  const authController = new AuthController();

  app.openapi(loginRoute, authController.login);

  app.use("/auth/register", authMiddleware);
  app.openapi(registerRoute, authController.register);

  // Profile routes (middleware already defined in route definitions)
  registerProfileRoutes(app);
}

export default registerAuthRoute;

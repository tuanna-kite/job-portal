import { AuthController } from "@/backend/controllers/auth.controller";
import { authMiddleware } from "@/backend/http/middlewares/auth.middleware";
import loginRoute from "@/backend/http/routes/auth/login.route";
import registerRoute from "@/backend/http/routes/auth/register.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function registerAuthRoute(app: OpenAPIHono) {
  const authController = new AuthController();

  app.openapi(loginRoute, authController.login);

  app.use("/auth/register", authMiddleware);
  app.openapi(registerRoute, authController.register);
}

export default registerAuthRoute;

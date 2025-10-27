import { UsersController } from "@/backend/controllers/users.controller";
import getUserByCccdRoute from "@/backend/http/routes/users/get-user-by-cccd.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function registerUserRoute(app: OpenAPIHono) {
  const userController = new UsersController();

  app.openapi(getUserByCccdRoute, userController.detailByCccd);
}

export default registerUserRoute;

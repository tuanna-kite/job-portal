import { UsersController } from "@/backend/controllers/users.controller";
import getUserByCccdRoute from "@/backend/http/routes/users/get-user-by-cccd.route";
import listUsersRoute from "@/backend/http/routes/users/list-users.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function registerUserRoute(app: OpenAPIHono) {
  const userController = new UsersController();

  app.openapi(getUserByCccdRoute, userController.detailByCccd);
  app.openapi(listUsersRoute, userController.paginate);
}

export default registerUserRoute;

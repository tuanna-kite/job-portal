import { UsersController } from "@/backend/controllers/users.controller";
import deleteUserRoute from "@/backend/http/routes/users/delete-user.route";
import getStatusCountsRoute from "@/backend/http/routes/users/get-status-counts.route";
import getUserByCccdRoute from "@/backend/http/routes/users/get-user-by-cccd.route";
import getUserByIdRoute from "@/backend/http/routes/users/get-user-by-id.route";
import listUsersRoute from "@/backend/http/routes/users/list-users.route";
import unarchiveUserRoute from "@/backend/http/routes/users/unarchive-user.route";
import updateUserRoute from "@/backend/http/routes/users/update-user.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function registerUserRoute(app: OpenAPIHono) {
  const userController = new UsersController();

  app.openapi(getUserByIdRoute, userController.detailById);
  app.openapi(getUserByCccdRoute, userController.detailByCccd);
  app.openapi(listUsersRoute, userController.paginate);
  app.openapi(getStatusCountsRoute, userController.getStatusCounts);
  app.openapi(updateUserRoute, userController.update);
  app.openapi(deleteUserRoute, userController.delete);
  app.openapi(unarchiveUserRoute, userController.unarchive);
}

export default registerUserRoute;

import { NeedReportsController } from "@/backend/controllers/need-reports.controller";
import createReportByUserRoute from "@/backend/http/routes/reports/create-report-by-user.route";
import deleteReportRoute from "@/backend/http/routes/reports/delete-report.route";
import getReportDetailRoute from "@/backend/http/routes/reports/get-report-detail.route";
import listReportsRoute from "@/backend/http/routes/reports/list-reports.route";
import updateReportRoute from "@/backend/http/routes/reports/update-report.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function createNeedReportRoute(app: OpenAPIHono) {
  const needReportController = new NeedReportsController();

  app.openapi(listReportsRoute, needReportController.findAll);
  app.openapi(createReportByUserRoute, needReportController.createNeedReport);
  app.openapi(getReportDetailRoute, needReportController.getDetail);
  app.openapi(updateReportRoute, needReportController.update);
  app.openapi(deleteReportRoute, needReportController.delete);
}

export default createNeedReportRoute;

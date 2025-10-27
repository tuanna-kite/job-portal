import { NeedReportsController } from "@/backend/controllers/need-reports.controller";
import createReportByUserRoute from "@/backend/http/routes/reports/create-report-by-user.route";
import getReportDetailRoute from "@/backend/http/routes/reports/get-report-detail.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function createNeedReportRoute(app: OpenAPIHono) {
  const needReportController = new NeedReportsController();

  app.openapi(createReportByUserRoute, needReportController.createNeedReport);
  app.openapi(getReportDetailRoute, needReportController.getDetail);
}

export default createNeedReportRoute;

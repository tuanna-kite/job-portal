import { PartnersController } from "@/backend/controllers/partners.controller";
import createPartnerRoute from "@/backend/http/routes/partners/create-partner.route";
import listPartners from "@/backend/http/routes/partners/list-partners.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function registerPartnerRoute(app: OpenAPIHono) {
  const partnerController = new PartnersController();
  app.openapi(createPartnerRoute, partnerController.create);
  // TODO: List Partners (Pagination)
  app.openapi(listPartners, partnerController.findAll);
}

export default registerPartnerRoute;

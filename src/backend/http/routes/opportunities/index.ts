import { OpportunitiesController } from "@/backend/controllers/opportunities.controller";
import createOpportunityRoute from "@/backend/http/routes/opportunities/create-opportunity.route";
import deleteOpportunityRoute from "@/backend/http/routes/opportunities/delete-opportunity.route";
import listOpportunitiesRoute from "@/backend/http/routes/opportunities/list-opportunities.route";
import updateOpportunityRoute from "@/backend/http/routes/opportunities/update-opportunity.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function registerOpportunitiesRoute(app: OpenAPIHono) {
  const opportunitiesController = new OpportunitiesController();
  app.openapi(listOpportunitiesRoute, opportunitiesController.findAll);
  app.openapi(createOpportunityRoute, opportunitiesController.create);
  app.openapi(updateOpportunityRoute, opportunitiesController.update);
  app.openapi(deleteOpportunityRoute, opportunitiesController.delete);
}

export default registerOpportunitiesRoute;

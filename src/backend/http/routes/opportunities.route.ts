import { Hono } from "hono";

import { RequestValidation } from "@/backend/http/validations/request-validation";
import { CreateOpportunitySchema } from "@/shared/validation/opportunities/create-opportunity.schema";

const OpportunitiesRoute = new Hono().basePath("/api/opportunities");

OpportunitiesRoute.post(
  "/",
  RequestValidation.json(CreateOpportunitySchema),
  async (ctx, next) => {},
);

// TODO: Pagitate and Query
OpportunitiesRoute.get("/", async (ctx, next) => {});

// TODO: See detail
OpportunitiesRoute.get("/:id", async (ctx, next) => {});

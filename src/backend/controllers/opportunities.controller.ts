import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { OpportunitiesService } from "@/backend/services/opportunities.service";

import type { CreateOpportunityDto } from "@/shared/validation/opportunities/create-opportunity.schema";
import type { Context } from "hono";

export class OpportunitiesController {
  constructor(private service = new OpportunitiesService()) {}

  create = async (ctx: Context) => {
    const dto = await ctx.req.json<CreateOpportunityDto>();
    const newOpp = await this.service.create(dto);
    return ctx.json(ResponseBuilder.ok(newOpp), 201);
  };

  findAll = async (ctx: Context) => {
    const jobs = await this.service.findAll();
    return ctx.json(ResponseBuilder.ok(jobs));
  };
}

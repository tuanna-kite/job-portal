import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { PartnersService } from "@/backend/services/partners.service";

import type { CreatePartnerDto } from "@/shared/validation/partners/create-partner.schema";
import type { Context } from "hono";

export class PartnersController {
  constructor(private service = new PartnersService()) {}

  create = async (ctx: Context) => {
    const dto = await ctx.req.json<CreatePartnerDto>();
    const partner = await this.service.create(dto);
    return ctx.json(ResponseBuilder.ok(partner), 201);
  };

  findAll = async (ctx: Context) => {
    const partners = await this.service.findAll();
    return ctx.json(ResponseBuilder.ok(partners));
  };
}

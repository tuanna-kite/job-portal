import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { CasesService } from "@/backend/services/cases.service";

import type { Context } from "hono";

export class CasesController {
  constructor(private service = new CasesService()) {}

  findAll = async (ctx: Context) => {
    const cases = await this.service.findAll();
    return ctx.json(ResponseBuilder.ok(cases));
  };

  findById = async (ctx: Context) => {
    const { id } = ctx.req.param();
    const caseRecord = await this.service.findById(id);
    return ctx.json(ResponseBuilder.ok(caseRecord));
  };

  create = async (ctx: Context) => {
    const dto = await ctx.req.json();
    const newCase = await this.service.create(dto);
    return ctx.json(ResponseBuilder.ok(newCase), 201);
  };

  update = async (ctx: Context) => {
    const { id } = ctx.req.param();
    const dto = await ctx.req.json();
    const updatedCase = await this.service.update(id, dto);
    return ctx.json(ResponseBuilder.ok(updatedCase));
  };

  delete = async (ctx: Context) => {
    const { id } = ctx.req.param();
    await this.service.delete(id);
    return ctx.json(
      ResponseBuilder.ok({ message: "Case deleted successfully" }),
    );
  };
}

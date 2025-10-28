import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { RepsService } from "@/backend/services/reps.service";

import type { RepRole } from "@/shared/domains/reps/rep-role.enum";
import type { RepStatus } from "@/shared/domains/reps/rep-status.enum";
import type { CreateRepDto } from "@/shared/validation/reps/create-rep.schema";
import type { Context } from "hono";

export class RepsController {
  constructor(private service = new RepsService()) {}

  public create = async (ctx: Context) => {
    const dto = await ctx.req.json<CreateRepDto>();
    const created = await this.service.create(dto);

    return ctx.json(ResponseBuilder.ok(created), 201);
  };

  public findById = async (ctx: Context) => {
    const repId = ctx.req.param("id");
    const rep = await this.service.findById(repId);
    return ctx.json(
      ResponseBuilder.ok({
        ...rep,
        role: rep.role as RepRole,
        status: rep.status as RepStatus,
      }),
      200,
    );
  };

  public findAll = async (ctx: Context) => {
    const reps = await this.service.findAll();
    return ctx.json(ResponseBuilder.ok(reps));
  };

  public listUsersByRep = async (ctx: Context) => {
    const repId = ctx.req.param("repId");
    const users = await this.service.listUsersByRep(repId);
    return ctx.json(ResponseBuilder.ok(users));
  };
}

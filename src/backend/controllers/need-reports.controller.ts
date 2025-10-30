import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { NeedSupportsService } from "@/backend/services/need-supports.service";

import type { CreateReportByUserDto } from "@/shared/validation/reports/create-report-by-user.schema";
import type { Context } from "hono";

export class NeedReportsController {
  constructor(private service = new NeedSupportsService()) {}

  findAll = async (ctx: Context) => {
    const reports = await this.service.findAll();
    return ctx.json(ResponseBuilder.ok(reports), 200);
  };

  createNeedReport = async (ctx: Context) => {
    const dto = await ctx.req.json<CreateReportByUserDto>();
    const created = await this.service.createNeedReportByUser(dto);
    return ctx.json(ResponseBuilder.ok(created), 201);
  };

  getDetail = async (ctx: Context) => {
    const id = ctx.req.param("id") as string;
    const report = await this.service.findById(id);
    return ctx.json(ResponseBuilder.ok(report), 200);
  };

  update = async (ctx: Context) => {
    const id = ctx.req.param("id") as string;
    const dto = await ctx.req.json();
    const updated = await this.service.update(id, dto);
    return ctx.json(ResponseBuilder.ok(updated), 200);
  };

  delete = async (ctx: Context) => {
    const id = ctx.req.param("id") as string;
    await this.service.delete(id);
    return ctx.json(
      ResponseBuilder.ok({ message: "Report deleted successfully" }),
      200,
    );
  };
}

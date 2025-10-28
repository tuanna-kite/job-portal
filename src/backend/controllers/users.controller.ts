import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { UsersService } from "@/backend/services/users.service";

import type { CreateUserDto } from "@/shared/validation/users/create-user.schema";
import type { Context } from "hono";

export class UsersController {
  constructor(private service = new UsersService()) {}

  // TODO: Create User
  create = async (ctx: Context) => {
    const dto = await ctx.req.json<CreateUserDto>();
    const user = await this.service.createUser(dto);
    return ctx.json(ResponseBuilder.ok(user));
  };

  // TODO: Get detail by id
  detailById = async (ctx: Context) => {
    const id = ctx.req.param("id") as string;
    const user = await this.service.findById(id);
    return ctx.json(ResponseBuilder.ok(user));
  };

  detailByCccd = async (ctx: Context) => {
    const cccd = ctx.req.param("cccd") as string;
    const user = await this.service.findByCccd(cccd);
    return ctx.json(ResponseBuilder.ok(user));
  };

  // TODO: Filter with Pagination
  paginate = async (ctx: Context) => {
    const users = await this.service.findAll();
    return ctx.json(ResponseBuilder.ok(users));
  };
}

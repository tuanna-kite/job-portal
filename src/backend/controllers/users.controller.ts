import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";
import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { UsersService } from "@/backend/services/users.service";

import type { CreateUserDto } from "@/shared/validation/users/create-user.schema";
import type { UpdateUserDto } from "@/shared/validation/users/update-user.schema";
import type { Context } from "hono";

export class UsersController {
  constructor(private service = new UsersService()) {}

  // TODO: Create User
  create = async (ctx: Context) => {
    try {
      const dto = await ctx.req.json<CreateUserDto>();
      const user = await this.service.createUser(dto);
      return ctx.json(ResponseBuilder.ok(user));
    } catch (error: any) {
      if (error.name === "AppError") {
        const exception = HttpExceptionBuilder.error(
          error.code,
          error.message,
          undefined,
          error.code === "NOT_FOUND" ? 404 : 400,
        );
        // @ts-ignore
        return ctx.json(exception, exception.statusCode);
      }
      throw error;
    }
  };

  detailById = async (ctx: Context) => {
    try {
      const id = ctx.req.param("id") as string;
      const user = await this.service.findById(id);
      return ctx.json(ResponseBuilder.ok(user));
    } catch (error: any) {
      if (error.name === "AppError") {
        const exception = HttpExceptionBuilder.error(
          error.code,
          error.message,
          undefined,
          404,
        );
        // @ts-ignore
        return ctx.json(exception, exception.statusCode);
      }
      throw error;
    }
  };

  detailByCccd = async (ctx: Context) => {
    try {
      const cccd = ctx.req.param("cccd") as string;
      const user = await this.service.findByCccd(cccd);
      return ctx.json(ResponseBuilder.ok(user));
    } catch (error: any) {
      if (error.name === "AppError") {
        const exception = HttpExceptionBuilder.error(
          error.code,
          error.message,
          undefined,
          404,
        );
        // @ts-ignore
        return ctx.json(exception, exception.statusCode);
      }
      throw error;
    }
  };

  paginate = async (ctx: Context) => {
    try {
      const { searchParams } = new URL(ctx.req.url);
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const search = searchParams.get("search") || undefined;
      const status = searchParams.get("status") || undefined;
      const role = searchParams.get("role") || undefined;

      const result = await this.service.findManyWithPagination({
        page,
        limit,
        search,
        status,
        role,
      });

      return ctx.json(ResponseBuilder.okPaged(result.items, result.pagination));
    } catch (error: any) {
      if (error.name === "AppError") {
        const exception = HttpExceptionBuilder.error(
          error.code,
          error.message,
          undefined,
          400,
        );
        // @ts-ignore
        return ctx.json(exception, exception.statusCode);
      }
      throw error;
    }
  };

  getStatusCounts = async (ctx: Context) => {
    try {
      const counts = await this.service.getStatusCounts();
      return ctx.json(ResponseBuilder.ok(counts));
    } catch (error: any) {
      const exception = HttpExceptionBuilder.internal();
      // @ts-ignore
      return ctx.json(exception, exception.statusCode);
    }
  };

  update = async (ctx: Context) => {
    try {
      const id = ctx.req.param("id") as string;
      const dto = await ctx.req.json<UpdateUserDto>();
      const user = await this.service.update(id, dto);
      return ctx.json(ResponseBuilder.ok(user));
    } catch (error: any) {
      if (error.name === "AppError") {
        const exception = HttpExceptionBuilder.error(
          error.code,
          error.message,
          undefined,
          error.code === "NOT_FOUND" ? 404 : 400,
        );
        // @ts-ignore
        return ctx.json(exception, exception.statusCode);
      }
      throw error;
    }
  };

  delete = async (ctx: Context) => {
    try {
      const id = ctx.req.param("id") as string;
      await this.service.delete(id);
      return ctx.json(
        ResponseBuilder.ok({ message: "User archived successfully" }),
      );
    } catch (error: any) {
      if (error.name === "AppError") {
        const exception = HttpExceptionBuilder.error(
          error.code,
          error.message,
          undefined,
          404,
        );
        // @ts-ignore
        return ctx.json(exception, exception.statusCode);
      }
      throw error;
    }
  };

  unarchive = async (ctx: Context) => {
    try {
      const id = ctx.req.param("id") as string;
      await this.service.unarchive(id);
      return ctx.json(
        ResponseBuilder.ok({ message: "User unarchived successfully" }),
      );
    } catch (error: any) {
      if (error.name === "AppError") {
        const exception = HttpExceptionBuilder.error(
          error.code,
          error.message,
          undefined,
          error.code === "NOT_FOUND" ? 404 : 400,
        );
        // @ts-ignore
        return ctx.json(exception, exception.statusCode);
      }
      throw error;
    }
  };
}

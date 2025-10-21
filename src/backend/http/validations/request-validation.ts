import { zValidator } from "@hono/zod-validator";

import { HttpExceptionBuilder } from "@/backend/http/http-exception-builder";

import type { FieldError } from "@/shared/http/types";
import type { ValidationTargets } from "hono";
import type { ZodError, ZodSchema } from "zod/v3";

export class RequestValidation {
  static create<T extends ZodSchema>(
    schema: T,
    source: keyof ValidationTargets,
  ) {
    return zValidator(source, schema, (res, c) => {
      if (!res.success) {
        const fields = this.toFieldErrors(res.error);
        return c.json(HttpExceptionBuilder.validationErrors(fields), 422);
      }
    });
  }

  private static toFieldErrors<T extends ZodSchema = any>(
    error: ZodError<T>,
  ): FieldError[] {
    return error.issues.map((i) => {
      return {
        field: i.path.join("."),
        message: i.message,
      };
    });
  }

  // Sugar APIs nếu muốn dùng nhanh
  static json<T extends ZodSchema>(schema: T) {
    return this.create(schema, "json");
  }
  static query<T extends ZodSchema>(schema: T) {
    return this.create(schema, "query");
  }
  static params<T extends ZodSchema>(schema: T) {
    return this.create(schema, "param");
  }
  static form<T extends ZodSchema>(schema: T) {
    return this.create(schema, "form");
  }
}

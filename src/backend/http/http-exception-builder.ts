import { ResponseStatus } from "@/shared/http/status";

import type { ErrorBody, FieldError } from "@/shared/http/types";

export class HttpExceptionBuilder {
  // ==== ERROR ====
  static error(
    code: string,
    message: string,
    errors?: FieldError[],
    statusCode = 400,
  ): ErrorBody {
    return {
      status: ResponseStatus.Error,
      code,
      message,
      ...(errors && errors.length > 0 ? { errors } : {}),
      statusCode,
    };
  }
  // ==== SHORTCUTS ====
  static badRequest(message = "Bad request") {
    return this.error("BAD_REQUEST", message, undefined, 400);
  }

  static unauthorized(message = "Unauthorized") {
    return this.error("UNAUTHORIZED", message, undefined, 401);
  }

  static forbidden(message = "Forbidden") {
    return this.error("FORBIDDEN", message, undefined, 403);
  }

  static notFound(entity = "Resource") {
    return this.error("NOT_FOUND", `${entity} not found`, undefined, 404);
  }

  static conflict(message = "Conflict") {
    return this.error("CONFLICT", message, undefined, 409);
  }

  static validationErrors(errors: FieldError[]) {
    return this.error("VALIDATION_ERROR", "Validation error", errors, 422);
  }

  static internal() {
    return this.error(
      "INTERNAL_ERROR",
      "Internal Server Error",
      undefined,
      500,
    );
  }
}

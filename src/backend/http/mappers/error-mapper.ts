import { AppError } from "@/backend/errors/app-error";
import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";

import type { ContentfulStatusCode } from "hono/utils/http-status";

export function toHttpException(err: unknown): {
  body: unknown;
  status: ContentfulStatusCode;
} {
  if (err instanceof AppError) {
    switch (err.code) {
      case "INVALID_CREDENTIALS":
        return {
          body: HttpExceptionBuilder.unauthorized(err.message),
          status: 401,
        };
      case "FORBIDDEN":
        return {
          body: HttpExceptionBuilder.forbidden(err.message),
          status: 403,
        };
      case "CONFLICT":
        return {
          body: HttpExceptionBuilder.conflict(err.message),
          status: 409,
        };
      case "UNAUTHORIZED":
        return {
          body: HttpExceptionBuilder.unauthorized(err.message),
          status: 401,
        };
      case "INVALID_STATE":
        return {
          body: HttpExceptionBuilder.badRequest(err.message),
          status: 400,
        };
      case "NOT_FOUND":
        return { body: HttpExceptionBuilder.notFound(), status: 404 };
      default:
        return { body: HttpExceptionBuilder.internal(), status: 500 };
    }
  }

  return { body: HttpExceptionBuilder.internal(), status: 500 };
}

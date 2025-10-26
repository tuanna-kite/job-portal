import type { FieldError } from "@/shared/http/types";
import type { ZodError } from "zod/v4";

export class RequestValidation {
  static toFieldErrors<T = unknown>(error: ZodError<T>): FieldError[] {
    return error.issues.map((i) => {
      return {
        field: i.path.join("."),
        message: i.message,
      };
    });
  }
}

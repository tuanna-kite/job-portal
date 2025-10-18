import type { FieldError } from "@/shared/http/types";
import type { ZodError } from "zod";

export function toFieldErrors(error: ZodError): FieldError[] {
  return error.issues.map((i) => {
    return {
      field: i.path.join("."),
      message: i.message,
    };
  });
}

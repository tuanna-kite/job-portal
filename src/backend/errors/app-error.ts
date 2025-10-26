export type AppErrorCode =
  | "INVALID_CREDENTIALS"
  | "CONFLICT"
  | "NOT_FOUND"
  | "FORBIDDEN"
  | "INVALID_STATE"
  | "UNAUTHORIZED"
  | "VALIDATION_ERROR"
  | "INTERNAL_ERROR";

export class AppError extends Error {
  public readonly name: string;

  constructor(
    public readonly code: AppErrorCode,
    message?: string,
    public readonly details?: unknown,
  ) {
    super(message ?? code);
    this.name = "AppError";
  }
}

import { AppError } from "@/backend/errors/app-error";

export class AuthErrors {
  static invalidCredentials(message?: string) {
    const defaultMessage = "Invalid email or password";
    return new AppError("INVALID_CREDENTIALS", message ?? defaultMessage);
  }

  static unauthorized(message?: string) {
    return new AppError("UNAUTHORIZED", message ?? "Unauthorized");
  }
}

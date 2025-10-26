import { z } from "@hono/zod-openapi";

import { successDto } from "@/shared/validation/utils";

export const LoginDtoSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6),
  })
  .openapi("LoginDto");

export type LoginDto = z.infer<typeof LoginDtoSchema>;

export const LoginResponseDtoSchema = successDto(z.null()).openapi(
  "LoginSuccess",
);

export type LoginResponseDto = z.infer<typeof LoginResponseDtoSchema>;

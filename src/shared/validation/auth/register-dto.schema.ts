import { z } from "@hono/zod-openapi";

import { successDto } from "@/shared/validation/utils";

export const RegisterDtoSchema = z
  .object({
    repId: z.uuid(),
    password: z.string().min(6),
  })
  .openapi("RegisterDto");

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

export const RegisterResponseDtoSchema = successDto(
  z.object({
    rep: z.string().optional(),
    accountId: z.string().optional(),
  }),
).openapi("RegisterSuccess");

export type RegisterResponseDto = z.infer<typeof RegisterResponseDtoSchema>;

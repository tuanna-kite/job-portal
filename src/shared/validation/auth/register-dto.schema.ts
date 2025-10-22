import { z } from "zod/v3";

export const RegisterDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
  phone: z.string().optional(),
  organization: z.string().optional(),
  regionScopeId: z.string().uuid().optional(),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

import { z } from "zod/v3";

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

import { z } from "zod/v3";

import { RepRole } from "@/shared/domains/reps/rep-role.enum";

export const CreateRepSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  regionScopeId: z.string().uuid().optional(),
  role: z.nativeEnum(RepRole).default(RepRole.REP),
});

export type CreateRepDto = z.infer<typeof CreateRepSchema>;

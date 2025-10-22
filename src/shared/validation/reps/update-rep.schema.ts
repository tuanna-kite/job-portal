import { z } from "zod/v3";

import { RepRole } from "@/shared/domains/reps/rep-role.enum";
import { RepStatus } from "@/shared/domains/reps/rep-status.enum";

export const UpdateRepSchema = z.object({
  fullName: z.string().min(2).optional(),
  phone: z.string().optional(),
  organization: z.string().optional(),
  regionScopeId: z.string().uuid().optional(),
  role: z.nativeEnum(RepRole).optional(),
  status: z.nativeEnum(RepStatus).optional(),
});

export type UpdateRepDto = z.infer<typeof UpdateRepSchema>;

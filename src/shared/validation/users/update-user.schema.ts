import { z } from "zod/v3";

import { UserStatus } from "@/shared/domains/users/user-status.enum";

export const UpdateUserSchema = z.object({
  fullName: z.string().min(2).optional(),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  disabilityType: z.string().min(1).optional(),
  skills: z.array(z.string()).optional(),
  desiredJob: z.string().optional(),
  regionId: z.string().uuid().optional(),
  repId: z.string().uuid().optional(),
  status: z.nativeEnum(UserStatus).optional(),
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

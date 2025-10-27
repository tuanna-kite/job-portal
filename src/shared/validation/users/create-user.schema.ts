import { z } from "zod/v3";

import { DisabilityType } from "@/shared/domains/users/disability-type.enum";
import { Gender } from "@/shared/domains/users/gender.enum";
import { UserStatus } from "@/shared/domains/users/user-status.enum";

export const CreateUserSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().min(9),
  gender: z.nativeEnum(Gender),
  cccd: z.string().min(9),
  birthDate: z.coerce.date(),
  disabilityType: z.nativeEnum(DisabilityType),
  skills: z.array(z.string()).optional(),
  address: z.string().optional(),
  regionId: z.string().uuid().optional(),
  repId: z.string().uuid().optional(),
  status: z.nativeEnum(UserStatus).default(UserStatus.PENDING),
  desiredJob: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

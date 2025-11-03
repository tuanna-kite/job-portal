import { z } from "zod";

export const updateProfileDtoSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileDtoSchema>;


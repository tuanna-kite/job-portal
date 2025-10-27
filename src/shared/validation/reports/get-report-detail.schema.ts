import { z } from "@hono/zod-openapi";

import { NeedReportCreatedBy } from "@/shared/domains/reports/need-report-created-by.enum";
import { NeedReportStatus } from "@/shared/domains/reports/need-report-status.enum";
import { successDto } from "@/shared/validation/utils";

// Nested User schema (theo mẫu response bạn gửi)
const UserPublicSchema = z.object({
  id: z.uuid(),
  fullName: z.string(),
  gender: z.string(),
  birthDate: z.string().nullable(),
  phone: z.string().nullable(),
  disabilityType: z.string(),
  status: z.string(),
});

const RepresentativePublicSchema = z
  .object({
    id: z.uuid(),
    fullName: z.string(),
    phone: z.string().nullable(),
  })
  .nullable();

export const NeedReportDetailSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  status: z.enum(NeedReportStatus),
  createdBy: z.enum(NeedReportCreatedBy),
  category: z.string(),
  description: z.string(),
  attachments: z.array(z.string()),
  assignedToId: z.uuid().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  user: UserPublicSchema,
  assignedTo: RepresentativePublicSchema,
});

export const NeedReportDetailResponseSchema = successDto(
  NeedReportDetailSchema,
);

export type NeedReportDetailResponseDto = z.infer<
  typeof NeedReportDetailResponseSchema
>;

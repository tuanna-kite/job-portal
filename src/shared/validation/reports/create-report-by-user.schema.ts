import { z } from "@hono/zod-openapi";

import { NeedReportCategory } from "@/shared/domains/reports/need-report-category.enum";
import { DisabilityType } from "@/shared/domains/users/disability-type.enum";
import { Gender } from "@/shared/domains/users/gender.enum";
import { successDto } from "@/shared/validation/utils";

const CCCD_REGEX = /^\d{9}$|^\d{12}$/;

export const CreateReportByUserSchema = z.object({
  cccd: z
    .string()
    .regex(CCCD_REGEX, { message: "CCCD/CMND phải gồm 9 hoặc 12 chữ số" })
    .openapi({ example: "001002003004" }),
  userInfo: z
    .object({
      fullName: z.string().trim().min(2).openapi({ example: "Nguyen Van A" }),
      phone: z
        .string()
        .trim()
        .min(9)
        .max(15)
        .openapi({ example: "0123456789" }),
      gender: z.enum(Gender).openapi({ example: "male" }),
      birthDate: z.coerce
        .date()
        .openapi({ example: "2011-10-05T14:48:00.000Z" }),
      disabilityType: z
        .enum(DisabilityType)
        .openapi({ example: "PHYSICAL_DISABILITY" }),
      skills: z
        .array(z.string())
        .optional()
        .openapi({ example: ["Gõ văn bản"] }),
      regionId: z
        .uuid()
        .openapi({ example: "2b99ae85-79f4-4e5b-9433-c01fec2e51ef" }),
      address: z.string().trim().min(1).openapi({ example: "Hà Nội" }),
      desiredJob: z
        .string()
        .trim()
        .optional()
        .openapi({ example: "Việc làm online" }),
    })
    .optional(),
  category: z.enum(NeedReportCategory).openapi({ example: "JOB_SEEKING" }),
  description: z
    .string()
    .trim()
    .min(1)
    .openapi({ example: "Cần hỗ trợ việc làm tại nhà" }),
  attachments: z.array(z.string().trim()).default([]),
});

export type CreateReportByUserDto = z.infer<typeof CreateReportByUserSchema>;

export const CreateReportResponseSchema = successDto(
  z.object({
    reportId: z.uuid(),
  }),
);
export type CreateReportResponseDto = z.infer<
  typeof CreateReportResponseSchema
>;

import { z } from "zod/v3";

import { NeedReportCreatedBy } from "@/shared/domains/reports/need-report-created-by.enum";

export const CreateReportSchema = z.object({
  userId: z.string().uuid(),
  createdBy: z
    .nativeEnum(NeedReportCreatedBy)
    .default(NeedReportCreatedBy.USER),
  category: z.string().min(1),
  description: z.string().min(1),
  attachments: z.array(z.string()).optional(),
  assignedToId: z.string().uuid().optional(),
});

export type CreateReportDto = z.infer<typeof CreateReportSchema>;

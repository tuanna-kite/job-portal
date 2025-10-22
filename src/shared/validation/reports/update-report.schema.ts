import { z } from "zod/v3";

import { NeedReportStatus } from "@/shared/domains/reports/need-report-status.enum";

export const UpdateReportSchema = z.object({
  assignedToId: z.string().uuid().optional(),
  status: z.nativeEnum(NeedReportStatus).optional(),
  description: z.string().min(1).optional(),
  attachments: z.array(z.string()).optional(),
});

export type UpdateReportDto = z.infer<typeof UpdateReportSchema>;

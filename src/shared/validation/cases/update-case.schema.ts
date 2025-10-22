import { z } from "zod/v3";

import { CaseStatus } from "@/shared/domains/cases/case-status.enum";

export const UpdateCaseSchema = z.object({
  assignedRepId: z.string().uuid().optional(),
  status: z.nativeEnum(CaseStatus).optional(),
  notes: z.string().optional(),
});

export type UpdateCaseDto = z.infer<typeof UpdateCaseSchema>;

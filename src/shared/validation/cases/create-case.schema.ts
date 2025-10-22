import { z } from "zod/v3";

import { CaseStatus } from "@/shared/domains/cases/case-status.enum";

export const CreateCaseSchema = z.object({
  userId: z.string().uuid(),
  opportunityId: z.string().uuid(),
  assignedRepId: z.string().uuid().optional(),
  status: z.nativeEnum(CaseStatus).default(CaseStatus.PENDING),
  notes: z.string().optional(),
});

export type CreateCaseDto = z.infer<typeof CreateCaseSchema>;

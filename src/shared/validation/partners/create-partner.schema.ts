import { z } from "@hono/zod-openapi";

import { PartnerMajor } from "@/shared/domains/partners/partner-major.enum";

export const CreatePartnerSchema = z.object({
  email: z.email().trim(),
  phone: z.string().trim(),
  major: z.enum(PartnerMajor),
  address: z.string().min(5),
  notes: z.string().optional(),
});

export type CreatePartnerDto = z.infer<typeof CreatePartnerSchema>;

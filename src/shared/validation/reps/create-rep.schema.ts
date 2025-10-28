import { z } from "@hono/zod-openapi";

import { RepRole } from "@/shared/domains/reps/rep-role.enum";
import { RepStatus } from "@/shared/domains/reps/rep-status.enum";

export const CreateRepSchema = z
  .object({
    fullName: z.string().min(1).openapi({ example: "Nguyen Anh Tuan" }),
    email: z.email().openapi({ example: "tuanna@gmail.com" }),
    phone: z.string().min(6).max(20).openapi({ example: "0123456789" }),
    organization: z.string().min(1).openapi({ example: "Hoi khuyet tat" }),
    regionScopeId: z
      .uuid()
      .openapi({ example: "0ee5b7b9-7b6d-4b55-a206-74fc7cc70b3e" }),
    notes: z.string().optional(),
  })
  .openapi("CreateRepDto");

export type CreateRepDto = z.infer<typeof CreateRepSchema>;

const isoDateRegex =
  /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2}))$/;
export const RepEntity = z
  .object({
    id: z.uuid().openapi({ example: "245d95d2-7b62-4ed9-a5c8-c5192a27b048" }),
    fullName: z.string().openapi({ example: "Nguyen Anh Tuan" }),
    email: z.email().openapi({ example: "tuanna@gmail.com" }),
    phone: z.string().openapi({ example: "0123456789" }),
    organization: z.string().openapi({ example: "Hoi khuyet tat" }),
    role: z
      .enum([RepRole.REP, RepRole.REP_LEAD])
      .openapi({ example: RepRole.REP }),
    status: z
      .enum([RepStatus.ACTIVE, RepStatus.SUSPENDED])
      .openapi({ example: RepStatus.ACTIVE }),
    regionScopeId: z
      .uuid()
      .openapi({ example: "0ee5b7b9-7b6d-4b55-a206-74fc7cc70b3e" }),
    accountId: z.uuid().nullable().openapi({ example: null }),
    createdAt: z.string().regex(isoDateRegex).openapi({
      type: "string",
      format: "date-time",
      example: "2025-10-26T18:20:22.525Z",
    }),
    updatedAt: z.string().regex(isoDateRegex).openapi({
      format: "date-time",
      example: "2025-10-26T18:20:22.525Z",
    }),
    notes: z.string().nullable().default(null),
  })
  .openapi("Representative");

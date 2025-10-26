import { z } from "@hono/zod-openapi";

export const successDto = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    status: z.literal("success"),
    data: schema,
  });

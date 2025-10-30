import { createRoute, z } from "@hono/zod-openapi";

const NeedReportStatusEnum = z.enum([
  "open",
  "reviewing",
  "resolved",
  "rejected",
]);

const UpdateReportSchema = z.object({
  status: NeedReportStatusEnum.optional(),
  assignedToId: z.string().uuid().nullable().optional(),
  description: z.string().optional(),
});

const updateReportRoute = createRoute({
  method: "patch",
  path: "/reports/{id}",
  tags: ["Reports"],
  summary: "Update a need report",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateReportSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.any(),
          }),
        },
      },
      description: "Report updated successfully",
    },
  },
});

export default updateReportRoute;

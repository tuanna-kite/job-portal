import { createRoute } from "@hono/zod-openapi";

import {
  RegisterDtoSchema,
  RegisterResponseDtoSchema,
} from "@/shared/validation/auth/register-dto.schema";

const registerRoute = createRoute({
  method: "post",
  path: "/auth/register",
  tags: ["Auth"],
  summary:
    "Create admin account and link to an existing representative profile",
  security: [{ BearerAuth: [] }],
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: RegisterDtoSchema } },
    },
  },
  responses: {
    201: {
      description: "Created & linked",
      content: {
        "application/json": {
          schema: RegisterResponseDtoSchema,
          example: {
            status: "success",
            data: {
              repId: "245d95d2-7b62-4ed9-a5c8-c5192a27b048",
              accountId: "df894898-701f-455f-83be-354c111bb00f",
            },
          },
        },
      },
    },
    403: { description: "Forbidden (e.g. actor is not super_admin)" },
    404: { description: "Representative not found" },
    409: { description: "Representative already linked / Email conflict" },
    422: { description: "Validation error" },
  },
  operationId: "register",
});

export default registerRoute;

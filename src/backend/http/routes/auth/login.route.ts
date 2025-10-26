import { createRoute } from "@hono/zod-openapi";

import {
  LoginDtoSchema,
  LoginResponseDtoSchema,
} from "@/shared/validation/auth/login-dto.schema";

const loginRoute = createRoute({
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  summary: "Authenticate admin and set JWT in httpOnly cookie",
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: LoginDtoSchema } },
    },
  },
  responses: {
    200: {
      description: "Login successful (token set in httpOnly cookie)",
      content: {
        "application/json": {
          schema: LoginResponseDtoSchema,
          example: {
            status: "success",
            data: null,
          },
        },
      },
    },
    401: { description: "Unauthorized — invalid credentials" },
    422: { description: "Validation error" },
  },
});

export default loginRoute;

import { createRoute, z } from "@hono/zod-openapi";

import { RepEntity } from "@/shared/validation/reps/create-rep.schema";
import { successDto } from "@/shared/validation/utils";

const getRepDetailRoute = createRoute({
  method: "get",
  path: "/reps/:id",
  tags: ["Reps"],
  summary: "Get representative details by ID",
  request: {
    params: z
      .object({
        id: z
          .uuid()
          .openapi({ example: "245d95d2-7b62-4ed9-a5c8-c5192a27b048" }),
      })
      .openapi("RepDetailParams"),
  },
  responses: {
    200: {
      description: "Representative detail fetched successfully",
      content: {
        "application/json": {
          schema: successDto(RepEntity),
          example: {
            status: "success",
            data: {
              id: "245d95d2-7b62-4ed9-a5c8-c5192a27b048",
              fullName: "Nguyen Anh Tuan",
              email: "tuanna@gmail.com",
              phone: "0123456789",
              organization: "Hoi khuyet tat",
              role: "rep",
              status: "active",
              regionScopeId: "0ee5b7b9-7b6d-4b55-a206-74fc7cc70b3e",
              accountId: null,
              createdAt: "2025-10-26T18:20:22.525Z",
              updatedAt: "2025-10-26T18:20:22.525Z",
            },
          },
        },
      },
    },
  },
});

export default getRepDetailRoute;

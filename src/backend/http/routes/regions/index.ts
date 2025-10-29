import { createRoute, z } from "@hono/zod-openapi";

import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { RegionsRepository } from "@/backend/repositories/regions.repository";

import type { OpenAPIHono } from "@hono/zod-openapi";

const RegionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  level: z.string(),
  parentId: z.string().uuid().nullable(),
});

const getRegionsRoute = createRoute({
  method: "get",
  path: "/regions",
  tags: ["Regions"],
  summary: "Get all regions",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.array(RegionSchema),
          }),
        },
      },
      description: "List of regions",
    },
  },
});

function createRegionRoutes(app: OpenAPIHono) {
  app.openapi(getRegionsRoute, async (c) => {
    const regionsRepo = new RegionsRepository();
    const regions = await regionsRepo.findAll();

    return c.json(ResponseBuilder.ok(regions));
  });
}

export default createRegionRoutes;

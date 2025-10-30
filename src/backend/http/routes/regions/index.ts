import { createRoute, z } from "@hono/zod-openapi";

import { ResponseBuilder } from "@/backend/http/builder/response-builder";
import { RegionsRepository } from "@/backend/repositories/regions.repository";

import type { OpenAPIHono } from "@hono/zod-openapi";

const RegionLevelEnum = z.enum(["province", "district", "ward", "municipality"]);

const RegionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  level: RegionLevelEnum,
  parentId: z.string().uuid().nullable(),
  parent: z.object({
    id: z.string().uuid(),
    name: z.string(),
    level: RegionLevelEnum,
  }).nullable().optional(),
});

const CreateRegionSchema = z.object({
  name: z.string().min(1),
  level: RegionLevelEnum,
  parentId: z.string().uuid().optional(),
});

const UpdateRegionSchema = z.object({
  name: z.string().min(1).optional(),
  level: RegionLevelEnum.optional(),
  parentId: z.string().uuid().nullable().optional(),
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

const createRegionRoute = createRoute({
  method: "post",
  path: "/regions",
  tags: ["Regions"],
  summary: "Create a new region",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateRegionSchema,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: RegionSchema,
          }),
        },
      },
      description: "Region created successfully",
    },
  },
});

const updateRegionRoute = createRoute({
  method: "patch",
  path: "/regions/{id}",
  tags: ["Regions"],
  summary: "Update a region",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateRegionSchema,
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
            data: RegionSchema,
          }),
        },
      },
      description: "Region updated successfully",
    },
  },
});

const deleteRegionRoute = createRoute({
  method: "delete",
  path: "/regions/{id}",
  tags: ["Regions"],
  summary: "Delete a region",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            status: z.literal("success"),
            data: z.object({
              message: z.string(),
            }),
          }),
        },
      },
      description: "Region deleted successfully",
    },
  },
});

function createRegionRoutes(app: OpenAPIHono) {
  app.openapi(getRegionsRoute, async (c) => {
    const regionsRepo = new RegionsRepository();
    const regions = await regionsRepo.findAll();

    return c.json(ResponseBuilder.ok(regions));
  });

  app.openapi(createRegionRoute, async (c) => {
    const regionsRepo = new RegionsRepository();
    const body = c.req.valid("json");
    
    const region = await regionsRepo.create(body);

    return c.json(ResponseBuilder.ok(region), 201);
  });

  app.openapi(updateRegionRoute, async (c) => {
    const regionsRepo = new RegionsRepository();
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");
    
    const region = await regionsRepo.update(id, body);

    return c.json(ResponseBuilder.ok(region));
  });

  app.openapi(deleteRegionRoute, async (c) => {
    const regionsRepo = new RegionsRepository();
    const { id } = c.req.valid("param");
    
    await regionsRepo.delete(id);

    return c.json(ResponseBuilder.ok({ message: "Region deleted successfully" }));
  });
}

export default createRegionRoutes;

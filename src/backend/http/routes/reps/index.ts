import { RepsController } from "@/backend/controllers/reps.controller";
import { createRepRoute } from "@/backend/http/routes/reps/create-rep.route";
import getRepDetailRoute from "@/backend/http/routes/reps/get-detail.route";

import type { OpenAPIHono } from "@hono/zod-openapi";

function registerRepsRoute(app: OpenAPIHono) {
  const repsController = new RepsController();

  app.openapi(createRepRoute, repsController.create);
  app.openapi(getRepDetailRoute, repsController.findById);

  // TODO: Update Rep
  // TODO: Filter Reps with Paginate
  // TODO: List all user by rep
}

export default registerRepsRoute;

// const RepsRoute = new Hono();
//
// RepsRoute.get("/", authMiddleware, async (ctx) => {
//   const admin = ctx.get("admin");
//   const { searchParams } = new URL(ctx.req.url);
//
//   const page = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "10");
//   const regionScopeId = searchParams.get("regionScopeId");
//   const status = searchParams.get("status");
//   const search = searchParams.get("search");
//
//   const where: any = {};
//
//   if (regionScopeId) where.regionScopeId = regionScopeId;
//   if (status) where.status = status;
//   if (search) {
//     where.OR = [
//       { fullName: { contains: search, mode: "insensitive" } },
//       { email: { contains: search, mode: "insensitive" } },
//       { organization: { contains: search, mode: "insensitive" } },
//     ];
//   }
//
//   const [reps, total] = await Promise.all([
//     prisma.representative.findMany({
//       where,
//       include: {
//         regionScope: true,
//         account: true,
//         _count: {
//           select: {
//             users: true,
//             assignedCases: true,
//           },
//         },
//       },
//       skip: (page - 1) * limit,
//       take: limit,
//       orderBy: { createdAt: "desc" },
//     }),
//     prisma.representative.count({ where }),
//   ]);
//
//   return ctx.json(
//     ResponseBuilder.ok({
//       data: reps,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//       },
//     }),
//   );
// });
//
// RepsRoute.patch(
//   "/:id",
//   RequestValidation.json(UpdateRepSchema),
//   authMiddleware,
//   async (ctx) => {
//     const admin = ctx.get("admin");
//     const id = ctx.req.param("id");
//     const dto = await ctx.req.json<UpdateRepDto>();
//
//     const existingRep = await prisma.representative.findUnique({
//       where: { id },
//     });
//
//     if (!existingRep) {
//       const exception = HttpExceptionBuilder.notFound(
//         "Representative not found",
//       );
//       return ctx.json(exception, 404);
//     }
//
//     const rep = await prisma.representative.update({
//       where: { id },
//       data: {
//         fullName: dto.fullName,
//         phone: dto.phone,
//         organization: dto.organization,
//         regionScopeId: dto.regionScopeId,
//         role: dto.role,
//         status: dto.status,
//       },
//       include: {
//         regionScope: true,
//         account: true,
//       },
//     });
//
//     return ctx.json(ResponseBuilder.ok(rep));
//   },
// );
//
// RepsRoute.get("/:id/users", authMiddleware, async (ctx) => {
//   const admin = ctx.get("admin");
//   const id = ctx.req.param("id");
//
//   const rep = await prisma.representative.findUnique({
//     where: { id },
//   });
//
//   if (!rep) {
//     const exception = HttpExceptionBuilder.notFound("Representative not found");
//     return ctx.json(exception, 404);
//   }
//
//   const { searchParams } = new URL(ctx.req.url);
//   const page = parseInt(searchParams.get("page") || "1");
//   const limit = parseInt(searchParams.get("limit") || "10");
//   const status = searchParams.get("status");
//
//   const where: any = { repId: id };
//   if (status) where.status = status;
//
//   const [users, total] = await Promise.all([
//     prisma.user.findMany({
//       where,
//       include: {
//         region: true,
//         _count: {
//           select: {
//             cases: true,
//             needReports: true,
//           },
//         },
//       },
//       skip: (page - 1) * limit,
//       take: limit,
//       orderBy: { createdAt: "desc" },
//     }),
//     prisma.user.count({ where }),
//   ]);
//
//   return ctx.json(
//     ResponseBuilder.ok({
//       data: users,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//       },
//     }),
//   );
// });

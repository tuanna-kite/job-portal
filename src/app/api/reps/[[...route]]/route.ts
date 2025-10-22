import { handle } from "hono/vercel";

import RepresentativesRoute from "@/backend/http/routes/representatives.route";

export const runtime = "nodejs";

export const POST = handle(RepresentativesRoute);
export const GET = handle(RepresentativesRoute);
export const PATCH = handle(RepresentativesRoute);

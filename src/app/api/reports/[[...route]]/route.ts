import { handle } from "hono/vercel";

import ReportsRoute from "@/backend/http/routes/reports.route";

export const runtime = "nodejs";

export const POST = handle(ReportsRoute);
export const GET = handle(ReportsRoute);
export const PATCH = handle(ReportsRoute);
export const DELETE = handle(ReportsRoute);

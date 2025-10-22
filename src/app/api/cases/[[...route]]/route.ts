import { handle } from "hono/vercel";

import CasesRoute from "@/backend/http/routes/cases.route";

export const runtime = "nodejs";

export const POST = handle(CasesRoute);
export const GET = handle(CasesRoute);
export const PATCH = handle(CasesRoute);

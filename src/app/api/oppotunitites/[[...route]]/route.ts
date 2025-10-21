import { handle } from "hono/vercel";

import { OpportunitiesRoute } from "@/backend/http/routes/opportunities.route";

export const runtime = "nodejs";

export const POST = handle(OpportunitiesRoute);
export const GET = handle(OpportunitiesRoute);

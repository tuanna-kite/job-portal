import { handle } from "hono/vercel";

import AuthRoute from "@/backend/routes/auth.route";

export const runtime = "nodejs";

export const POST = handle(AuthRoute);

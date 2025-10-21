import { handle } from "hono/vercel";

import AuthRoute from "@/backend/http/routes/auth.route";

export const runtime = "nodejs";

export const POST = handle(AuthRoute);

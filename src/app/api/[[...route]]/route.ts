import { handle } from "hono/vercel";

import app from "@/backend/server";

export const runtime = "nodejs";

// Map đủ HTTP methods bạn cần
export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const OPTIONS = handle(app); // nếu cần CORS preflight

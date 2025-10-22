import { handle } from "hono/vercel";

import UsersRoute from "@/backend/http/routes/users.route";

export const runtime = "nodejs";

export const POST = handle(UsersRoute);
export const GET = handle(UsersRoute);
export const PATCH = handle(UsersRoute);
export const DELETE = handle(UsersRoute);
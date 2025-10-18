import { Hono } from "hono";
import { handle } from "hono/vercel";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/users");

app.get("/", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});

app.post("/", (c) => {
  return c.json({
    message: "Hello from Hono!",
  });
});


export const POST = handle(app);
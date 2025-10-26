import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { HttpExceptionBuilder } from "@/backend/http/builder/http-exception-builder";
import { toHttpException } from "@/backend/http/mappers/error-mapper";
import OpenApiApp from "@/backend/openapi";

export const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", cors());
app.use("*", prettyJSON());

// Mount route
app.route("/", OpenApiApp);

// Error Handling
app.onError((err, c) => {
  console.error(err.stack);
  const { body, status } = toHttpException(err);
  return c.json(body, status);
});
// 404 fallback
app.notFound((c) => c.json(HttpExceptionBuilder.notFound(), 404));

export default app;

import type { Context } from "hono";

export function jsonWithStatus(c: Context, payload: any, defaultStatus = 200) {
  const status =
    typeof payload?.statusCode === "number"
      ? payload.statusCode
      : defaultStatus;
  const headers = payload?.headers
    ? (payload.headers as Record<string, string>)
    : undefined;
  const { headers: _headers, ...body } = payload ?? {};
  return c.json(body, status, headers);
}

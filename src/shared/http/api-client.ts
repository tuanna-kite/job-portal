export type ApiSuccess<T> = {
  status: "success";
  data: T;
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export type ApiError = {
  status: "error";
  code: string;
  message: string;
  errors?: Array<{ field: string; message: string; i18nKey?: string }>;
  statusCode: number;
};

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: unknown;
  token?: string | null;
  query?: Record<string, string | number | boolean | undefined>;
};

const buildQuery = (query?: RequestOptions["query"]) => {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) params.append(key, String(value));
  });
  const s = params.toString();
  return s ? `?${s}` : "";
};

export async function apiFetch<T>(
  path: string,
  { method = "GET", headers, body, token, query }: RequestOptions = {},
): Promise<ApiSuccess<T>> {
  const url = `/api${path}${buildQuery(query)}`;

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const err: ApiError =
      json && json.status === "error"
        ? json
        : {
            status: "error",
            code: "UNKNOWN_ERROR",
            message: res.statusText || "Unknown error",
            statusCode: res.status,
          };
    throw err;
  }

  return json as ApiSuccess<T>;
}



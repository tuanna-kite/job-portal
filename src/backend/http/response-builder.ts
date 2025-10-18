import { ResponseStatus } from "@/shared/http/status";

import type { Pagination } from "@/shared/http/pagination";
import type {
  SuccessPaginated,
  Success,
} from "@/shared/http/types";

export class ResponseBuilder {
  // ==== SUCCESS ====
  static ok<T>(data: T): Success<T> {
    return {
      status: ResponseStatus.Success,
      data,
    };
  }

  static okPaged<T>(
    data: T[],
    pagination: { page: number; limit: number; totalItems: number },
  ): SuccessPaginated<T[]> {
    return {
      status: ResponseStatus.Success,
      data,
      pagination: ResponseBuilder.buildPagination(pagination),
    };
  }

  private static buildPagination(meta: {
    page: number;
    limit: number;
    totalItems: number;
  }): Pagination {
    const totalPages = Math.max(
      1,
      Math.ceil(meta.totalItems / Math.max(1, meta.limit)),
    );
    const hasNextPage = meta.page < totalPages;
    return { ...meta, totalPages, hasNextPage };
  }
}

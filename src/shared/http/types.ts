import type { Pagination } from "@/shared/http/pagination";
import type { ResponseStatus } from "@/shared/http/status";

export type Success<T> = {
  status: ResponseStatus.Success;
  data: T;
  pagination?: Pagination;
};

export type SuccessPaginated<T> = Success<T> & {
  pagination: Pagination;
};

export type FieldError = {
  field: string;
  message: string;
  i18nKey?: string;
};

export type ErrorBody = {
  status: ResponseStatus.Error;
  code: string; // e.g. EMAIL_ALREADY_EXISTS
  message: string; // human message (i18n-friendly)
  errors?: FieldError[]; // optional field errors
  statusCode: number | string;
};

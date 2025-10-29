import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";
import { qk } from "@/shared/http/query-keys";

import type { User } from "@/shared/http/hooks/users";
import type { CreateRepDto } from "@/shared/validation/reps/create-rep.schema";

export type Rep = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  role: "rep" | "rep_lead";
  status: "active" | "suspended";
  regionScopeId: string;
  accountId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export function useReps(filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: qk.reps(filters),
    queryFn: () =>
      apiFetch<Rep[]>("/reps", {
        query: {
          page: filters?.page ?? 1,
          limit: filters?.limit ?? 10,
          search: filters?.search,
        },
      }),
    select: (res) => ({ items: res.data, pagination: res.pagination }),
  });
}

export function useRepDetail(id: string | null) {
  return useQuery({
    queryKey: qk.partnerDetail(id || ""),
    enabled: Boolean(id),
    queryFn: () => apiFetch<Rep>(`/reps/${id}`),
    select: (res) => res.data,
  });
}

export function useUsersByRep(
  repId: string | null,
  filters?: { page?: number; limit?: number; status?: string },
) {
  return useQuery({
    queryKey: ["rep-users", repId, filters] as const,
    enabled: Boolean(repId),
    queryFn: () =>
      apiFetch<User[]>(`/reps/${repId}/users`, {
        query: {
          page: filters?.page ?? 1,
          limit: filters?.limit ?? 10,
          status: filters?.status,
        },
      }),
    select: (res) => ({ items: res.data, pagination: res.pagination }),
  });
}

export function useCreateRep() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRepDto) =>
      apiFetch<Rep>("/reps", { method: "POST", body: dto }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.reps(undefined) });
    },
  });
}

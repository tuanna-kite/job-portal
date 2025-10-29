import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

export type Case = {
  id: string;
  userId: string;
  opportunityId: string;
  assignedRepId?: string | null;
  status: "pending" | "in_progress" | "matched" | "rejected" | "done";
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCaseDto = {
  userId: string;
  opportunityId: string;
  assignedRepId?: string;
  status?: Case["status"];
  notes?: string;
};

export type UpdateCaseDto = {
  assignedRepId?: string | null;
  status?: Case["status"];
  notes?: string | null;
};

export type CaseTimelineEvent = {
  id: string;
  action: string;
  timestamp: string;
  details: string;
};

export function useCases(
  filters: {
    page?: number;
    limit?: number;
    userId?: string;
    opportunityId?: string;
    assignedRepId?: string;
    status?: Case["status"];
  } = {},
) {
  return useQuery({
    queryKey: ["cases", filters] as const,
    queryFn: () =>
      apiFetch<Case[]>("/cases", {
        query: {
          page: filters.page ?? 1,
          limit: filters.limit ?? 10,
          userId: filters.userId,
          opportunityId: filters.opportunityId,
          assignedRepId: filters.assignedRepId,
          status: filters.status,
        },
      }),
    select: (res) => ({ items: res.data, pagination: res.pagination }),
    enabled: true,
  });
}

export function useCreateCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCaseDto) =>
      apiFetch<Case>("/cases", { method: "POST", body: dto }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function useUpdateCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCaseDto }) =>
      apiFetch<Case>(`/cases/${id}`, { method: "PATCH", body: dto }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["cases"] });
      qc.invalidateQueries({ queryKey: ["case-timeline", vars.id] });
    },
  });
}

export function useCaseTimeline(id: string | null) {
  return useQuery({
    queryKey: ["case-timeline", id] as const,
    enabled: Boolean(id),
    queryFn: () => apiFetch<CaseTimelineEvent[]>(`/cases/${id}/timeline`),
    select: (res) => res.data,
  });
}

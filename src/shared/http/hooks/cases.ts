import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

export type CaseStatus =
  | "pending"
  | "in_progress"
  | "matched"
  | "rejected"
  | "done";

export type Case = {
  id: string;
  userId: string;
  user?: {
    id: string;
    fullName: string;
    email?: string | null;
    phone?: string | null;
    cccd?: string | null;
  };
  opportunityId?: string | null;
  opportunity?: {
    id: string;
    title: string;
    partner?: {
      email: string;
    };
  } | null;
  assignedRepId?: string | null;
  assignedRep?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  needReportId?: string | null;
  needReport?: {
    id: string;
    category: string;
    description: string;
  } | null;
  status: CaseStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateCaseDto = {
  userId: string;
  opportunityId?: string;
  assignedRepId?: string;
  status?: Case["status"];
  notes?: string;
};

export type UpdateCaseDto = {
  assignedRepId?: string | null;
  status?: Case["status"];
  notes?: string | null;
};

export type CreateCaseFromNeedReportDto = {
  needReportId: string;
  opportunityId: string;
  assignedRepId?: string;
  notes?: string;
};

export type CaseTimelineEvent = {
  id: string;
  action: string;
  timestamp: string;
  details: string;
};

export function useCases() {
  return useQuery({
    queryKey: ["cases"] as const,
    queryFn: () => apiFetch<Case[]>("/cases"),
    select: (res) => res.data,
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

export function useCreateCaseFromNeedReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCaseFromNeedReportDto) =>
      apiFetch<Case>("/cases/from-need-report", { method: "POST", body: dto }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cases"] });
      qc.invalidateQueries({ queryKey: ["need-reports"] });
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

export function useDeleteCase() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiFetch(`/cases/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cases"] });
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

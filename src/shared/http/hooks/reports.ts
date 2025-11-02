import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

import type { CreateReportByUserDto } from "@/shared/validation/reports/create-report-by-user.schema";

export type NeedReportStatus = "open" | "reviewing" | "resolved" | "rejected";
export type NeedSupportCategory =
  | "JOB_SEEKING"
  | "TRAINING_EDUCATION"
  | "ASSISTIVE_DEVICES"
  | "FINANCIAL_ASSISTANCE"
  | "HEALTHCARE_SUPPORT"
  | "HOUSING_SUPPORT"
  | "TRANSPORTATION_SUPPORT"
  | "LEGAL_SUPPORT"
  | "SOCIAL_INCLUSION"
  | "COUNSELING_MENTAL_HEALTH";

export type NeedReport = {
  id: string;
  userId: string;
  user?: {
    id: string;
    fullName: string;
    phone?: string | null;
  };
  status: NeedReportStatus;
  createdBy: "user" | "rep";
  category: NeedSupportCategory;
  description: string;
  attachments: string[];
  assignedToId?: string | null;
  assignedTo?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  case?: {
    id: string;
    status: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateNeedReportDto = {
  status?: NeedReportStatus;
  assignedToId?: string | null;
  description?: string;
};

export function useNeedReports() {
  return useQuery({
    queryKey: ["need-reports"] as const,
    queryFn: () => apiFetch<NeedReport[]>("/reports"),
    select: (res) => res.data,
  });
}

export function useCreateReportByUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateReportByUserDto) =>
      apiFetch<NeedReport>("/reports", { method: "POST", body: dto }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["need-reports"] });
    },
  });
}

export function useUpdateNeedReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNeedReportDto }) =>
      apiFetch<NeedReport>(`/reports/${id}`, {
        method: "PATCH",
        body: data,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["need-reports"] });
    },
  });
}

export function useDeleteNeedReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/reports/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["need-reports"] });
    },
  });
}

export function useReportDetail(id: string | null) {
  return useQuery({
    queryKey: ["report-detail", id] as const,
    enabled: Boolean(id),
    queryFn: () => apiFetch<NeedReport>(`/reports/${id}`),
    select: (res) => res.data,
  });
}

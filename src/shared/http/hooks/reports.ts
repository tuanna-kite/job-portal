import { useMutation, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

import type { CreateReportByUserDto } from "@/shared/validation/reports/create-report-by-user.schema";

export type NeedReport = {
  id: string;
  userId: string;
  status: "open" | "reviewing" | "resolved";
  createdBy: "user" | "rep";
  category: string;
  description: string;
  attachments: string[];
  assignedToId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export function useCreateReportByUser() {
  return useMutation({
    mutationFn: (dto: CreateReportByUserDto) =>
      apiFetch<NeedReport>("/reports", { method: "POST", body: dto }),
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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";
import { qk } from "@/shared/http/query-keys";

export type Opportunity = {
  id: string;
  title: string;
  partnerId: string;
  locationType: "remote" | "hybrid" | "onsite";
  address: string;
  description?: string | null;
  requirements?: string | null;
  salaryRange?: string | null;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
};

export function useOpportunities(filters?: { page?: number; limit?: number }) {
  return useQuery({
    queryKey: qk.opportunities(filters),
    queryFn: () =>
      apiFetch<Opportunity[]>("/opportunities", {
        query: { page: filters?.page ?? 1, limit: filters?.limit ?? 10 },
      }).then((r) => r),
    select: (res) => ({ items: res.data, pagination: res.pagination }),
    staleTime: 30_000,
  });
}

export type CreateOpportunityDto = {
  title: string;
  partnerId: string;
  locationType?: "remote" | "hybrid" | "onsite";
  address: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
};

export function useCreateOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateOpportunityDto) =>
      apiFetch<Opportunity>("/opportunities", { method: "POST", body: dto }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.opportunities(undefined) });
    },
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";
import { qk } from "@/shared/http/query-keys";

export type OpportunityLocationType = "remote" | "hybrid" | "onsite";
export type OpportunityStatus = "open" | "closed";

export type Partner = {
  id: string;
  email: string;
  phone: string;
  major: string;
  address: string;
};

export type Opportunity = {
  id: string;
  title: string;
  partnerId: string;
  partner?: Partner;
  locationType: OpportunityLocationType;
  address: string;
  description?: string | null;
  requirements?: string | null;
  salaryRange?: string | null;
  status: OpportunityStatus;
  createdAt: string;
  updatedAt: string;
};

export function useOpportunities() {
  return useQuery({
    queryKey: qk.opportunities(undefined),
    queryFn: () => apiFetch<Opportunity[]>("/opportunities"),
    select: (res) => res.data,
    staleTime: 30_000,
  });
}

export type CreateOpportunityDto = {
  title: string;
  partnerId: string;
  locationType?: OpportunityLocationType;
  address: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
};

export type UpdateOpportunityDto = {
  title?: string;
  partnerId?: string;
  locationType?: OpportunityLocationType;
  address?: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
  status?: OpportunityStatus;
};

export function useCreateOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateOpportunityDto) =>
      apiFetch<Opportunity>("/opportunities", {
        method: "POST",
        body: dto,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.opportunities(undefined) });
    },
  });
}

export function useUpdateOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOpportunityDto }) =>
      apiFetch<Opportunity>(`/opportunities/${id}`, {
        method: "PATCH",
        body: data,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.opportunities(undefined) });
    },
  });
}

export function useDeleteOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/opportunities/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.opportunities(undefined) });
    },
  });
}

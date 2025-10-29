import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";
import { qk } from "@/shared/http/query-keys";

export type Partner = {
  id: string;
  email: string;
  phone: string;
  major: string;
  address: string;
  notes?: string | null;
  status: "pending" | "active" | "archived";
};

export function usePartners(filters?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: qk.partners(filters),
    queryFn: () =>
      apiFetch<Partner[]>("/partners", {
        query: {
          page: filters?.page ?? 1,
          limit: filters?.limit ?? 10,
          search: filters?.search,
        },
      }),
    select: (res) => ({ items: res.data, pagination: res.pagination }),
  });
}

export type CreatePartnerDto = {
  email: string;
  phone: string;
  major: string;
  address: string;
  notes?: string;
};

export function useCreatePartner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePartnerDto) =>
      apiFetch<Partner>("/partners", { method: "POST", body: dto }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.partners(undefined) });
    },
  });
}

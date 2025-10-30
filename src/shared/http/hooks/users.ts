import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";
import { qk } from "@/shared/http/query-keys";

export type User = {
  id: string;
  cccd: string;
  fullName: string;
  gender: "male" | "female";
  birthDate: string;
  phone: string;
  disabilityType: string;
  skills: string[];
  desiredJob?: string | null;
  address?: string | null;
  status: "pending" | "active" | "archived";
  regionId?: string | null;
  repId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export function useUsers(filters?: { page?: number; limit?: number; search?: string }) {
  return useQuery({
    queryKey: qk.users(filters),
    queryFn: () =>
      apiFetch<User[]>("/users", {
        query: { page: filters?.page ?? 1, limit: filters?.limit ?? 10, search: filters?.search },
      }),
    select: (res) => ({ items: res.data, pagination: res.pagination }),
  });
}

export function useUserByCccd(cccd: string | null) {
  return useQuery({
    queryKey: ["user-cccd", cccd] as const,
    enabled: Boolean(cccd),
    queryFn: () => apiFetch<User>(`/users/cccd/${cccd}`),
    select: (res) => res.data,
  });
}

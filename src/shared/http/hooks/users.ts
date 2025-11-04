import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";
import { qk } from "@/shared/http/query-keys";

import type { UpdateUserDto } from "@/shared/validation/users/update-user.schema";

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
  region?: {
    id: string;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export function useUsers(filters?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
}) {
  return useQuery({
    queryKey: qk.users(filters),
    queryFn: () =>
      apiFetch<User[]>("/users", {
        query: {
          page: filters?.page ?? 1,
          limit: filters?.limit ?? 10,
          search: filters?.search,
          status: filters?.status,
          role: filters?.role,
        },
      }),
    select: (res) => ({ items: res.data, pagination: res.pagination }),
  });
}

export function useUserStatusCounts() {
  return useQuery({
    queryKey: ["users", "status-counts"] as const,
    queryFn: () =>
      apiFetch<{ all: number; active: number; banned: number }>(
        "/users/status/counts",
      ),
    select: (res) => res.data,
  });
}

export function useUserDetail(id: string | null) {
  return useQuery({
    queryKey: ["user", id] as const,
    enabled: Boolean(id),
    queryFn: () => apiFetch<User>(`/users/${id}`),
    select: (res) => res.data,
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

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateUserDto }) =>
      apiFetch<User>(`/users/${id}`, { method: "PATCH", body: dto }),
    onSuccess: (_, variables) => {
      // Invalidate tất cả queries liên quan
      qc.invalidateQueries({ 
        queryKey: ["users"],
        refetchType: "active",
      });
      qc.invalidateQueries({ 
        queryKey: ["user", variables.id],
        refetchType: "active",
      });
      qc.invalidateQueries({ 
        queryKey: ["users", "status-counts"],
        refetchType: "active",
      });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/users/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      // Invalidate và refetch tất cả queries bắt đầu với "users"
      qc.invalidateQueries({ 
        queryKey: ["users"],
        refetchType: "active",
      });
      qc.invalidateQueries({ 
        queryKey: ["users", "status-counts"],
        refetchType: "active",
      });
    },
  });
}

export function useUnarchiveUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/users/${id}/unarchive`, { method: "PATCH" }),
    onSuccess: () => {
      // Invalidate và refetch tất cả queries bắt đầu với "users"
      qc.invalidateQueries({ 
        queryKey: ["users"],
        refetchType: "active",
      });
      qc.invalidateQueries({ 
        queryKey: ["users", "status-counts"],
        refetchType: "active",
      });
    },
  });
}

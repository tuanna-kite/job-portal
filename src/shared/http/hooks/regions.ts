import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

export type RegionLevel = "province" | "district" | "ward" | "municipality";

export type Region = {
  id: string;
  name: string;
  level: RegionLevel;
  parentId: string | null;
  parent?: {
    id: string;
    name: string;
    level: RegionLevel;
  } | null;
};

export type CreateRegionDto = {
  name: string;
  level: RegionLevel;
  parentId?: string;
};

export type UpdateRegionDto = {
  name?: string;
  level?: RegionLevel;
  parentId?: string | null;
};

export function useRegions() {
  return useQuery({
    queryKey: ["regions"] as const,
    queryFn: () => apiFetch<Region[]>("/regions"),
    select: (res) => res.data,
  });
}

export function useCreateRegion() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateRegionDto) => {
      const response = await apiFetch<Region>("/regions", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
  });
}

export function useUpdateRegion() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateRegionDto }) => {
      const response = await apiFetch<Region>(`/regions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
  });
}

export function useDeleteRegion() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/regions/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
  });
}

import { useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

export type Region = {
  id: string;
  name: string;
  level: string;
  parentId: string | null;
};

export function useRegions() {
  return useQuery({
    queryKey: ["regions"] as const,
    queryFn: () => apiFetch<Region[]>("/regions"),
    select: (res) => res.data,
  });
}

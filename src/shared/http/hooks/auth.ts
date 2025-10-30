import { useMutation, useQuery } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  role: string;
};

export type VerifyResponse = {
  user: AdminUser;
};

export function useLogin() {
  return useMutation({
    mutationFn: (dto: { email: string; password: string }) =>
      apiFetch<null>("/auth/login", { method: "POST", body: dto }),
  });
}

export function useVerify(enabled = false) {
  return useQuery({
    queryKey: ["auth", "verify"] as const,
    enabled,
    queryFn: () => apiFetch<VerifyResponse>("/auth/verify"),
    select: (res) => res.data.user,
  });
}



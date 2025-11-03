import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { apiFetch } from "@/shared/http/api-client";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
};

export type VerifyResponse = {
  user: AdminUser;
};

export type UpdateProfileDto = {
  fullName: string;
  phone?: string;
  avatar?: string;
};

export type ChangePasswordDto = {
  oldPassword: string;
  newPassword: string;
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

export function useAdminProfile() {
  return useQuery({
    queryKey: ["auth", "profile"] as const,
    queryFn: () => apiFetch<AdminUser>("/auth/profile"),
    select: (res) => res.data,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: UpdateProfileDto) =>
      apiFetch<AdminUser>("/auth/profile", {
        method: "PATCH",
        body: dto,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "profile"] });
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (dto: ChangePasswordDto) =>
      apiFetch<{ message: string }>("/auth/change-password", {
        method: "POST",
        body: dto,
      }),
  });
}

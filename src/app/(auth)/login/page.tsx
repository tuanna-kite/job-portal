"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import LoginForm from "@/components/forms/LoginForm";
import { logoMini } from "@/contants/images";
import { useLogin } from "@/shared/http/hooks/auth";

function LoginPage() {
  const router = useRouter();
  const form = useForm<any>({
    mode: "onChange", // Validate on blur for better UX
    reValidateMode: "onChange", // Re-validate on change after first validation
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useLogin();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(values);
      // Persist minimal auth flag; backend sets HttpOnly cookie
      localStorage.setItem("isAdminAuthenticated", "true");
      localStorage.setItem("adminEmail", values.email);
      router.replace("/admin");
    } catch (e) {
      // no-op: LoginForm should show error if it handles it; otherwise you can add a toast here
    }
  };

  return (
    <div className="mx-auto flex h-full items-center justify-center bg-white px-6 py-4">
      <div className="w-full">
        <Image src={logoMini} alt="logo app" className="mx-auto my-4 w-44" />
        <div>
          <p className="mb-3 text-center text-xl font-semibold text-[#212B36] md:text-2xl xl:text-3xl">
            Chào mừng bạn trở lại
          </p>
        </div>

        <LoginForm onSubmit={onSubmit} form={form} />
      </div>
    </div>
  );
}

export default LoginPage;

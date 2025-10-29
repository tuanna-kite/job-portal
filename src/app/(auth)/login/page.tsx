"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import LoginForm from "@/components/forms/LoginForm";
import { logoMini } from "@/contants/images";

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

  const onSubmit = () => {};

  return (
    <div className="mx-auto flex h-full items-center justify-center bg-white px-6 py-4">
      <div className="w-full">
        <Image src={logoMini} alt="logo app" className="mx-auto my-4 w-44" />
        <div>
          <p className="mb-3 text-center text-xl font-semibold text-[#212B36] md:text-2xl xl:text-3xl">
            Chào mừng bạn trở lại
          </p>
          <div className="flex justify-center gap-2 text-sm">
            <p className="text-[#212B36]">Bạn chưa phải là thành viên?</p>
            <p
              className="text-primary-main cursor-pointer font-semibold hover:underline"
              onClick={() => router.push("/register")}
            >
              Đăng ký
            </p>
          </div>
        </div>

        <LoginForm onSubmit={onSubmit} form={form} />
      </div>
    </div>
  );
}

export default LoginPage;

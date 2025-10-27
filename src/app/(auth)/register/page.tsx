"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import RegisterForm from "@/components/forms/RegisterForm";
import { logoMini } from "@/contants/images";

function RegisterPage() {
  const router = useRouter();

  const form = useForm<any>({
    defaultValues: {
      fullName: "",
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
            Bắt đầu hoàn toàn miễn phí
          </p>
          <div className="flex justify-center gap-2 text-sm">
            <p className="text-[#212B36]">Bạn đã có tài khoản?</p>
            <p
              className="text-primary-main cursor-pointer font-semibold hover:underline"
              onClick={() => router.push("/login")}
            >
              Đăng nhập
            </p>
          </div>
        </div>

        <RegisterForm onSubmit={onSubmit} form={form} />
      </div>
    </div>
  );
}

export default RegisterPage;

"use client";

import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";


import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

function ForgotPasswordPage() {

  const form = useForm<any>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = () => {

  };

  return (
    <div className="mx-auto flex h-full items-center justify-center bg-white px-6 py-4">
      <div className="w-full">
        <Image src='/images/auth/logo-app.png' alt="logo app" className="mx-auto my-4 w-44" />
        <div>
          <p className="mb-3 text-center text-xl font-semibold text-[#212B36] md:text-2xl xl:text-3xl">
            Quên mật khẩu
          </p>
          <div className="flex justify-center gap-2 text-sm">
            <p className="text-center text-[#212B36]">
              Vui lòng nhập địa chỉ email được liên kết với tài khoản của bạn và
              chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu.
            </p>
          </div>
        </div>

        <ForgotPasswordForm
          onSubmit={onSubmit}
          form={form}
        />
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

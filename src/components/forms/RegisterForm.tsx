"use client";

import { Loader2, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { UseFormReturn } from "react-hook-form";

interface RegisterFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const RegisterForm = ({
  form,
  onSubmit,
  error,
  isPending,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-[40px] w-full space-y-1"
      >
        {/* Display API Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error.message || "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại."}
          </div>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Họ và tên"
                  className="h-12 w-full rounded-[10px] border border-gray-200 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className="h-12 w-full rounded-[10px] border border-gray-200 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-12 w-full rounded-[10px] border border-gray-200 px-4 py-2 pr-12 focus:border-blue-500 focus:ring-blue-500"
                    disabled={isPending}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                    disabled={isPending}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms and Conditions */}
        <div className="text-secondary mt-4 text-center text-xs">
          Bằng cách đăng ký, tôi đồng ý với
        </div>
        <div className="mt-1 flex w-full items-center justify-center gap-1">
          <div className="cursor-pointer text-xs text-[#212B36] underline hover:text-blue-600">
            Điều khoản dịch vụ
          </div>
          <div className="text-secondary text-center text-xs">và</div>
          <div className="cursor-pointer text-xs text-[#212B36] underline hover:text-blue-600">
            Chính sách bảo mật
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-primary-main mt-4 h-12 w-full cursor-pointer rounded-xl font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang tạo tài khoản...
            </div>
          ) : (
            "Tạo tài khoản"
          )}
        </button>
      </form>
    </Form>
  );
};

export default RegisterForm;

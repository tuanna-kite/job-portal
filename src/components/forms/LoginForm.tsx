"use client";

import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
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

interface LoginFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const LoginForm = ({ form, onSubmit, error, isPending }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-full space-y-1"
      >
        {/* Display API Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error.message || "Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại."}
          </div>
        )}

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  className={`h-12 w-full rounded-[10px] border px-4 py-2 transition-colors ${
                    fieldState.error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  }`}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1 text-xs text-red-500" />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Mật khẩu"
                    className={`h-12 w-full rounded-[10px] border px-4 py-2 pr-12 transition-colors ${
                      fieldState.error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                    disabled={isPending}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={isPending}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="mt-1 text-xs text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex w-full items-end justify-end">
          <div
            className="mt-4 cursor-pointer text-xs underline hover:text-blue-600"
            onClick={() => router.push("/forgot-password")}
          >
            Quên mật khẩu?
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          className="bg-primary-main mt-4 h-12 w-full cursor-pointer rounded-xl font-semibold text-white transition-colors hover:opacity-85 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đăng nhập...
            </div>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>
    </Form>
  );
};

export default LoginForm;

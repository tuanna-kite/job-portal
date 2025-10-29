"use client";

import { ArrowLeft2 } from "iconsax-react";
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

interface UpdatePasswordFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const UpdatePasswordForm = ({
  form,
  onSubmit,
  error,
  isPending,
}: UpdatePasswordFormProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 w-full space-y-4"
      >
        {/* Display API Error */}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error.message ||
              "Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại."}
          </div>
        )}

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
                    placeholder="Mật khẩu mới"
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

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu mới"
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 disabled:opacity-50"
                    disabled={isPending}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
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

        <button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          className="bg-primary-main mt-4 h-12 w-full cursor-pointer rounded-xl font-semibold text-white transition-colors hover:opacity-85 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang đặt lại mật khẩu...
            </div>
          ) : (
            "Đặt lại mật khẩu"
          )}
        </button>
        <div className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2">
          <ArrowLeft2 size="16" color="#292D32" />
          <div
            className="text-xs font-semibold"
            onClick={() => router.push("/login")}
          >
            Quay lại đăng nhập
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;

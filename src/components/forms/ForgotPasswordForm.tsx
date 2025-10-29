"use client";

import { ArrowLeft2 } from "iconsax-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { UseFormReturn } from "react-hook-form";

interface ForgotPasswordFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const ForgotPasswordForm = ({
  form,
  onSubmit,
  error,
  isPending,
}: ForgotPasswordFormProps) => {
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

        <button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          className="bg-primary-main mt-4 h-12 w-full cursor-pointer rounded-xl font-semibold text-white transition-colors hover:opacity-85 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang gửi yêu cầu...
            </div>
          ) : (
            "Gửi yêu cầu"
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

export default ForgotPasswordForm;

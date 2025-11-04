"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreatePartner } from "@/shared/http/hooks/partners";
import { useRegions } from "@/shared/http/hooks/regions";
import { useCreateRep } from "@/shared/http/hooks/reps";
import { qk } from "@/shared/http/query-keys";

const schema = z
  .object({
    fullName: z.string().min(1, "Vui lòng nhập họ tên"),
    phone: z.string().min(6, "Số điện thoại không hợp lệ"),
    email: z.string().email("Email không hợp lệ").optional(),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string(),
    role: z.string().min(1, "Chọn vai trò"),
    organization: z.string().optional(),
    regionId: z.string().min(1, "Chọn khu vực"),
    status: z.string().min(1, "Chọn trạng thái"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function CreateUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      organization: "",
      regionId: "",
      status: "",
    },
  });
  const createRepMutation = useCreateRep();
  const createPartnerMutation = useCreatePartner();
  const { data: regions = [] } = useRegions();

  const onSubmit = async (values: FormValues) => {
    try {
      if (values.role === "rep") {
        await createRepMutation.mutateAsync({
          fullName: values.fullName,
          email: values.email || `${values.phone}@example.com`,
          phone: values.phone,
          organization: values.organization || "",
          regionScopeId: values.regionId,
          notes: undefined,
        });
        toast.success("Tạo đại diện thành công");
        // Invalidate users query để refresh danh sách
        queryClient.invalidateQueries({ queryKey: qk.users(undefined) });
        form.reset();
        router.push("/admin/users");
        return;
      }

      if (values.role === "partner") {
        await createPartnerMutation.mutateAsync({
          email: values.email || `${values.phone}@example.com`,
          phone: values.phone,
          major: "OTHER",
          address: values.organization || "",
          notes: undefined,
        });
        toast.success("Tạo đối tác thành công");
        // Invalidate users query để refresh danh sách
        queryClient.invalidateQueries({ queryKey: qk.users(undefined) });
        form.reset();
        router.push("/admin/users");
        return;
      }

      toast.error("Hiện chưa hỗ trợ tạo Người dùng thường từ màn này");
    } catch (e: any) {
      toast.error(e?.message || "Tạo thất bại");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="rounded-2xl border bg-white p-6 md:p-8">
        <h2 className="mb-6 text-xl font-semibold text-[#1C1C1C] md:text-2xl">
          Thêm người dùng
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Họ tên</label>
                  <FormControl>
                    <Input
                      placeholder="Họ tên đầy đủ"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Điện thoại</label>
                  <FormControl>
                    <Input
                      placeholder="Điện thoại liên hệ"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Email</label>
                  <FormControl>
                    <Input placeholder="Email" className="h-11" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Vai trò</label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="user">Người dùng</SelectItem>
                      <SelectItem value="rep">Đại diện khu vực</SelectItem>
                      <SelectItem value="partner">Đối tác</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Mật khẩu</label>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">
                    Nhập lại mật khẩu
                  </label>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập lại mật khẩu"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <label className="text-sm text-gray-700">Đơn vị</label>
                  <FormControl>
                    <Input
                      placeholder="Nhập tên đơn vị"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="regionId"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">
                    Khu vực phụ trách
                  </label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Chọn khu vực" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-80">
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Trạng thái</label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Chờ duyệt</SelectItem>
                      <SelectItem value="active">Hoạt động</SelectItem>
                      <SelectItem value="archived">Bị cấm</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2 md:col-span-2">
              <Button
                type="submit"
                className="h-11 px-6"
                disabled={
                  createRepMutation.isPending || createPartnerMutation.isPending
                }
              >
                Tạo người dùng
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

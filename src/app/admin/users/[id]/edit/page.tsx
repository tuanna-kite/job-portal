"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
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
import { DisabilityType, DisabilityTypeLabel } from "@/shared/domains/users/disability-type.enum";
import { Gender } from "@/shared/domains/users/gender.enum";
import { UserStatus } from "@/shared/domains/users/user-status.enum";
import { useRegions } from "@/shared/http/hooks/regions";
import { useUpdateUser, useUserDetail } from "@/shared/http/hooks/users";

const schema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên"),
  gender: z.nativeEnum(Gender).optional(),
  birthDate: z.string().optional(),
  disabilityType: z.string().optional(),
  skills: z.array(z.string()).optional(),
  desiredJob: z.string().optional(),
  regionId: z.string().uuid().optional(),
  status: z.nativeEnum(UserStatus).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const userId = params.id as string;

  const { data: user, isLoading: isLoadingUser } = useUserDetail(userId);
  const { data: regions = [] } = useRegions();
  const updateUserMutation = useUpdateUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      gender: undefined,
      birthDate: "",
      disabilityType: "",
      skills: [],
      desiredJob: "",
      regionId: "",
      status: undefined,
    },
  });

  // Load user data into form
  useEffect(() => {
    if (user && !isLoadingUser && !updateUserMutation.isPending) {
      form.reset({
        fullName: user.fullName || "",
        gender: user.gender || undefined,
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split("T")[0]
          : "",
        disabilityType: user.disabilityType || "",
        skills: user.skills || [],
        desiredJob: user.desiredJob || "",
        regionId: user.regionId || "",
        status: (user.status as UserStatus) || undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isLoadingUser, updateUserMutation.isPending]);

  const onSubmit = async (values: FormValues) => {
    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        dto: {
          fullName: values.fullName,
          gender: values.gender,
          birthDate: values.birthDate,
          disabilityType: values.disabilityType,
          skills: values.skills,
          desiredJob: values.desiredJob || undefined,
          regionId: values.regionId || undefined,
          status: values.status,
        },
      });
      toast.success("Cập nhật người dùng thành công");
      // Redirect sau khi update thành công (queries đã được invalidate trong hook)
      router.push("/admin/users");
    } catch (error: any) {
      toast.error(error?.message || "Cập nhật thất bại");
    }
  };

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="mb-4 text-gray-500">Không tìm thấy người dùng</div>
        <Link href="/admin/users">
          <Button variant="outline">Quay lại</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-xl font-semibold text-[#1C1C1C] md:text-2xl">
          Chỉnh sửa người dùng
        </h2>
      </div>

      <div className="rounded-2xl border bg-white p-6 md:p-8">
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Giới tính</label>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Gender.MALE}>Nam</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">Ngày sinh</label>
                  <FormControl>
                    <Input
                      type="date"
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
              name="disabilityType"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">
                    Loại khuyết tật
                  </label>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Chọn loại khuyết tật" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(DisabilityType).map(([key, value]) => (
                        <SelectItem key={value} value={value}>
                          {DisabilityTypeLabel[value]}
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
              name="desiredJob"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm text-gray-700">
                    Công việc mong muốn
                  </label>
                  <FormControl>
                    <Input
                      placeholder="Công việc mong muốn"
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
                  <label className="text-sm text-gray-700">Khu vực</label>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
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
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserStatus.PENDING}>
                        Chờ duyệt
                      </SelectItem>
                      <SelectItem value={UserStatus.ACTIVE}>
                        Hoạt động
                      </SelectItem>
                      <SelectItem value={UserStatus.ARCHIVED}>
                        Bị cấm
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2 md:col-span-2">
              <Link href="/admin/users">
                <Button type="button" variant="outline" className="h-11 px-6">
                  Hủy
                </Button>
              </Link>
              <Button
                type="submit"
                className="h-11 px-6"
                disabled={updateUserMutation.isPending}
              >
                {updateUserMutation.isPending ? "Đang lưu..." : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}


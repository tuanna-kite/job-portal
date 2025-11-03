"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadButton } from "@uploadthing/react";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAdminProfile,
  useChangePassword,
  useUpdateProfile,
} from "@/shared/http/hooks/auth";
import { useAuthStore } from "@/store/auth";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface AdminProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const profileSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().optional(),
  email: z.string().email("Email không hợp lệ"),
});

const securitySchema = z
  .object({
    oldPassword: z.string().min(1, "Vui lòng nhập mật khẩu cũ"),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới không khớp",
    path: ["confirmPassword"],
  });

export function AdminProfileModal({
  open,
  onOpenChange,
}: AdminProfileModalProps) {
  const { user, email, setUser } = useAuthStore();
  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = React.useState(false);

  // Fetch admin profile
  const { data: profile, isLoading } = useAdminProfile();
  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  // Form cho tab Tổng quan
  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
    },
  });

  // Form cho tab Bảo mật
  const securityForm = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update form when profile data is loaded
  React.useEffect(() => {
    if (profile) {
      profileForm.reset({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        email: profile.email || "",
      });
      setAvatarUrl(profile.avatar || null);
    }
  }, [profile, profileForm]);

  const handleAvatarUploadComplete = (url: string) => {
    setAvatarUrl(url);
    setIsUploadingAvatar(false);
    toast.success("Upload ảnh thành công");
  };

  const handleAvatarUploadError = (error: Error) => {
    setIsUploadingAvatar(false);
    toast.error(`Upload thất bại: ${error.message}`);
  };

  const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      const result = await updateProfileMutation.mutateAsync({
        fullName: values.fullName,
        phone: values.phone,
        avatar: avatarUrl || undefined,
      });

      // Update Zustand store
      setUser({
        ...user,
        email: result.data.email,
      });

      toast.success("Cập nhật thông tin thành công");
    } catch (error: any) {
      toast.error(error?.message || "Cập nhật thất bại");
    }
  };

  const onSecuritySubmit = async (values: z.infer<typeof securitySchema>) => {
    try {
      await changePasswordMutation.mutateAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      toast.success("Đổi mật khẩu thành công");
      securityForm.reset();
    } catch (error: any) {
      toast.error(error?.message || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Tài khoản</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Bảng điều khiển</span>
            <span>•</span>
            <span>Người dùng</span>
            <span>•</span>
            <span className="text-gray-400">Tài khoản</span>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="h-auto w-full justify-start gap-0 rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-black data-[state=active]:bg-transparent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Tổng quan
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-black data-[state=active]:bg-transparent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Bảo mật
            </TabsTrigger>
          </TabsList>

          {/* Tab Tổng quan */}
          <TabsContent value="overview" className="mt-6">
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                className="space-y-6"
              >
                {/* Avatar Upload */}
                <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-8">
                  <div className="relative">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100 bg-gradient-to-br from-blue-400 to-purple-500">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
                          {(profile?.email?.[0] ||
                            user?.email?.[0] ||
                            "A"
                          ).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <UploadButton<OurFileRouter, "avatar">
                        endpoint="avatar"
                        onClientUploadComplete={(res) => {
                          if (res && res[0]) {
                            handleAvatarUploadComplete(res[0].url);
                          }
                        }}
                        onUploadError={handleAvatarUploadError}
                        onUploadBegin={() => {
                          setIsUploadingAvatar(true);
                          toast.info("Đang upload ảnh...");
                        }}
                        content={{
                          button: isUploadingAvatar ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Camera className="h-5 w-5" />
                          ),
                        }}
                        appearance={{
                          button:
                            "h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ut-uploading:bg-blue-400 ut-uploading:cursor-not-allowed",
                          allowedContent: "hidden",
                        }}
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Cho phép *.jpeg, *.jpg, *.png, *.gif
                  </p>
                  <p className="text-sm text-gray-500">
                    Kích thước tối đa 3 Mb
                  </p>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={profileForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập họ tên" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập số điện thoại" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập email"
                          type="email"
                          disabled
                          className="bg-gray-50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="bg-[#1C1C1C] px-8 hover:bg-[#2C2C2C]"
                  >
                    {updateProfileMutation.isPending
                      ? "Đang lưu..."
                      : "Lưu thay đổi"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          {/* Tab Bảo mật */}
          <TabsContent value="security" className="mt-6">
            <Form {...securityForm}>
              <form
                onSubmit={securityForm.handleSubmit(onSecuritySubmit)}
                className="space-y-6"
              >
                <FormField
                  control={securityForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu cũ</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="password"
                            placeholder="Nhập mật khẩu cũ"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={securityForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="password"
                              placeholder="Nhập mật khẩu"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={securityForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nhập lại mật khẩu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="password"
                              placeholder="Nhập lại mật khẩu"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="bg-[#1C1C1C] px-8 hover:bg-[#2C2C2C]"
                  >
                    {changePasswordMutation.isPending
                      ? "Đang lưu..."
                      : "Lưu thay đổi"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Send } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/text-area";
import { UploadThingComponent } from "@/components/ui/upload-thing";
import {
  NeedReportCategory,
  NeedSupportCategoryOptions,
} from "@/shared/domains/reports/need-report-category.enum";
import {
  DisabilityType,
  DisabilityTypeLabel,
} from "@/shared/domains/users/disability-type.enum";
import { Gender } from "@/shared/domains/users/gender.enum";
import { useCreateReportByUser } from "@/shared/http/hooks/reports";
import { useUserByCccd } from "@/shared/http/hooks/users";

const cccdSchema = z.object({
  cccd: z
    .string()
    .min(1, "Vui lòng nhập số CCCD")
    .regex(/^\d{9}$|^\d{12}$/, "CCCD/CMND phải gồm 9 hoặc 12 chữ số"),
});

const userInfoSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .min(9, "Số điện thoại phải có ít nhất 9 ký tự")
    .max(15, "Số điện thoại không được quá 15 ký tự"),
  gender: z.nativeEnum(Gender, {
    message: "Vui lòng chọn giới tính",
  }),
  birthDate: z.string().min(1, "Vui lòng chọn ngày sinh"),
  disabilityType: z.nativeEnum(DisabilityType, {
    message: "Vui lòng chọn loại khuyết tật",
  }),
  skills: z.string().optional(),
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  desiredJob: z.string().optional(),
});

const needReportSchema = z.object({
  category: z.nativeEnum(NeedReportCategory, {
    message: "Vui lòng chọn loại nhu cầu hỗ trợ",
  }),
  description: z.string().min(1, "Vui lòng mô tả nhu cầu của bạn"),
  attachments: z.array(z.string()),
  jobType: z.string().optional(),
  desiredSalary: z.string().optional(),
  medicalDescription: z.string().optional(),
  equipmentDescription: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Vui lòng đồng ý với điều khoản",
  }),
});

type CccdFormValues = z.infer<typeof cccdSchema>;
type UserInfoFormValues = z.infer<typeof userInfoSchema>;
type NeedReportFormValues = z.infer<typeof needReportSchema>;

export default function SessionContentConnect() {
  const [step, setStep] = useState(1);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const cccdForm = useForm<CccdFormValues>({
    resolver: zodResolver(cccdSchema),
    defaultValues: {
      cccd: "",
    },
  });

  const userInfoForm = useForm<UserInfoFormValues>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      gender: Gender.MALE,
      birthDate: "",
      disabilityType: DisabilityType.OTHER,
      skills: "",
      address: "",
      desiredJob: "",
    },
  });

  const needReportForm = useForm<NeedReportFormValues>({
    resolver: zodResolver(needReportSchema),
    defaultValues: {
      category: NeedReportCategory.JOB_SEEKING,
      description: "",
      attachments: [],
      jobType: "",
      desiredSalary: "",
      medicalDescription: "",
      equipmentDescription: "",
      consent: false,
    },
  });

  const { data: existingUser, isLoading: isLoadingUser } = useUserByCccd(
    step === 2 ? cccdForm.getValues("cccd") : null,
  );

  const createReportMutation = useCreateReportByUser();

  const onCccdSubmit = (data: CccdFormValues) => {
    if (existingUser) {
      setIsExistingUser(true);
      setUserData(existingUser);
    } else {
      setIsExistingUser(false);
    }
    setStep(2);
  };

  const handleFileUploadComplete = (url: string, key: string) => {
    const currentAttachments = needReportForm.getValues("attachments") || [];
    needReportForm.setValue("attachments", [...currentAttachments, url]);
  };

  const handleFileUploadError = (error: Error) => {
    console.error("File upload error:", error);
    toast.error("Có lỗi khi tải file lên");
  };

  const handleFileUploadBegin = (name: string) => {};

  const onNeedReportSubmit = (data: NeedReportFormValues) => {
    const cccd = cccdForm.getValues("cccd");
    const userInfo = isExistingUser ? null : userInfoForm.getValues();

    let description = data.description;
    if (data.category === NeedReportCategory.JOB_SEEKING) {
      const desiredJob = userInfo?.desiredJob || "Không xác định";
      description = `Công việc mong muốn: ${desiredJob}\nLoại hình: ${data.jobType || "Không xác định"}\nMức lương: ${data.desiredSalary || "Không xác định"}\n\nMô tả: ${data.description}`;
    } else if (data.category === NeedReportCategory.HEALTHCARE_SUPPORT) {
      description = `Mô tả y tế: ${data.medicalDescription || "Không có"}\n\nMô tả: ${data.description}`;
    } else if (data.category === NeedReportCategory.ASSISTIVE_DEVICES) {
      description = `Mô tả thiết bị: ${data.equipmentDescription || "Không có"}\n\nMô tả: ${data.description}`;
    }

    createReportMutation.mutate(
      {
        cccd,
        userInfo: isExistingUser
          ? undefined
          : userInfo
            ? {
                fullName: userInfo.fullName,
                phone: userInfo.phone,
                gender: userInfo.gender,
                birthDate: new Date(userInfo.birthDate),
                disabilityType: userInfo.disabilityType,
                skills: userInfo.skills
                  ? userInfo.skills.split(",").map((s) => s.trim())
                  : [],
                address: userInfo.address,
                desiredJob: userInfo.desiredJob,
                regionId: "", // TODO: Get from region selection
              }
            : undefined,
        category: data.category,
        description,
        attachments: data.attachments,
      } as any,
      {
        onSuccess: () => {
          toast.success("Yêu cầu hỗ trợ đã được gửi thành công!");
          cccdForm.reset();
          userInfoForm.reset();
          needReportForm.reset();
          setStep(1);
          setIsExistingUser(false);
          setUserData(null);
        },
        onError: (error: { message?: string; code?: string }) => {
          toast.error(error?.message || "Có lỗi xảy ra khi gửi yêu cầu");
        },
      },
    );
  };

  return (
    <div className="h-max bg-white py-[30px] md:py-[70px]">
      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-3xl px-6 md:px-10">
        <h1 className="text-3xl font-bold text-[#1C1C1C] md:text-4xl">
          Khởi tạo hồ sơ
        </h1>
        <p className="mt-3 mb-10 text-base text-[#637381] md:text-lg">
          Cung cấp thông tin chi tiết về kỹ năng và nhu cầu để chúng tôi kết nối
          bạn với Đại diện khu vực.
        </p>

        {step === 1 && (
          <Form {...cccdForm}>
            <form
              onSubmit={cccdForm.handleSubmit(onCccdSubmit)}
              className="space-y-8"
            >
              <div>
                <h2 className="mb-4 text-lg font-semibold text-[#1C1C1C]">
                  Thông tin định danh
                </h2>
                <FormField
                  control={cccdForm.control}
                  name="cccd"
                  render={({ field }) => (
                    <FormItem>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Số CCCD
                      </label>
                      <FormControl>
                        <Input
                          placeholder="Nhập số CCCD"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isLoadingUser}
                  className="rounded-full bg-[#6941C6] px-6 py-5 text-white hover:bg-[#5A37AD] disabled:opacity-50"
                >
                  {isLoadingUser ? "Đang kiểm tra..." : "Tiếp theo"}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {step === 2 && (
          <div className="space-y-8">
            {!isExistingUser && (
              <Form {...userInfoForm}>
                <form className="space-y-8">
                  <div>
                    <h2 className="mb-4 text-lg font-semibold text-[#1C1C1C]">
                      Thông tin định danh
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={userInfoForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input placeholder="Họ tên đầy đủ" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={userInfoForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Điện thoại liên hệ"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <FormField
                        control={userInfoForm.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={Gender.MALE}>Nam</SelectItem>
                                <SelectItem value={Gender.FEMALE}>
                                  Nữ
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={userInfoForm.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  type="date"
                                  className="rounded-lg border border-gray-300 pr-10"
                                  {...field}
                                />
                              </FormControl>
                              <CalendarDays className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={userInfoForm.control}
                        name="disabilityType"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Chọn loại khuyết tật chính" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(DisabilityType).map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {DisabilityTypeLabel[type]}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={userInfoForm.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Các kỹ năng hiện có (cách nhau bởi dấu phẩy)"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mt-4">
                      <FormField
                        control={userInfoForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder="Nhập địa chỉ cụ thể"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            )}

            <Form {...needReportForm}>
              <form
                onSubmit={needReportForm.handleSubmit(onNeedReportSubmit)}
                className="space-y-8"
              >
                <div>
                  <h2 className="mb-4 text-lg font-semibold text-[#1C1C1C]">
                    Nhu cầu hỗ trợ
                  </h2>
                  <FormField
                    control={needReportForm.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Phản ánh nhu cầu" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {NeedSupportCategoryOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {needReportForm.watch("category") ===
                    NeedReportCategory.JOB_SEEKING && (
                    <div className="mt-4 space-y-4">
                      <FormField
                        control={userInfoForm.control}
                        name="desiredJob"
                        render={({ field }) => (
                          <FormItem>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Công việc mong muốn
                            </label>
                            <FormControl>
                              <Input
                                placeholder="Nhập công việc mong muốn"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={needReportForm.control}
                          name="jobType"
                          render={({ field }) => (
                            <FormItem>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Loại hình công việc
                              </label>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Chọn loại hình công việc" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="fulltime">
                                    Toàn thời gian
                                  </SelectItem>
                                  <SelectItem value="parttime">
                                    Bán thời gian
                                  </SelectItem>
                                  <SelectItem value="remote">
                                    Làm việc từ xa
                                  </SelectItem>
                                  <SelectItem value="freelance">
                                    Tự do
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={needReportForm.control}
                          name="desiredSalary"
                          render={({ field }) => (
                            <FormItem>
                              <label className="mb-2 block text-sm font-medium text-gray-700">
                                Mức lương mong muốn
                              </label>
                              <FormControl>
                                <Input
                                  placeholder="Khoảng thu nhập"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Tài liệu đính kèm
                        </label>
                        <UploadThingComponent
                          value={needReportForm.watch("attachments")?.[0] || ""}
                          placeholder="Tài liệu đính kèm"
                          onUploadComplete={handleFileUploadComplete}
                          onUploadError={handleFileUploadError}
                          onUploadBegin={handleFileUploadBegin}
                        />
                        <p className="mt-1 flex items-center gap-1 text-xs text-blue-600">
                          <span>📄</span>
                          Hình ảnh, PDF, XLSX, DOC, ZIP, RAR
                        </p>
                      </div>
                    </div>
                  )}

                  {needReportForm.watch("category") ===
                    NeedReportCategory.HEALTHCARE_SUPPORT && (
                    <div className="mt-4">
                      <FormField
                        control={needReportForm.control}
                        name="medicalDescription"
                        render={({ field }) => (
                          <FormItem>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Mô tả
                            </label>
                            <FormControl>
                              <Textarea
                                placeholder="Khám chữa bệnh/Thuốc men..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {needReportForm.watch("category") ===
                    NeedReportCategory.ASSISTIVE_DEVICES && (
                    <div className="mt-4">
                      <FormField
                        control={needReportForm.control}
                        name="equipmentDescription"
                        render={({ field }) => (
                          <FormItem>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Mô tả
                            </label>
                            <FormControl>
                              <Textarea
                                placeholder="Xe lăn, máy trợ thính..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    <FormField
                      control={needReportForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Mô tả chi tiết nhu cầu
                          </label>
                          <FormControl>
                            <Textarea
                              placeholder="Mô tả chi tiết nhu cầu của bạn..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={needReportForm.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            id="consent"
                          />
                        </FormControl>
                        <label
                          htmlFor="consent"
                          className="text-sm leading-relaxed text-[#637381]"
                        >
                          Tôi đồng ý để Việc Lành sử dụng thông tin trên để khởi
                          tạo hồ sơ và gắn Đại diện khu vực hỗ trợ tìm việc.
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={createReportMutation.isPending}
                    className="rounded-full bg-[#6941C6] px-6 py-5 text-white hover:bg-[#5A37AD] disabled:opacity-50"
                  >
                    {createReportMutation.isPending
                      ? "Đang gửi..."
                      : "Gửi yêu cầu"}{" "}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}

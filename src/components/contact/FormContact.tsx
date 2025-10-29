"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send2 } from "iconsax-react";
import React from "react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/text-area";
import {
  PartnerMajor,
  PartnerMajorOptions,
} from "@/shared/domains/partners/partner-major.enum";
import { useCreatePartner } from "@/shared/http/hooks/partners";
import { useRegions } from "@/shared/http/hooks/regions";
import { useCreateRep } from "@/shared/http/hooks/reps";
import { CreatePartnerSchema } from "@/shared/validation/partners/create-partner.schema";

const contactSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  message: z.string(),
});

const representativeSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z
    .string()
    .min(6, "Số điện thoại phải có ít nhất 6 ký tự")
    .max(20, "Số điện thoại không được quá 20 ký tự"),
  organization: z.string().min(1, "Vui lòng nhập tên đơn vị"),
  regionScopeId: z.string().min(1, "Vui lòng chọn khu vực"),
  notes: z.string().optional(),
  agreePrivacy: z.boolean().refine((val) => val === true, {
    message: "Vui lòng đồng ý với chính sách bảo mật",
  }),
});

const partnerSchema = z
  .object({
    companyName: z.string().min(1, "Vui lòng nhập tên doanh nghiệp"),
    email: z.string().email("Email không hợp lệ").trim(),
    major: z.nativeEnum(PartnerMajor, {
      message: "Vui lòng chọn lĩnh vực hoạt động",
    }),
    address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
    notes: z.string().optional(),
    agreeLaborLaw: z.boolean().refine((val) => val === true, {
      message: "Vui lòng đồng ý với điều khoản",
    }),
    agreeContact: z.boolean().refine((val) => val === true, {
      message: "Vui lòng đồng ý với điều khoản",
    }),
  })
  .refine(
    (data) =>
      CreatePartnerSchema.safeParse({
        email: data.email,
        phone: data.companyName,
        major: data.major,
        address: data.address,
        notes: data.notes,
      }).success,
    {
      message: "Dữ liệu không hợp lệ",
    },
  );

type ContactFormValues = z.infer<typeof contactSchema>;
type RepresentativeFormValues = z.infer<typeof representativeSchema>;
type PartnerFormValues = z.infer<typeof partnerSchema>;

export default function FormContact() {
  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const representativeForm = useForm<RepresentativeFormValues>({
    resolver: zodResolver(representativeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      regionScopeId: "",
      notes: "",
      agreePrivacy: false,
    },
  });

  const partnerForm = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      companyName: "",
      email: "",
      major: PartnerMajor.OTHER,
      address: "",
      notes: "",
      agreeLaborLaw: false,
      agreeContact: false,
    },
  });

  const createRepMutation = useCreateRep();
  const createPartnerMutation = useCreatePartner();
  const { data: regions = [] } = useRegions();

  const onContactSubmit = (data: ContactFormValues) => {
    toast.success("Tin nhắn đã được gửi thành công!");
    contactForm.reset();
  };

  const onRepresentativeSubmit = (data: RepresentativeFormValues) => {
    createRepMutation.mutate(
      {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        regionScopeId: data.regionScopeId,
        notes: data.notes,
      },
      {
        onSuccess: () => {
          toast.success("Đăng ký đại diện thành công!");
          representativeForm.reset();
        },
        onError: (error: { message?: string; code?: string }) => {
          console.error("Rep creation error:", error);
          toast.error(error?.message || "Có lỗi xảy ra khi đăng ký đại diện");
        },
      },
    );
  };

  const onPartnerSubmit = (data: PartnerFormValues) => {
    createPartnerMutation.mutate(
      {
        email: data.email,
        phone: data.companyName,
        major: data.major,
        address: data.address,
        notes: data.notes,
      },
      {
        onSuccess: () => {
          toast.success("Đăng ký đối tác thành công!");
          partnerForm.reset();
        },
        onError: (error: { message?: string; code?: string }) => {
          console.error("Partner creation error:", error);
          toast.error(error?.message || "Có lỗi xảy ra khi đăng ký đối tác");
        },
      },
    );
  };

  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-gray-800 sm:text-4xl lg:mb-6 lg:text-5xl">
                Kết nối với chúng tôi
              </h2>
              <p className="text-base leading-relaxed text-gray-600 md:text-lg">
                Việc Lành sẵn sàng lắng nghe và hợp tác. Liên hệ với chúng tôi
                nếu như bạn có bất kỳ câu hỏi nào.
              </p>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <h3 className="text-base font-medium text-gray-800 lg:text-lg">
                Giá trị cốt lõi dẫn lối mọi hành động
              </h3>
              <div className="flex flex-col flex-wrap gap-2 sm:flex-row sm:gap-4 lg:gap-6">
                <span className="text-base font-bold text-gray-800 lg:text-lg">
                  HÒA NHẬP
                </span>
                <span className="text-base font-bold text-gray-800 lg:text-lg">
                  TÔN TRỌNG
                </span>
                <span className="text-base font-bold text-gray-800 lg:text-lg">
                  BÌNH ĐẲNG
                </span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Tabs defaultValue="contact" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-1 gap-1 bg-white sm:grid-cols-3 sm:gap-0 lg:mb-8">
                <TabsTrigger
                  value="contact"
                  className="px-2 py-2 text-xs sm:px-3 sm:py-3 sm:text-sm md:text-base"
                >
                  Liên hệ
                </TabsTrigger>
                <TabsTrigger
                  value="representative"
                  className="px-2 py-2 text-xs sm:px-3 sm:py-3 sm:text-sm md:text-base"
                >
                  Đăng ký đại diện
                </TabsTrigger>
                <TabsTrigger
                  value="partner"
                  className="px-2 py-2 text-xs sm:px-3 sm:py-3 sm:text-sm md:text-base"
                >
                  Đăng ký đối tác
                </TabsTrigger>
              </TabsList>

              <TabsContent value="contact">
                <Form {...contactForm}>
                  <form
                    onSubmit={contactForm.handleSubmit(onContactSubmit)}
                    className="space-y-4 lg:space-y-6"
                  >
                    <FormField
                      control={contactForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Họ tên của bạn?
                          </label>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập họ tên của bạn"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Email của bạn là gì?
                          </label>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tvlam@example.com"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Tin nhắn
                          </label>
                          <FormControl>
                            <Textarea
                              placeholder="Tin nhắn..."
                              rows={4}
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gray-800 py-3 text-white hover:bg-gray-900 md:py-4"
                    >
                      Gửi tin nhắn
                      <Send2 size="24" color="#FFFFFF" variant="Bold" />
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="representative">
                <Form {...representativeForm}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      representativeForm.handleSubmit(onRepresentativeSubmit)(
                        e,
                      );
                    }}
                    className="space-y-4 lg:space-y-6"
                  >
                    <FormField
                      control={representativeForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Họ tên của bạn?
                          </label>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập họ tên của bạn"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={representativeForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Email của bạn là gì?
                          </label>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tvlam@example.com"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={representativeForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Số điện thoại liên hệ
                          </label>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Nhập số điện thoại"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={representativeForm.control}
                      name="organization"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Đơn vị/ Hội người khuyết tật địa phương
                          </label>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập tên đơn vị"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={representativeForm.control}
                      name="regionScopeId"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Khu vực bạn đang làm việc
                          </label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 w-full">
                                <SelectValue placeholder="Chọn khu vực" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="h-[400px]">
                              {regions.map((region) => (
                                <SelectItem key={region.id} value={region.id}>
                                  {region.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={representativeForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Tin nhắn
                          </label>
                          <FormControl>
                            <Textarea
                              placeholder="Tin nhắn..."
                              rows={4}
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={representativeForm.control}
                      name="agreePrivacy"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="mt-1 sm:mt-0"
                              />
                            </FormControl>
                            <label
                              htmlFor="privacy-agreement"
                              className="text-xs leading-relaxed text-gray-600 sm:text-sm"
                            >
                              Tôi cam kết tuân thủ Chính sách Bảo mật, không
                              tiết lộ hoặc lạm dụng thông tin cá nhân của Người
                              khuyết tật.
                            </label>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={() => {
                        representativeForm.handleSubmit(
                          onRepresentativeSubmit,
                        )();
                      }}
                      disabled={createRepMutation.isPending}
                      className="w-full bg-gray-800 py-3 text-white hover:bg-gray-900 disabled:opacity-50 md:py-4"
                    >
                      {createRepMutation.isPending
                        ? "Đang gửi..."
                        : "Gửi tin nhắn"}
                      <Send2 size="24" color="#FFFFFF" variant="Bold" />
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="partner">
                <Form {...partnerForm}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      partnerForm.handleSubmit(onPartnerSubmit)(e);
                    }}
                    className="space-y-4 lg:space-y-6"
                  >
                    <FormField
                      control={partnerForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Tên doanh nghiệp/ Tổ chức
                          </label>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập tên doanh nghiệp/ Tổ chức"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={partnerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Email liên hệ
                          </label>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="tvlam@example.com"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={partnerForm.control}
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Lĩnh vực hoạt động
                          </label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn lĩnh vực" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PartnerMajorOptions.map((option) => (
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

                    <FormField
                      control={partnerForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Địa chỉ
                          </label>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nhập địa chỉ cụ thể"
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={partnerForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <label className="block text-sm font-medium text-gray-700">
                            Tin nhắn
                          </label>
                          <FormControl>
                            <Textarea
                              placeholder="Tin nhắn..."
                              rows={4}
                              className="w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormField
                        control={partnerForm.control}
                        name="agreeLaborLaw"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-1 sm:mt-0"
                                />
                              </FormControl>
                              <label
                                htmlFor="labor-law-agreement"
                                className="text-xs leading-relaxed text-gray-600 sm:text-sm"
                              >
                                Tôi cam kết Doanh nghiệp/Tổ chức tuân thủ các
                                quy định hiện hành về Luật Lao động và không có
                                hành vi phân biệt đối xử trong tuyển dụng.
                              </label>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={partnerForm.control}
                        name="agreeContact"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="mt-1 sm:mt-0"
                                />
                              </FormControl>
                              <label
                                htmlFor="contact-agreement"
                                className="text-xs leading-relaxed text-gray-600 sm:text-sm"
                              >
                                Tôi đồng ý để Ban điều phối Việc Lành liên hệ
                                xác minh thông tin và thảo luận chi tiết về các
                                vị trí tuyển dụng.
                              </label>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={() => {
                        partnerForm.handleSubmit(onPartnerSubmit)();
                      }}
                      disabled={createPartnerMutation.isPending}
                      className="w-full bg-gray-800 py-3 text-white hover:bg-gray-900 disabled:opacity-50 md:py-4"
                    >
                      {createPartnerMutation.isPending
                        ? "Đang gửi..."
                        : "Gửi tin nhắn"}
                      <Send2 size="24" color="#FFFFFF" variant="Bold" />
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

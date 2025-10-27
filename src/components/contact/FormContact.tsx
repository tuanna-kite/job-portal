"use client";

import { Send2 } from "iconsax-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/text-area";

// Types for form data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface RepresentativeFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  workingArea: string;
  message: string;
  agreePrivacy: boolean;
}

interface PartnerFormData {
  companyName: string;
  email: string;
  field: string;
  address: string;
  message: string;
  agreeLaborLaw: boolean;
  agreeContact: boolean;
}

export default function FormContact() {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: "",
    email: "tvlam@example.com",
    message: "",
  });

  const [representativeForm, setRepresentativeForm] =
    useState<RepresentativeFormData>({
      name: "",
      email: "tvlam@example.com",
      phone: "",
      organization: "",
      workingArea: "",
      message: "",
      agreePrivacy: false,
    });

  const [partnerForm, setPartnerForm] = useState<PartnerFormData>({
    companyName: "",
    email: "tvlam@example.com",
    field: "",
    address: "",
    message: "",
    agreeLaborLaw: false,
    agreeContact: false,
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handleRepresentativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Section - Content */}
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

          {/* Right Section - Form */}
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

              {/* Contact Tab */}
              <TabsContent value="contact">
                <form
                  onSubmit={handleContactSubmit}
                  className="space-y-4 lg:space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Họ tên của bạn?
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập họ tên của bạn"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email của bạn là gì?
                    </label>
                    <Input
                      type="email"
                      placeholder="tvlam@example.com"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tin nhắn
                    </label>
                    <Textarea
                      placeholder="Tin nhắn..."
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gray-800 py-3 text-white hover:bg-gray-900 md:py-4"
                  >
                    Gửi tin nhắn
                    <Send2 size="24" color="#FFFFFF" variant="Bold" />
                  </Button>
                </form>
              </TabsContent>

              {/* Representative Tab */}
              <TabsContent value="representative">
                <form
                  onSubmit={handleRepresentativeSubmit}
                  className="space-y-4 lg:space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Họ tên của bạn?
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập họ tên của bạn"
                      value={representativeForm.name}
                      onChange={(e) =>
                        setRepresentativeForm({
                          ...representativeForm,
                          name: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email của bạn là gì?
                    </label>
                    <Input
                      type="email"
                      placeholder="tvlam@example.com"
                      value={representativeForm.email}
                      onChange={(e) =>
                        setRepresentativeForm({
                          ...representativeForm,
                          email: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại liên hệ
                    </label>
                    <Input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={representativeForm.phone}
                      onChange={(e) =>
                        setRepresentativeForm({
                          ...representativeForm,
                          phone: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Đơn vị/ Hội người khuyết tật địa phương
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập tên đơn vị"
                      value={representativeForm.organization}
                      onChange={(e) =>
                        setRepresentativeForm({
                          ...representativeForm,
                          organization: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Khu vực bạn đang làm việc
                    </label>
                    <Input
                      type="text"
                      placeholder="Tỉnh/ Thành phố"
                      value={representativeForm.workingArea}
                      onChange={(e) =>
                        setRepresentativeForm({
                          ...representativeForm,
                          workingArea: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tin nhắn
                    </label>
                    <Textarea
                      placeholder="Tin nhắn..."
                      value={representativeForm.message}
                      onChange={(e) =>
                        setRepresentativeForm({
                          ...representativeForm,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-3">
                    <Checkbox
                      id="privacy-agreement"
                      checked={representativeForm.agreePrivacy}
                      onCheckedChange={(checked) =>
                        setRepresentativeForm({
                          ...representativeForm,
                          agreePrivacy: !!checked,
                        })
                      }
                      className="mt-1 sm:mt-0"
                    />
                    <label
                      htmlFor="privacy-agreement"
                      className="text-xs leading-relaxed text-gray-600 sm:text-sm"
                    >
                      Tôi cam kết tuân thủ Chính sách Bảo mật, không tiết lộ
                      hoặc lạm dụng thông tin cá nhân của Người khuyết tật.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gray-800 py-3 text-white hover:bg-gray-900 md:py-4"
                  >
                    Gửi tin nhắn
                    <Send2 size="24" color="#FFFFFF" variant="Bold" />
                  </Button>
                </form>
              </TabsContent>

              {/* Partner Tab */}
              <TabsContent value="partner">
                <form
                  onSubmit={handlePartnerSubmit}
                  className="space-y-4 lg:space-y-6"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tên doanh nghiệp/ Tổ chức
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập tên doanh nghiệp/ Tổ chức"
                      value={partnerForm.companyName}
                      onChange={(e) =>
                        setPartnerForm({
                          ...partnerForm,
                          companyName: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email liên hệ
                    </label>
                    <Input
                      type="email"
                      placeholder="tvlam@example.com"
                      value={partnerForm.email}
                      onChange={(e) =>
                        setPartnerForm({
                          ...partnerForm,
                          email: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Lĩnh vực hoạt động
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập lĩnh vực"
                      value={partnerForm.field}
                      onChange={(e) =>
                        setPartnerForm({
                          ...partnerForm,
                          field: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Địa chỉ
                    </label>
                    <Input
                      type="text"
                      placeholder="Nhập địa chỉ cụ thể"
                      value={partnerForm.address}
                      onChange={(e) =>
                        setPartnerForm({
                          ...partnerForm,
                          address: e.target.value,
                        })
                      }
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tin nhắn
                    </label>
                    <Textarea
                      placeholder="Tin nhắn..."
                      value={partnerForm.message}
                      onChange={(e) =>
                        setPartnerForm({
                          ...partnerForm,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-3">
                      <Checkbox
                        id="labor-law-agreement"
                        checked={partnerForm.agreeLaborLaw}
                        onCheckedChange={(checked) =>
                          setPartnerForm({
                            ...partnerForm,
                            agreeLaborLaw: !!checked,
                          })
                        }
                        className="mt-1 sm:mt-0"
                      />
                      <label
                        htmlFor="labor-law-agreement"
                        className="text-xs leading-relaxed text-gray-600 sm:text-sm"
                      >
                        Tôi cam kết Doanh nghiệp/Tổ chức tuân thủ các quy định
                        hiện hành về Luật Lao động và không có hành vi phân biệt
                        đối xử trong tuyển dụng.
                      </label>
                    </div>

                    <div className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-3">
                      <Checkbox
                        id="contact-agreement"
                        checked={partnerForm.agreeContact}
                        onCheckedChange={(checked) =>
                          setPartnerForm({
                            ...partnerForm,
                            agreeContact: !!checked,
                          })
                        }
                        className="mt-1 sm:mt-0"
                      />
                      <label
                        htmlFor="contact-agreement"
                        className="text-xs leading-relaxed text-gray-600 sm:text-sm"
                      >
                        Tôi đồng ý để Ban điều phối Việc Lành liên hệ xác minh
                        thông tin và thảo luận chi tiết về các vị trí tuyển
                        dụng.
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gray-800 py-3 text-white hover:bg-gray-900 md:py-4"
                  >
                    Gửi tin nhắn
                    <Send2 size="24" color="#FFFFFF" variant="Bold" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

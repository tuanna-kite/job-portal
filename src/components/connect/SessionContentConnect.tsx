"use client";

import { CalendarDays, Send } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export default function SessionContentConnect() {
  const [step, setStep] = useState(1); // 1: Nhập CCCD, 2: Form thông tin
  const [cccdNumber, setCccdNumber] = useState("");
  const [isExistingUser, setIsExistingUser] = useState(false); // Fake: false = chưa có, true = đã có
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    dob: "",
    disability: "",
    skills: "",
    ward: "",
    address: "",
    need: "",
    // Job support fields
    desiredJob: "",
    jobType: "",
    desiredSalary: "",
    attachedDocuments: "",
    attachedDocumentsUrl: "",
    attachedDocumentsKey: "",
    // Medical support fields
    medicalDescription: "",
    // Equipment support fields
    equipmentDescription: "",
    consent: false,
  });

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCccdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cccdNumber.trim()) {
      // Fake logic: Check if user exists
      // For demo: if CCCD contains "123" then user exists, otherwise new user
      const userExists = cccdNumber.includes("123");
      setIsExistingUser(userExists);
      setStep(2);
    }
  };

  const handleFileUploadComplete = (url: string, key: string) => {
    setForm((prev) => ({
      ...prev,
      attachedDocuments: url.split("/").pop() || "", // Extract filename from URL
      attachedDocumentsUrl: url,
      attachedDocumentsKey: key,
    }));
  };

  const handleFileUploadError = (error: Error) => {
    console.error("File upload error:", error);
    // You can add toast notification here
  };

  const handleFileUploadBegin = (name: string) => {
    setForm((prev) => ({
      ...prev,
      attachedDocuments: `Đang tải ${name}...`,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

        {/* Step 1: Nhập CCCD */}
        {step === 1 && (
          <form onSubmit={handleCccdSubmit} className="space-y-8">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-[#1C1C1C]">
                Thông tin định danh
              </h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Số CCCD
                </label>
                <Input
                  placeholder="Nhập số CCCD"
                  value={cccdNumber}
                  onChange={(e) => setCccdNumber(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-full bg-[#6941C6] px-6 py-5 text-white hover:bg-[#5A37AD]"
              >
                Tiếp theo
              </Button>
            </div>
          </form>
        )}

        {/* Step 2: Form thông tin */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Thông tin định danh - chỉ hiện khi chưa có user */}
            {!isExistingUser && (
              <div>
                <h2 className="mb-4 text-lg font-semibold text-[#1C1C1C]">
                  Thông tin định danh
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Input
                    placeholder="Họ tên đầy đủ"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                  <Input
                    placeholder="Điện thoại liên hệ"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Select
                    onValueChange={(val: string) => handleChange("gender", val)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative">
                    <Input
                      type="date"
                      className="rounded-lg border border-gray-300 pr-10"
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                    <CalendarDays className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="mt-4">
                  <Select
                    onValueChange={(val: string) =>
                      handleChange("disability", val)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Chọn loại khuyết tật chính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hearing">Nghe / Nói</SelectItem>
                      <SelectItem value="vision">Thị giác</SelectItem>
                      <SelectItem value="mobility">Vận động</SelectItem>
                      <SelectItem value="mental">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4">
                  <Input
                    placeholder="Các kỹ năng hiện có"
                    value={form.skills}
                    onChange={(e) => handleChange("skills", e.target.value)}
                  />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <Select
                    onValueChange={(val: string) => handleChange("ward", val)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Chọn phường" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phuong1">Phường 1</SelectItem>
                      <SelectItem value="phuong2">Phường 2</SelectItem>
                      <SelectItem value="phuong3">Phường 3</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Nhập địa chỉ cụ thể"
                    value={form.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Nhu cầu hỗ trợ */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-[#1C1C1C]">
                Nhu cầu hỗ trợ
              </h2>
              <Select
                onValueChange={(val: string) => handleChange("need", val)}
              >
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Phản ánh nhu cầu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">Hỗ trợ việc làm</SelectItem>
                  <SelectItem value="medical">Y tế & Sức khỏe</SelectItem>
                  <SelectItem value="equipment">Thiết bị hỗ trợ</SelectItem>
                </SelectContent>
              </Select>

              {/* Dynamic UI based on selection */}
              {form.need === "job" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Công việc mong muốn
                    </label>
                    <Input
                      placeholder="Nhập công việc mong muốn"
                      value={form.desiredJob}
                      onChange={(e) =>
                        handleChange("desiredJob", e.target.value)
                      }
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Loại hình công việc
                      </label>
                      <Select
                        onValueChange={(val: string) =>
                          handleChange("jobType", val)
                        }
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Chọn loại hình công việc" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fulltime">
                            Toàn thời gian
                          </SelectItem>
                          <SelectItem value="parttime">
                            Bán thời gian
                          </SelectItem>
                          <SelectItem value="remote">Làm việc từ xa</SelectItem>
                          <SelectItem value="freelance">Tự do</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Mức lương mong muốn
                      </label>
                      <Input
                        placeholder="Khoảng thu nhập"
                        value={form.desiredSalary}
                        onChange={(e) =>
                          handleChange("desiredSalary", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tài liệu đính kèm
                    </label>
                    <UploadThingComponent
                      value={form.attachedDocuments}
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

              {form.need === "medical" && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mô tả
                  </label>
                  <Textarea
                    placeholder="Khám chữa bệnh/Thuốc men..."
                    value={form.medicalDescription}
                    onChange={(e) =>
                      handleChange("medicalDescription", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              )}

              {form.need === "equipment" && (
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Mô tả
                  </label>
                  <Textarea
                    placeholder="Xe lăn, máy trợ thính..."
                    value={form.equipmentDescription}
                    onChange={(e) =>
                      handleChange("equipmentDescription", e.target.value)
                    }
                    rows={4}
                  />
                </div>
              )}
            </div>

            {/* Xác nhận */}
            <div className="flex items-start gap-3">
              <Checkbox
                checked={form.consent}
                onCheckedChange={(val) => handleChange("consent", !!val)}
                id="consent"
              />
              <label
                htmlFor="consent"
                className="text-sm leading-relaxed text-[#637381]"
              >
                Tôi đồng ý để Việc Lành sử dụng thông tin trên để khởi tạo hồ sơ
                và gắn Đại diện khu vực hỗ trợ tìm việc.
              </label>
            </div>

            {/* Nút gửi */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-full bg-[#6941C6] px-6 py-5 text-white hover:bg-[#5A37AD]"
              >
                Gửi yêu cầu <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

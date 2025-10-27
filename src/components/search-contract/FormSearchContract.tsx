"use client";

import { ArrowRight, AlertTriangle } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FormSearchContract() {
  const [fileCode, setFileCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileCode.trim()) {
      setError("Vui lòng nhập mã hồ sơ");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle search logic here

      // For demo purposes, show error if code doesn't start with "VL-"
      if (!fileCode.startsWith("VL-")) {
        setError(
          "Mã hồ sơ không hợp lệ. Vui lòng nhập mã hồ sơ đúng định dạng.",
        );
      } else {
        // Success case - would typically navigate to results or show modal
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi tra cứu. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Section - Information */}
          <div className="space-y-6 lg:space-y-8">
            <div>
              <h2 className="mb-6 text-4xl font-medium text-gray-800 sm:text-4xl lg:text-5xl">
                Xác định trạng thái nhanh chóng
              </h2>
            </div>

            <div className="space-y-4">
              <div className="text-base leading-relaxed text-gray-700 md:text-lg">
                <div className="text-primary text-lg font-bold">Bước 1:</div>
                Nhập mã hồ sơ cá nhân của bạn vào ô bên.
              </div>
              <div className="text-base leading-relaxed text-gray-700 md:text-lg">
                <div className="text-primary text-lg font-bold">Bước 2:</div>
                Nhấn nút "Tra cứu".
              </div>
              <div className="text-base leading-relaxed text-gray-700 md:text-lg">
                <div className="text-primary text-lg font-bold">Bước 3:</div>
                Hệ thống sẽ hiển thị trạng thái hồ sơ và thông tin liên hệ của
                Đại diện Khu vực phụ trách.
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="w-full">
            <div className="">
              <h3 className="mb-6 text-lg font-semibold text-gray-800">
                Nhập mã hồ sơ
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="VD: VL-1234"
                    value={fileCode}
                    onChange={(e) => {
                      setFileCode(e.target.value);
                      if (error) setError("");
                    }}
                    className="w-full"
                    invalid={!!error}
                  />

                  {error && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gray-800 py-3 text-white hover:bg-gray-900"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Đang tra cứu...
                    </>
                  ) : (
                    <>
                      Tra cứu
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

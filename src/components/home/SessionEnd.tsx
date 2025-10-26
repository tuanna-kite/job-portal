"use client";

import Image from "next/image";
import React from "react";

import { bannerEnd } from "@/contants/images";

export default function SessionEnd() {
  return (
    <div className="h-max bg-white py-[60px] md:py-[140px]">
      <div className="mx-auto w-full max-w-[1280px] rounded-3xl overflow-hidden relative px-6 md:px-10">
        {/* Vùng ảnh + overlay */}
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            src={bannerEnd}
            alt="Hành động Ngay Hôm Nay"
            className="h-[400px] md:h-[460px] w-full object-cover"
          />

          {/* Lớp mờ overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Nội dung */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Hành động Ngay Hôm Nay
            </h2>
            <p className="max-w-2xl text-sm md:text-base text-gray-200 mb-6">
              Việc Lành là sứ mệnh chung. Hãy cùng nhau xây dựng một cộng đồng nơi
              mọi người đều có cơ hội cống hiến.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-2 rounded-lg border border-white text-white hover:bg-white/10 transition">
                Trở thành đại diện
              </button>
              <button className="px-6 py-2 rounded-lg bg-[#635BFF] hover:bg-[#5147FF] transition text-white font-medium">
                Nhận hỗ trợ ngay!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

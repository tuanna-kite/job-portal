"use client";

import Image from "next/image";
import React from "react";

import { bannerEnd } from "@/contants/images";

export default function SessionEnd() {
  return (
    <div className="h-max bg-white py-[60px] md:py-[140px]">
      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-3xl px-6 md:px-10">
        {/* Vùng ảnh + overlay */}
        <div className="relative overflow-hidden rounded-3xl">
          <Image
            src={bannerEnd}
            alt="Hành động Ngay Hôm Nay"
            className="h-[400px] w-full object-cover md:h-[460px]"
          />

          {/* Lớp mờ overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Nội dung */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              Hành động Ngay Hôm Nay
            </h2>
            <p className="mb-6 max-w-2xl text-sm text-gray-200 md:text-base">
              Việc Lành là sứ mệnh chung. Hãy cùng nhau xây dựng một cộng đồng
              nơi mọi người đều có cơ hội cống hiến.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="rounded-lg border border-white px-6 py-2 text-white transition hover:bg-white/10">
                Trở thành đại diện
              </button>
              <button className="rounded-lg bg-[#635BFF] px-6 py-2 font-medium text-white transition hover:bg-[#5147FF]">
                Nhận hỗ trợ ngay!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

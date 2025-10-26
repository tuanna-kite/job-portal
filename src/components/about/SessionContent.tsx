"use client";

import Image from "next/image";
import React from "react";


export default function SessionContent() {
  return (
    <div className="h-max bg-white py-[30px] md:py-[70px]">
      <div className="mx-auto w-full max-w-[1280px] rounded-3xl overflow-hidden relative px-6 md:px-10">
        {/* Vùng ảnh + overlay */}
        <p className="text-lg md:text-xl leading-relaxed">
          Việc Lành được xây dựng trên thực tế rằng nhiều người khuyết tật có đầy đủ năng lực
          và khao khát cống hiến nhưng bị ngăn cách bởi rào cản công nghệ, giao tiếp, và hạ tầng.
        </p>

        {/* Ảnh minh họa */}
        <div className="my-10 md:my-16">
          <Image
            src="/images/background/content-about.jpg"
            alt="Người khuyết tật trên xe lăn"
            width={1000}
            height={400}
            className="rounded-xl object-cover w-full h-auto"
          />
        </div>

        {/* Nội dung chi tiết */}
        <div className="space-y-6 text-base md:text-lg leading-relaxed text-[#1C1C1C]">
          <p>
            Thay vì cơ chế thị trường truyền thống, Việc Lành tạo ra mạng lưới hỗ trợ nhân văn
            gồm Ban Điều phối và Đại diện Khu vực tại địa phương. Rep là cầu nối tin cậy giúp
            người khuyết tật đăng ký hồ sơ, tiếp cận thông tin việc làm đơn giản, và nhận hỗ trợ
            khẩn cấp về sinh kế, y tế một cách kịp thời.
          </p>
          <p>
            Mục tiêu của chúng tôi là thúc đẩy hòa nhập và tôn trọng, giúp người khuyết tật phát huy
            khả năng, ổn định thu nhập và khẳng định giá trị của bản thân.
          </p>
        </div>
      </div>
    </div>
  );
}

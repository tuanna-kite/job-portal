"use client";

import "./index.css";

import React from "react";

const HeroConnect = () => {
  return (
    <section className="connect-selection bg-[#FFEBD6] pt-11 pb-15 md:py-30">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <h1 className="mt-8 mb-8 text-3xl leading-snug font-medium md:text-7xl">
          Cùng bắt đầu hành trình <br />
          <span>Việc lành của bạn.</span>
        </h1>
        <p className="mb-12 max-w-[584px] text-base md:text-xl">
          Kết nối với Đại diện Khu vực ngay hôm nay để khởi tạo hồ sơ và mở khóa
          cơ hội việc làm từ xa.
        </p>
      </div>
    </section>
  );
};

export default HeroConnect;

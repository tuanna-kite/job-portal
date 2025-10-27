"use client";

import "./index.css";

import React from "react";

const HeroSearchContract = () => {
  return (
    <section className="search-contract-selection bg-[#FFEBD6] pt-11 pb-15 md:py-30">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <h1 className="mt-8 mb-8 text-3xl leading-snug font-medium md:text-7xl">
          Tra cứu hồ sơ <br />
          <span>Việc Lành</span>
        </h1>
        <p className="mb-12 max-w-[584px] text-base md:text-xl">
          Sử dụng mã hồ sơ cá nhân để theo dõi tiến trình xử lý và cập nhật mới
          nhất từ Ban điều phối.
        </p>
      </div>
    </section>
  );
};

export default HeroSearchContract;

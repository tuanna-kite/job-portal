"use client";

import "./index.css";

 
import React from "react";

const HeroAbout = () => {
  return (
    <section className="about-selection bg-[#FFEBD6] pt-11 pb-15 md:py-30">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <h1 className="mt-8 mb-8 text-3xl leading-snug font-medium md:text-7xl">
          Khẳng định năng lực và <br />
          <span>kết nối mọi rào cản.</span>
        </h1>
        <p className="mb-12 max-w-[584px] text-base md:text-xl">
          Giải pháp nhân văn kiến tạo cơ hội việc làm từ xa và hỗ trợ sinh kế toàn diện cho người khuyết tật.
        </p>
      </div>
    </section>
  );
};

export default HeroAbout;

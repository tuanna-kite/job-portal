"use client";

import "./index.css";

 
import React from "react";

const HeroContact = () => {
  return (
    <section className="contact-selection bg-[#FFEBD6] pt-11 pb-15 md:py-30">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <h1 className="mt-8 mb-8 text-3xl leading-snug font-medium md:text-7xl">
          Hỗ trợ người khuyết tật <br />
          <span>Việt Nam</span>
        </h1>
        <p className="mb-12 max-w-[584px] text-base md:text-xl">
          Liên hệ với chúng tôi nếu như bạn có bất kỳ câu hỏi nào.
        </p>
      </div>
    </section>
  );
};

export default HeroContact;

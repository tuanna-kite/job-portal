"use client";

// eslint-disable-next-line import/order
import { useRouter } from "next/navigation";

// eslint-disable-next-line import/order
import { Button } from "@/components/ui/button";

import "./index.css";

import { Star1 } from "iconsax-react";
import Image from "next/image";
// eslint-disable-next-line import/order
import React from "react";
import { awards } from "@/contants/images";
import { ERouteTable } from "@/contants/route";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="home-selection bg-[#FFEBD6] pt-11 pb-15 text-center md:py-30">
      <div className="container mx-auto px-4">
        <h1 className="mt-8 mb-12 text-3xl leading-snug font-medium md:text-7xl">
          Cơ hội bình đẳng. <br />
          <span>Không rào cản số.</span>
        </h1>
        <div className="flex justify-center">
          <p className="mb-12 max-w-[584px] text-center text-base md:text-xl">
            Hệ thống độc quyền giúp hàng ngàn người khuyết tật tại Việt Nam tiếp
            cận cơ hội làm việc, học nghề, và nhận hỗ trợ sinh kế ngay tại địa
            phương.
          </p>
        </div>

        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Button
            variant="default"
            className="mx-auto w-fit rounded-lg border border-white bg-transparent px-6 py-3 md:mx-0"
            // onClick={() => router.push(ERouteTable.EXPLORE)}
          >
            Trở thành đại diện
          </Button>
          <Button
            className="bg-primary-main mx-auto w-fit rounded-lg px-6 py-3 md:mx-0"
            onClick={() => router.push(ERouteTable.CONNECT)}
          >
            Nhận hỗ trợ ngay!
          </Button>
        </div>
        <div className="mt-20 max-w-[1280px] px-6 md:px-10">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-xl font-semibold text-white">
                <Star1 size="32" color="#22C55E" variant="Bold" />
                4.8
              </div>
              <div className="mt-2 text-white">(2.004 Đánh giá)</div>
            </div>
            <div>
              <div className="text-white">
                Giá trị cốt lõi dẫn lối mọi hành động
              </div>
              <div className="mt-2 flex gap-4 md:gap-16">
                <div className="text-white">HÒA NHẬP</div>
                <div className="text-white">TÔN TRỌNG</div>
                <div className="text-white">BÌNH ĐẲNG</div>
              </div>
            </div>
            <div>
              <Image
                src={awards}
                alt="logo app"
                className="mx-auto my-4 w-44"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

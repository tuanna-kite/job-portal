"use client";

import React from "react";

export default function SessionTutorial() {
  const steps = [
    {
      id: "01",
      title: "Đăng ký qua đại diện",
      desc: "Đại diện giúp thu thập thông tin, tạo hồ sơ trên hệ thống, và tiến hành xác minh ban đầu.",
      img: "/images/home/img-4.jpg",
    },
    {
      id: "02",
      title: "Gợi ý & Gắn việc làm",
      desc: "Đại diện trực tiếp liên hệ, gắn việc và cung cấp tóm tắt đã đọc.",
      img: "/images/home/img-5.jpg",
    },
    {
      id: "03",
      title: "Theo dõi & Hỗ trợ",
      desc: "Đại diện đồng hành cùng Người khuyết tật trong quá trình ứng tuyển và phỏng vấn.",
      img: "/images/home/img-6.jpg",
    },
  ];

  return (
    <div className="h-max bg-neutral-50 py-[60px] md:py-[140px]">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="">
          <div className="text-center text-3xl font-medium md:text-5xl md:leading-[60px]">
            Quy trình 3 bước để người khuyết tật tiếp cận việc làm
          </div>
          <div className="mt-4 text-center">
            Việc Lành là một mạng lưới nhân văn được thiết kế để giải quyết 3
            rào cản lớn nhất mà người khuyết tật gặp phải khi tìm việc.
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Ảnh nền */}
              <img
                src={step.img}
                alt={step.title}
                className="h-72 w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Lớp mờ overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Nội dung */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-left text-white">
                <span className="text-sm font-medium opacity-80">
                  {step.id}
                </span>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm opacity-90">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

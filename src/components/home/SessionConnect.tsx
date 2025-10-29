"use client";

import { ArrowRight2 } from "iconsax-react";
import Image from "next/image";
import React, { useState } from "react";

import { bannerConnect } from "@/contants/images";

export default function SessionConnect() {
  const items = [
    {
      id: 1,
      title: "Giảm rào cản công nghệ & giao tiếp",
      content:
        "Đăng ký và cập nhật hồ sơ thông qua Đại diện Khu vực. Đại diện khu vực là cầu nối vật lý, giúp NKT vượt qua rào cản về thiết bị và kỹ năng số.",
    },
    {
      id: 2,
      title: "Tạo môi trường hỗ trợ, không phán xét",
      content:
        "Mọi kết nối được quản lý bởi Ban Điều phối và mạng lưới Hội người khuyết tật địa phương. Đảm bảo sự kết nối diễn ra dựa trên sự thấu hiểu, không phải cạnh tranh thị trường lạnh lùng.",
    },
    {
      id: 3,
      title: "Dữ liệu xã hội hóa cho chính sách",
      content:
        "Hệ thống thống kê nhu cầu, khó khăn và kỹ năng một cách chi tiết. Dữ liệu này giúp các tổ chức phi lợi nhuận, chính quyền địa phương đưa ra quyết định hỗ trợ sinh kế, y tế chính xác và kịp thời hơn.",
    },
  ];

  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="h-max bg-white py-[60px] md:py-[140px]">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="text-3xl font-medium md:text-5xl md:leading-[60px]">
          Vượt qua rào cản số,
          <br /> kết nối bằng trái tim.
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="max-w-[450px]">
            Việc Lành là một mạng lưới nhân văn được thiết kế để giải quyết 3
            rào cản lớn nhất mà người khuyết tật gặp phải khi tìm việc.
          </div>
          <div className="bg-primary-main hidden cursor-pointer rounded-lg px-6 py-4 text-white md:block">
            Nhận hỗ trợ!
          </div>
        </div>
        <div className="mt-6 flex flex-col justify-between gap-20 md:flex-row">
          <div className="flex items-end">
            <div className="w-full max-w-xl divide-y divide-gray-200">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer py-4"
                  onClick={() => toggleItem(item.id)}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex w-full items-start gap-2">
                      <span className="shrink-0 font-medium text-gray-400">
                        {String(item.id).padStart(2, "0")}.
                      </span>
                      <h3
                        className={`flex-1 text-left font-semibold transition-colors ${
                          activeId === item.id
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <ArrowRight2
                      size="20"
                      color={activeId === item.id ? "#111827" : "#9CA3AF"}
                      className={`shrink-0 transition-transform duration-300 ${
                        activeId === item.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out`}
                    style={{
                      maxHeight: activeId === item.id ? "200px" : "0px",
                      opacity: activeId === item.id ? 1 : 0,
                    }}
                  >
                    {item.content && (
                      <p className="mt-2 ml-8 text-sm text-gray-500">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Image
            src={bannerConnect}
            alt="logo app"
            className="my-4 w-[390px] rounded-lg md:w-full lg:w-[540px]"
          />
        </div>
      </div>
    </div>
  );
}

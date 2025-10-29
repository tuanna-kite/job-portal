"use client";

import { ArrowRight2 } from "iconsax-react";
import React, { useState } from "react";

export default function SessionValue() {
  const items = [
    {
      id: 1,
      title: "Người Khuyết Tật",
      content:
        "Cơ hội làm việc tại nhà, thu nhập ổn định. Được tư vấn kỹ năng, được hỗ trợ nộp hồ sơ, và nhận phản ánh nhu cầu cá nhân.",
    },
    {
      id: 2,
      title: "Đại diện Khu vực",
      content:
        "Là cầu nối giữa người khuyết tật và hệ thống Việc Lành. Đại diện hỗ trợ thu thập thông tin, xác minh hồ sơ, gợi ý việc làm phù hợp, và đồng hành trong quá trình tuyển dụng.",
    },
    {
      id: 3,
      title: "Đối tác / Doanh nghiệp",
      content:
        "Cơ hội tuyển dụng nhân sự đa dạng, thể hiện trách nhiệm xã hội. Nhận tư vấn và hỗ trợ về quy trình tuyển dụng người khuyết tật, cùng xây dựng môi trường làm việc hoà nhập và bền vững.",
    },
  ];

  const [activeId, setActiveId] = useState<number | null>(1);

  const toggleItem = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="h-max bg-white py-[60px] md:py-[140px]">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="mt-6 flex flex-col justify-between gap-20 md:flex-row">
          <div>
            <div className="text-4xl">
              Giá trị <br />
              của Việc Lành
            </div>
            <div className="mt-4">
              Chúng tôi xây dựng nền tảng đôi bên cùng có lợi cho cộng đồng bền
              vững.
            </div>
          </div>
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
                    <h3
                      className={`flex-1 text-left font-semibold transition-colors ${
                        activeId === item.id ? "text-gray-900" : "text-gray-500"
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
                    <p className="mt-2 text-sm text-gray-500">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

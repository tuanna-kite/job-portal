"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    handle: "@minhanh",
    content:
      "Việc Lành giúp tôi tìm được công việc phù hợp, mang lại sự tự tin và động lực mỗi ngày.",
    avatar: "/avatar/img-avatar-1.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Quang Huy",
    handle: "@quanghuy",
    content:
      "Tôi thích giao diện đơn giản của Việc Lành, thông tin rõ ràng và dễ tìm kiếm việc phù hợp.",
    avatar: "/avatar/img-avatar-2.jpg",
  },
  {
    id: 3,
    name: "Trần Thảo Chi",
    handle: "@thaochi",
    content:
      "Nhờ Việc Lành, tôi biết nhiều cơ hội việc làm phù hợp với khả năng và hoàn cảnh bản thân.",
    avatar: "/avatar/img-avatar-3.jpg",
  },
  {
    id: 4,
    name: "Phạm Lan Hương",
    handle: "@lanhuong",
    content:
      "Trang web rất thân thiện, giúp người khuyết tật tiếp cận nhà tuyển dụng dễ dàng và an tâm hơn.",
    avatar: "/avatar/img-avatar-4.jpg",
  },
  {
    id: 5,
    name: "Đinh Gia Bảo",
    handle: "@giabao",
    content:
      "Việc Lành cho tôi cảm giác được lắng nghe, tôn trọng và có thêm hy vọng trong công việc.",
    avatar: "/avatar/img-avatar-5.jpg",
  },
  {
    id: 6,
    name: "Hoàng Đức Hùng",
    handle: "@duchung",
    content:
      "Các tin tuyển dụng được trình bày rõ ràng, giúp tôi chọn công việc phù hợp nhanh chóng hơn.",
    avatar: "/avatar/img-avatar-6.jpg",
  },
  {
    id: 7,
    name: "Nguyễn Anh Tuấn",
    handle: "@anhtuan",
    content:
      "Tôi đánh giá cao ý nghĩa nhân văn của Việc Lành trong việc kết nối cơ hội nghề nghiệp.",
    avatar: "/avatar/img-avatar-7.jpg",
  },
  {
    id: 8,
    name: "Nguyễn Anh Thư",
    handle: "@anhthu",
    content:
      "Việc Lành là cầu nối thiết thực giữa người khuyết tật và những doanh nghiệp sẵn lòng đồng hành.",
    avatar: "/avatar/img-avatar-8.jpg",
  },
];

type Review = (typeof reviews)[number];

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex w-[calc(100vw-3rem)] shrink-0 flex-col justify-between rounded-[28px] bg-[#F3F4F6] p-6 sm:w-[300px] md:w-[280px] md:p-8 lg:w-[300px]">
      <p className="text-sm leading-relaxed text-gray-700 md:text-[15px]">
        {review.content}
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Image
          src={review.avatar}
          alt={review.name}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-900">
            {review.name}
          </p>
          <p className="truncate text-sm text-gray-500">{review.handle}</p>
        </div>
      </div>
    </article>
  );
}

const DOT_COUNT = 3;
const SCROLL_DURATION_MS = 90000;

export default function SessionReview() {
  const [activeDot, setActiveDot] = useState(0);
  const duplicatedReviews = [...reviews, ...reviews];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % DOT_COUNT);
    }, SCROLL_DURATION_MS / DOT_COUNT);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-white py-[60px] md:py-[100px]">
      <div className="mb-10 px-6 text-center md:mb-14">
        <h2 className="text-2xl font-semibold text-gray-900 md:text-4xl">
          Cộng đồng người khuyết tật chia sẻ
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 md:text-base">
          Cùng lắng nghe những phản hồi tích cực từ cộng đồng người khuyết tật.
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="animate-review-scroll flex w-max gap-4 px-4 hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused] md:gap-5 md:px-10"
            style={{ animationDuration: `${SCROLL_DURATION_MS}ms` }}
          >
            {duplicatedReviews.map((review, index) => (
              <ReviewCard key={`${review.id}-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-10 flex justify-center gap-2"
        role="tablist"
        aria-label="Vị trí carousel đánh giá"
      >
        {Array.from({ length: DOT_COUNT }).map((_, dot) => (
          <span
            key={dot}
            role="tab"
            aria-selected={activeDot === dot}
            className={`h-2 w-2 rounded-full transition-colors duration-500 ${
              activeDot === dot ? "bg-primary-main" : "bg-primary-main/20"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

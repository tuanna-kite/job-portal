"use client";

import Link from "next/link";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { useOpportunities } from "@/shared/http/hooks/opportunities";

const LOCATION_TYPE_LABELS: Record<string, string> = {
  remote: "Từ xa",
  hybrid: "Hợp tác",
  onsite: "Trực tiếp",
};

const LOCATION_TYPE_COLORS: Record<string, string> = {
  remote: "bg-blue-100 text-blue-700",
  hybrid: "bg-purple-100 text-purple-700",
  onsite: "bg-green-100 text-green-700",
};

type FilterTab = "all" | "remote" | "hybrid" | "onsite";

export default function SessionListJob() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { data: opportunities = [], isLoading } = useOpportunities();

  // Filter jobs based on active tab and status
  const filteredJobs = opportunities.filter((job) => {
    // Only show open jobs
    if (job.status !== "open") return false;
    
    if (activeTab === "all") return true;
    return job.locationType === activeTab;
  });

  const tabs: Array<{ key: FilterTab; label: string }> = [
    { key: "all", label: "Tất cả" },
    { key: "remote", label: "Từ xa" },
    { key: "hybrid", label: "Hợp tác" },
    { key: "onsite", label: "Trực tiếp" },
  ];

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hôm nay";
    if (diffDays === 1) return "Hôm qua";
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return d.toLocaleDateString("vi-VN");
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="mb-4 text-3xl font-bold text-[#212B36] md:text-4xl lg:text-5xl">
              Cùng bắt đầu hành trình
              <br />
              Việc Lành của bạn.
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              Kết nối với Đại diện Khu vực ngay hôm nay để lắng nghe hỗ trợ với
              mọi khó khăn có hồi việc làm từ xa.
            </p>
          </div>
          <Link href="/connect">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-[#5B4DFF] px-8 text-base font-semibold hover:bg-[#4A3EE8]"
            >
              Tạo hồ sơ
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-2 border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const count =
              tab.key === "all"
                ? opportunities.filter((j) => j.status === "open").length
                : opportunities.filter(
                    (j) => j.locationType === tab.key && j.status === "open",
                  ).length;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap border-b-2 px-4 pb-3 text-sm font-medium transition-colors md:text-base ${
                  activeTab === tab.key
                    ? "border-[#5B4DFF] text-[#5B4DFF]"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-2 rounded-full px-2.5 py-0.5 text-xs ${
                    activeTab === tab.key
                      ? "bg-[#5B4DFF] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Job List */}
        {isLoading ? (
          <div className="py-12 text-center text-gray-500">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#5B4DFF]"></div>
            <p className="mt-4">Đang tải...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p className="text-lg">Chưa có việc làm nào.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-[#5B4DFF] hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-xs font-medium text-gray-500">
                    Mã: VL-{job.id.slice(0, 6).toUpperCase()}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${LOCATION_TYPE_COLORS[job.locationType]}`}
                  >
                    {LOCATION_TYPE_LABELS[job.locationType]}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-[#212B36] group-hover:text-[#5B4DFF]">
                  {job.title}
                </h3>

                <p className="mb-1 text-sm font-medium text-gray-700">
                  {job.partner?.email || "Công ty đối tác"}
                </p>

                <div className="mb-4 flex items-start gap-2">
                  <svg
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600 line-clamp-2">
                    {job.address}
                  </span>
                </div>

                <div className="mb-4 border-t border-gray-100 pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-gray-500">Thu nhập:</span>
                    <span className="text-sm font-semibold text-[#212B36]">
                      {job.salaryRange || "8 - 10 triệu"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Ngày đăng: {formatDate(job.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

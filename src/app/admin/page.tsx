"use client";

import {
  Briefcase,
  FileText,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { useCases } from "@/shared/http/hooks/cases";
import { useOpportunities } from "@/shared/http/hooks/opportunities";
import { useReps } from "@/shared/http/hooks/reps";
import { useUsers } from "@/shared/http/hooks/users";

const STATUS_LABELS: Record<string, string> = {
  pending: "Chờ xử lý",
  in_progress: "Đang xử lý",
  matched: "Hoàn thành",
  rejected: "Từ chối",
  done: "Hoàn thành",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  matched: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  done: "bg-green-100 text-green-700",
};

type StatCardProps = {
  title: string;
  value: number;
  trend: string;
  icon: React.ReactNode;
  color: string;
};

function StatCard({ title, value, trend, icon, color }: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`rounded-lg p-2 ${color}`}>{icon}</div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <span className="flex items-center gap-1 text-sm text-green-600">
          <TrendingUp className="h-3 w-3" />
          {trend}
        </span>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: cases = [] } = useCases();
  const { data: opportunities = [] } = useOpportunities();
  const { data: usersData } = useUsers();
  const { data: repsData } = useReps();

  const users = usersData?.items || [];
  const reps = repsData?.items || [];

  const recentCases = cases.slice(0, 5);
  const pendingRequests = cases
    .filter((c) => c.status === "pending")
    .slice(0, 5);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#1C1C1C]">Dashboard</h1>
        <p className="text-sm text-gray-500">Bảng điều khiển</p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng hồ sơ"
          value={cases.length}
          trend="+10% hôm nay"
          icon={<FileText className="h-5 w-5 text-green-600" />}
          color="bg-green-50"
        />
        <StatCard
          title="Tổng yêu cầu"
          value={cases.filter((c) => c.status === "pending").length}
          trend="+10% hôm nay"
          icon={<Users className="h-5 w-5 text-yellow-600" />}
          color="bg-yellow-50"
        />
        <StatCard
          title="Tổng việc làm"
          value={opportunities.length}
          trend="+10% hôm nay"
          icon={<Briefcase className="h-5 w-5 text-orange-600" />}
          color="bg-orange-50"
        />
        <StatCard
          title="Tổng đại diện"
          value={reps.length}
          trend="+10% hôm nay"
          icon={<UserCheck className="h-5 w-5 text-blue-600" />}
          color="bg-blue-50"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold text-[#1C1C1C]">Hồ sơ mới</h2>
            <Link
              href="/admin/profile"
              className="text-sm text-blue-600 hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 font-medium">Hồ sơ</th>
                  <th className="pb-3 font-medium">Tên</th>
                  <th className="pb-3 font-medium">Việc kết nối</th>
                  <th className="pb-3 font-medium">Đại diện khu vực</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                  <th className="pb-3 font-medium">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {recentCases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      Chưa có hồ sơ nào
                    </td>
                  </tr>
                ) : (
                  recentCases.map((caseRecord) => (
                    <tr key={caseRecord.id} className="border-b last:border-0">
                      <td className="py-3 text-sm text-blue-600">
                        <Link href={`/admin/profile/${caseRecord.id}`}>
                          #{caseRecord.id.slice(0, 4)}
                        </Link>
                      </td>
                      <td className="py-3 text-sm font-medium">
                        {caseRecord.user?.fullName || "Tên người khuyết tật"}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {caseRecord.opportunity?.title ||
                          "Cơ hội việc làm được kết nối"}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {caseRecord.assignedRep?.fullName || "Tên đại diện"}
                      </td>
                      <td className="py-3 text-sm">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            STATUS_COLORS[caseRecord.status]
                          }`}
                        >
                          {STATUS_LABELS[caseRecord.status]}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(caseRecord.createdAt).toLocaleDateString(
                          "vi-VN",
                        )}
                        <br />
                        <span className="text-xs">
                          {new Date(caseRecord.createdAt).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}{" "}
                          am
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-white">
          <div className="flex items-center justify-between border-b p-6">
            <h2 className="text-lg font-semibold text-[#1C1C1C]">
              Yêu Cầu mới
            </h2>
            <Link
              href="/admin/profile"
              className="text-sm text-blue-600 hover:underline"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Tên</th>
                  <th className="pb-3 font-medium">Người xử lý</th>
                  <th className="pb-3 font-medium">Loại</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                  <th className="pb-3 font-medium">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      Chưa có yêu cầu nào
                    </td>
                  </tr>
                ) : (
                  pendingRequests.map((request) => (
                    <tr key={request.id} className="border-b last:border-0">
                      <td className="py-3 text-sm text-blue-600">
                        <Link href={`/admin/profile/${request.id}`}>
                          #{request.id.slice(0, 4)}
                        </Link>
                      </td>
                      <td className="py-3 text-sm font-medium">
                        {request.user?.fullName || "Tên người khuyết tật"}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {request.assignedRep?.fullName || "Tên đại diện"}
                      </td>
                      <td className="py-3 text-sm text-gray-600">Việc làm</td>
                      <td className="py-3 text-sm">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                          Đã giải quyết
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(request.createdAt).toLocaleDateString(
                          "vi-VN",
                        )}
                        <br />
                        <span className="text-xs">
                          {new Date(request.createdAt).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}{" "}
                          am
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

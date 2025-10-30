"use client";

import { EllipsisVertical, Search, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type NeedReport,
  type NeedReportStatus,
  type NeedSupportCategory,
  type UpdateNeedReportDto,
  useDeleteNeedReport,
  useNeedReports,
  useUpdateNeedReport,
} from "@/shared/http/hooks/reports";

const CATEGORY_LABELS: Record<NeedSupportCategory, string> = {
  JOB_SEEKING: "Hỗ trợ việc làm",
  TRAINING_EDUCATION: "Hỗ trợ đào tạo",
  ASSISTIVE_DEVICES: "Hỗ trợ thiết bị",
  FINANCIAL_ASSISTANCE: "Hỗ trợ tài chính",
  HEALTHCARE_SUPPORT: "Hỗ trợ y tế",
  HOUSING_SUPPORT: "Hỗ trợ chỗ ở",
  TRANSPORTATION_SUPPORT: "Hỗ trợ di chuyển",
  LEGAL_SUPPORT: "Hỗ trợ pháp lý",
  SOCIAL_INCLUSION: "Hỗ trợ hòa nhập xã hội",
  COUNSELING_MENTAL_HEALTH: "Tư vấn tâm lý",
};

const STATUS_LABELS: Record<NeedReportStatus, string> = {
  open: "Chờ xử lý",
  reviewing: "Đang xem xét",
  resolved: "Đã giải quyết",
  rejected: "Từ chối",
};

const STATUS_COLORS: Record<NeedReportStatus, string> = {
  open: "bg-yellow-100 text-yellow-700",
  reviewing: "bg-blue-100 text-blue-700",
  resolved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function SupportAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingReport, setEditingReport] = useState<NeedReport | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<NeedReportStatus>("open");

  const { data: reports = [], isLoading } = useNeedReports();
  const updateMutation = useUpdateNeedReport();
  const deleteMutation = useDeleteNeedReport();

  const filteredReports = reports.filter((report) => {
    const matchSearch =
      report.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory =
      categoryFilter === "all" || report.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const groupedByStatus = {
    all: filteredReports.length,
    resolved: filteredReports.filter((r) => r.status === "resolved").length,
    reviewing: filteredReports.filter((r) => r.status === "reviewing").length,
    open: filteredReports.filter((r) => r.status === "open").length,
    rejected: filteredReports.filter((r) => r.status === "rejected").length,
  };

  const handleUpdate = async () => {
    if (!editingReport) return;
    try {
      const data: UpdateNeedReportDto = {
        status: editStatus,
      };
      await updateMutation.mutateAsync({ id: editingReport.id, data });
      toast.success("Cập nhật yêu cầu thành công");
      setEditingReport(null);
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Cập nhật thất bại");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Xóa yêu cầu thành công");
      setDeleteConfirm(null);
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Xóa thất bại");
    }
  };

  const openEditDialog = (report: NeedReport) => {
    setEditingReport(report);
    setEditStatus(report.status);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C1C1C]">
            Yêu cầu hỗ trợ
          </h1>
          <p className="text-sm text-gray-500">Bảng điều khiển • Hồ sơ</p>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="mb-4 flex gap-3 border-b">
          <button className="border-b-2 border-black px-4 pb-2 text-sm font-medium">
            Tất cả{" "}
            <span className="ml-1 rounded bg-black px-2 py-0.5 text-xs text-white">
              {groupedByStatus.all}
            </span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Hoàn thành{" "}
            <span className="ml-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
              {groupedByStatus.resolved}
            </span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Đang xem xét{" "}
            <span className="ml-1 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              {groupedByStatus.reviewing}
            </span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Chờ xử lý{" "}
            <span className="ml-1 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
              {groupedByStatus.open}
            </span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Từ chối{" "}
            <span className="ml-1 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
              {groupedByStatus.rejected}
            </span>
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-10 w-48">
              <SelectValue placeholder="Loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả loại</SelectItem>
              <SelectItem value="JOB_SEEKING">Việc làm</SelectItem>
              <SelectItem value="TRAINING_EDUCATION">Đào tạo</SelectItem>
              <SelectItem value="ASSISTIVE_DEVICES">Thiết bị</SelectItem>
              <SelectItem value="FINANCIAL_ASSISTANCE">Tài chính</SelectItem>
              <SelectItem value="HEALTHCARE_SUPPORT">Y tế</SelectItem>
              <SelectItem value="HOUSING_SUPPORT">Chỗ ở</SelectItem>
              <SelectItem value="TRANSPORTATION_SUPPORT">Di chuyển</SelectItem>
              <SelectItem value="LEGAL_SUPPORT">Pháp lý</SelectItem>
              <SelectItem value="SOCIAL_INCLUSION">Hòa nhập</SelectItem>
              <SelectItem value="COUNSELING_MENTAL_HEALTH">Tâm lý</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <EllipsisVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Xuất CSV</DropdownMenuItem>
              <DropdownMenuItem>Xuất Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <span>{filteredReports.length} kết quả được tìm thấy</span>
          {categoryFilter !== "all" && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span className="font-medium">Loại:</span>
              <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs">
                Việc làm
                <button
                  onClick={() => setCategoryFilter("all")}
                  className="hover:text-gray-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
              <span className="text-gray-400">•</span>
              <span className="font-medium">Từ khóa:</span>
              <span className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs">
                Keyword
                <button className="hover:text-gray-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
              <button className="text-red-600 hover:underline">🗑️ Xóa</button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-gray-500">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 font-medium">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Tên</th>
                  <th className="pb-3 font-medium">Người xử lý</th>
                  <th className="pb-3 font-medium">Loại</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                  <th className="pb-3 font-medium">Ngày tạo</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-500">
                      Chưa có yêu cầu nào
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr key={report.id} className="border-b last:border-0">
                      <td className="py-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-3 text-sm text-blue-600">
                        <Link href={`/admin/support/${report.id}`}>
                          #{report.id.slice(0, 4)}
                        </Link>
                      </td>
                      <td className="py-3 text-sm font-medium">
                        {report.user?.fullName || "Tên người khuyết tật"}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {report.assignedTo?.fullName || "Tên đại diện"}
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {CATEGORY_LABELS[report.category]}
                      </td>
                      <td className="py-3 text-sm">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            STATUS_COLORS[report.status]
                          }`}
                        >
                          {STATUS_LABELS[report.status]}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(report.createdAt).toLocaleDateString("vi-VN")}
                        <br />
                        <span className="text-xs">
                          {new Date(report.createdAt).toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}{" "}
                          am
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <EllipsisVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openEditDialog(report)}
                            >
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => setDeleteConfirm(report.id)}
                              className="text-red-600"
                            >
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Số hàng mỗi trang</span>
            <Select defaultValue="5">
              <SelectTrigger className="h-8 w-16">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">6-10 của 11</span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                ←
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={!!editingReport}
        onOpenChange={(open) => !open && setEditingReport(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cập nhật trạng thái</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Trạng thái
              </label>
              <Select
                value={editStatus}
                onValueChange={(v) => setEditStatus(v as NeedReportStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Chờ xử lý</SelectItem>
                  <SelectItem value="reviewing">Đang xem xét</SelectItem>
                  <SelectItem value="resolved">Đã giải quyết</SelectItem>
                  <SelectItem value="rejected">Từ chối</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setEditingReport(null)}>
                Hủy
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
              >
                Cập nhật
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Bạn có chắc chắn muốn xóa yêu cầu này không? Hành động này không thể
            hoàn tác.
          </p>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={deleteMutation.isPending}
            >
              Xóa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useDebounce } from "@/hooks/useDebounce";
import {
  useDeleteUser,
  useUnarchiveUser,
  useUpdateUser,
  useUserStatusCounts,
  useUsers,
} from "@/shared/http/hooks/users";

type UserRow = {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  region: string;
  status: string;
};

export default function UserAdminPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [unarchiveDialogOpen, setUnarchiveDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userToUnarchive, setUserToUnarchive] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useUsers({
    page,
    limit,
    search: debouncedSearch || undefined,
    status: statusFilter,
    role: roleFilter !== "all" ? roleFilter : undefined,
  });

  const { data: statusCountsData } = useUserStatusCounts();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const unarchiveUserMutation = useUnarchiveUser();

  // Tính số lượng theo status từ API
  const statusCounts = useMemo(() => {
    return {
      all: statusCountsData?.all ?? 0,
      active: statusCountsData?.active ?? 0,
      banned: statusCountsData?.banned ?? 0,
    };
  }, [statusCountsData]);

  const rows = useMemo<UserRow[]>(() => {
    return (data?.items || []).map((u) => ({
      id: u.id ? `#${u.id.slice(0, 8)}` : "--",
      userId: u.id,
      name: u.fullName,
      email: (u as any)?.email || "",
      phone: u.phone,
      role: u.repId ? "Đại diện" : "Người dùng",
      region: u.region?.name || "",
      status:
        u.status === "archived"
          ? "banned"
          : u.status === "active"
            ? "active"
            : (u.status ?? "pending"),
    }));
  }, [data]);

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status === "all" ? undefined : status);
    setPage(1); // Reset về trang đầu
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    setPage(1); // Reset về trang đầu
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1); // Reset về trang đầu
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await deleteUserMutation.mutateAsync(userToDelete);
      toast.success("Khóa tài khoản thành công");
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
      toast.error(error?.message || "Khóa tài khoản thất bại");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleUnarchiveClick = (userId: string) => {
    setUserToUnarchive(userId);
    setUnarchiveDialogOpen(true);
  };

  const handleUnarchiveConfirm = async () => {
    if (!userToUnarchive) return;

    try {
      await unarchiveUserMutation.mutateAsync(userToUnarchive);
      toast.success("Mở khóa tài khoản thành công");
      setUnarchiveDialogOpen(false);
      setUserToUnarchive(null);
    } catch (error: any) {
      toast.error(error?.message || "Mở khóa tài khoản thất bại");
    }
  };

  const handleUnarchiveCancel = () => {
    setUnarchiveDialogOpen(false);
    setUserToUnarchive(null);
  };

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Tabs summary */}
      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={() => handleStatusFilter("all")}
          className={`rounded-full border px-3 py-1 font-medium transition-colors ${
            statusFilter === undefined
              ? "border-primary-main bg-primary-main/10 text-primary-main"
              : "hover:bg-gray-50"
          }`}
        >
          Tất cả{" "}
          <span className="ml-2 rounded-full bg-gray-100 px-2">
            {statusCounts.all}
          </span>
        </button>
        <button
          onClick={() => handleStatusFilter("active")}
          className={`rounded-full border px-3 py-1 font-medium transition-colors ${
            statusFilter === "active"
              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
              : "hover:bg-gray-50"
          }`}
        >
          Hoạt động{" "}
          <span className="ml-2 rounded-full bg-emerald-50 px-2 text-emerald-600">
            {statusCounts.active}
          </span>
        </button>
        <button
          onClick={() => handleStatusFilter("archived")}
          className={`rounded-full border px-3 py-1 font-medium transition-colors ${
            statusFilter === "archived"
              ? "border-rose-500 bg-rose-50 text-rose-700"
              : "hover:bg-gray-50"
          }`}
        >
          Bị cấm{" "}
          <span className="ml-2 rounded-full bg-rose-50 px-2 text-rose-600">
            {statusCounts.banned}
          </span>
        </button>
        <div className="ml-auto">
          <Link href="/admin/users/new">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" /> Thêm người dùng
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Select value={roleFilter} onValueChange={handleRoleFilter}>
            <SelectTrigger className="h-10 w-full md:w-56">
              <SelectValue placeholder="Vai trò" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="rep">Đại diện</SelectItem>
              <SelectItem value="partner">Đối tác</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Tìm kiếm theo tên, điện thoại..."
                className="h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results summary chips */}
        <div className="mt-3 text-sm text-gray-600">
          {isLoading
            ? "Đang tải..."
            : `${data?.pagination?.totalItems ?? 0} kết quả được tìm thấy`}
        </div>
        {(roleFilter !== "all" || debouncedSearch) && (
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            {roleFilter !== "all" && (
              <div className="rounded-full bg-gray-100 px-2 py-1">
                Vai trò:{" "}
                {roleFilter === "rep"
                  ? "Đại diện"
                  : roleFilter === "partner"
                    ? "Đối tác"
                    : roleFilter}
              </div>
            )}
            {debouncedSearch && (
              <div className="rounded-full bg-gray-100 px-2 py-1">
                Từ khóa: {debouncedSearch}
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr className="border-b text-xs text-gray-500">
                <th className="w-10 py-3 pl-3">
                  <Checkbox />
                </th>
                <th className="py-3">ID</th>
                <th className="py-3">Tên</th>
                <th className="py-3">Điện thoại</th>
                <th className="py-3">Vai trò</th>
                <th className="py-3">Khu vực</th>
                <th className="py-3">Trạng thái</th>
                <th className="py-3 pr-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                rows.map((u) => (
                  <tr key={u.userId} className="border-b last:border-0">
                    <td className="py-3 pl-3 align-middle">
                      <Checkbox />
                    </td>
                    <td className="py-3 align-middle text-gray-700">{u.id}</td>
                    <td className="py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-200" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {u.name}
                          </div>
                          {u.email && (
                            <div className="text-xs text-gray-500">
                              {u.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 align-middle text-gray-700">
                      {u.phone}
                    </td>
                    <td className="py-3 align-middle text-gray-700">
                      {u.role}
                    </td>
                    <td className="py-3 align-middle text-gray-700">
                      {u.region || "--"}
                    </td>
                    <td className="py-3 align-middle">
                      <TableRowStatusCell status={u.status} />
                    </td>
                    <td className="py-3 pr-3 text-right align-middle">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem
                            className="text-rose-600"
                            onSelect={(e) => {
                              e.preventDefault();
                              handleDeleteClick(u.userId);
                            }}
                            disabled={
                              u.status === "banned" ||
                              deleteUserMutation.isPending ||
                              unarchiveUserMutation.isPending
                            }
                          >
                            Khóa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-emerald-600"
                            onSelect={(e) => {
                              e.preventDefault();
                              handleUnarchiveClick(u.userId);
                            }}
                            disabled={
                              (u.status !== "banned" &&
                                u.status !== "pending") ||
                              unarchiveUserMutation.isPending ||
                              deleteUserMutation.isPending
                            }
                          >
                            Mở khóa
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

        {/* Footer / pagination */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Số hàng mỗi trang</span>
            <Select value={String(limit)} onValueChange={handleLimitChange}>
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
          <div>
            {isLoading
              ? ""
              : `${(data?.pagination?.page ?? 1) * (data?.pagination?.limit ?? limit) - (data?.pagination?.limit ?? limit) + 1}-${Math.min((data?.pagination?.page ?? 1) * (data?.pagination?.limit ?? limit), data?.pagination?.totalItems ?? 0)} của ${data?.pagination?.totalItems ?? 0}`}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              ‹
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPage((p) => (data?.pagination?.hasNextPage ? p + 1 : p))
              }
              disabled={!data?.pagination?.hasNextPage}
            >
              ›
            </Button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận khóa tài khoản</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn khóa tài khoản người dùng này? Tài khoản sẽ
              bị chuyển sang trạng thái "Bị cấm" và có thể mở khóa lại sau.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={deleteUserMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteUserMutation.isPending}
              className="bg-rose-600 hover:bg-rose-700"
            >
              {deleteUserMutation.isPending ? "Đang khóa..." : "Khóa tài khoản"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unarchive Confirmation Dialog */}
      <Dialog open={unarchiveDialogOpen} onOpenChange={setUnarchiveDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận mở khóa tài khoản</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn mở khóa tài khoản người dùng này? Tài khoản
              sẽ được chuyển sang trạng thái "Hoạt động".
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleUnarchiveCancel}
              disabled={unarchiveUserMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={handleUnarchiveConfirm}
              disabled={unarchiveUserMutation.isPending}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              {unarchiveUserMutation.isPending ? "Đang mở khóa..." : "Mở khóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TableRowStatusCell({ status }: { status: string }) {
  if (status === "active")
    return (
      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
        Hoạt động
      </span>
    );
  if (status === "banned" || status === "archived")
    return (
      <span className="inline-flex rounded-full bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-600">
        Bị cấm
      </span>
    );
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
      Chờ duyệt
    </span>
  );
}

"use client";

import { MoreHorizontal, Printer, Upload, Download, Plus } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useUsers } from "@/shared/http/hooks/users";

type UserRow = {
  id: string;
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
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useUsers({
    page,
    limit,
    search: debouncedSearch || undefined,
  });
  const rows = useMemo<UserRow[]>(() => {
    return (data?.items || []).map((u) => ({
      id: u.id ? `#${u.id.slice(0, 4)}` : "--",
      name: u.fullName,
      email: (u as any)?.email || "",
      phone: u.phone,
      role: (u as any)?.role || "Người dùng",
      region: (u as any)?.region?.name || "",
      status:
        u.status === "archived"
          ? "banned"
          : u.status === "active"
            ? "active"
            : (u.status ?? "pending"),
    }));
  }, [data]);

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Tabs summary */}
      <div className="flex items-center gap-3 text-sm">
        <button className="rounded-full border px-3 py-1 font-medium">
          Tất cả <span className="ml-2 rounded-full bg-gray-100 px-2">80</span>
        </button>
        <button className="rounded-full border px-3 py-1 font-medium">
          Hoạt động{" "}
          <span className="ml-2 rounded-full bg-emerald-50 px-2 text-emerald-600">
            18
          </span>
        </button>
        <button className="rounded-full border px-3 py-1 font-medium">
          Bị cấm{" "}
          <span className="ml-2 rounded-full bg-rose-50 px-2 text-rose-600">
            11
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
          <Select>
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
                placeholder="Tìm kiếm..."
                className="h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" /> In
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" /> Nhập
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" /> Xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Button variant="destructive" size="sm" className="md:ml-2">
            Xóa
          </Button>
        </div>

        {/* Results summary chips */}
        <div className="mt-3 text-sm text-gray-600">
          {isLoading
            ? "Đang tải..."
            : `${data?.pagination?.totalItems ?? 0} kết quả được tìm thấy`}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <div>Vai trò: Đại diện khu vực</div>
          <div>Từ khóa: Keyword</div>
        </div>

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
              {rows.map((u, idx) => (
                <tr key={idx} className="border-b last:border-0">
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
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 align-middle text-gray-700">{u.phone}</td>
                  <td className="py-3 align-middle text-gray-700">{u.role}</td>
                  <td className="py-3 align-middle text-gray-700">
                    {u.region}
                  </td>
                  <td className="py-3 align-middle">
                    <TableRowStatusCell status={u.status} />
                  </td>
                  <td className="py-3 pr-3 text-right align-middle">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">
                          Xóa bỏ
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / pagination */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span>Số hàng mỗi trang</span>
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

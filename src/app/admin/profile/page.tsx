"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  type Case,
  type CaseStatus,
  type CreateCaseDto,
  type UpdateCaseDto,
  useCases,
  useCreateCase,
  useDeleteCase,
  useUpdateCase,
} from "@/shared/http/hooks/cases";
import { useOpportunities } from "@/shared/http/hooks/opportunities";
import { useReps } from "@/shared/http/hooks/reps";
import { useUsers } from "@/shared/http/hooks/users";

const STATUS_LABELS: Record<CaseStatus, string> = {
  pending: "Chờ xử lý",
  in_progress: "Đang xử lý",
  matched: "Hoàn thành",
  rejected: "Từ chối",
  done: "Hoàn thành",
};

const STATUS_COLORS: Record<CaseStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  in_progress: "bg-blue-100 text-blue-700",
  matched: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  done: "bg-green-100 text-green-700",
};

const caseSchema = z.object({
  userId: z.string().min(1, "Vui lòng chọn người dùng"),
  opportunityId: z.string().min(1, "Vui lòng chọn việc làm"),
  assignedRepId: z.string().optional(),
  status: z
    .enum(["pending", "in_progress", "matched", "rejected", "done"] as const)
    .optional(),
  notes: z.string().optional(),
});

type CaseFormValues = z.infer<typeof caseSchema>;

export default function ProfileAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: cases = [], isLoading } = useCases();
  const { data: usersData } = useUsers();
  const users = usersData?.items || [];
  const { data: opportunities = [] } = useOpportunities();
  const { data: repsData } = useReps();
  const reps = repsData?.items || [];

  const createMutation = useCreateCase();
  const updateMutation = useUpdateCase();
  const deleteMutation = useDeleteCase();

  const form = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      userId: "",
      opportunityId: "",
      assignedRepId: "",
      status: "pending",
      notes: "",
    },
  });

  const filteredCases = cases.filter(
    (c) =>
      c.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.opportunity?.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedByStatus = {
    all: filteredCases.length,
    pending: filteredCases.filter((c) => c.status === "pending").length,
    in_progress: filteredCases.filter((c) => c.status === "in_progress").length,
    matched: filteredCases.filter((c) => c.status === "matched").length,
    rejected: filteredCases.filter((c) => c.status === "rejected").length,
  };

  const handleCreate = async (values: CaseFormValues) => {
    try {
      const dto: CreateCaseDto = {
        userId: values.userId,
        opportunityId: values.opportunityId,
        assignedRepId: values.assignedRepId,
        status: values.status,
        notes: values.notes,
      };
      await createMutation.mutateAsync(dto);
      toast.success("Tạo hồ sơ thành công");
      setIsCreateOpen(false);
      form.reset();
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Tạo thất bại");
    }
  };

  const handleUpdate = async (values: CaseFormValues) => {
    if (!editingCase) return;
    try {
      const dto: UpdateCaseDto = {
        assignedRepId: values.assignedRepId || null,
        status: values.status,
        notes: values.notes,
      };
      await updateMutation.mutateAsync({ id: editingCase.id, dto });
      toast.success("Cập nhật hồ sơ thành công");
      setEditingCase(null);
      form.reset();
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Cập nhật thất bại");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Xóa hồ sơ thành công");
      setDeleteConfirm(null);
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Xóa thất bại");
    }
  };

  const openCreateDialog = () => {
    form.reset({
      userId: "",
      opportunityId: "",
      assignedRepId: "",
      status: "pending",
      notes: "",
    });
    setIsCreateOpen(true);
  };

  const openEditDialog = (caseRecord: Case) => {
    form.reset({
      userId: caseRecord.userId,
      opportunityId: caseRecord.opportunityId,
      assignedRepId: caseRecord.assignedRepId || "",
      status: caseRecord.status,
      notes: caseRecord.notes || "",
    });
    setEditingCase(caseRecord);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C1C1C]">Hồ sơ</h1>
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
              {groupedByStatus.matched}
            </span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Đang xử lý{" "}
            <span className="ml-1 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
              {groupedByStatus.in_progress}
            </span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Chờ xử lý{" "}
            <span className="ml-1 rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
              {groupedByStatus.pending}
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

        <div className="mb-4 text-sm text-gray-600">
          {filteredCases.length} kết quả được tìm thấy
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
                  <th className="pb-3 font-medium">Hồ sơ</th>
                  <th className="pb-3 font-medium">Tên</th>
                  <th className="pb-3 font-medium">Việc kết nối</th>
                  <th className="pb-3 font-medium">Đại diện khu vực</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                  <th className="pb-3 font-medium">Ngày tạo</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseRecord) => (
                  <tr key={caseRecord.id} className="border-b last:border-0">
                    <td className="py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3 text-sm text-blue-600">
                      <Link href={`/admin/profile/${caseRecord.id}`}>
                        #{caseRecord.id.slice(0, 4)}
                      </Link>
                    </td>
                    <td className="py-3 text-sm font-medium">
                      {caseRecord.user?.fullName || "N/A"}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {caseRecord.opportunity?.title || "N/A"}
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
                        )}
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
                            onClick={() => openEditDialog(caseRecord)}
                          >
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(caseRecord.id)}
                            className="text-red-600"
                          >
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
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

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tạo hồ sơ mới</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Người dùng</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn người dùng" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {users.map((u) => (
                          <SelectItem key={u.id} value={u.id}>
                            {u.fullName} ({u.phone})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="opportunityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Việc làm</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn việc làm" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {opportunities.map((opp) => (
                          <SelectItem key={opp.id} value={opp.id}>
                            {opp.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assignedRepId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đại diện phụ trách</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đại diện" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {reps.map((rep) => (
                          <SelectItem key={rep.id} value={rep.id}>
                            {rep.fullName} ({rep.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                        <SelectItem value="in_progress">Đang xử lý</SelectItem>
                        <SelectItem value="matched">
                          Kết nối thành công
                        </SelectItem>
                        <SelectItem value="rejected">Từ chối</SelectItem>
                        <SelectItem value="done">Hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập ghi chú" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  Tạo hồ sơ
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editingCase}
        onOpenChange={(open) => !open && setEditingCase(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="assignedRepId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đại diện phụ trách</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đại diện" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {reps.map((rep) => (
                          <SelectItem key={rep.id} value={rep.id}>
                            {rep.fullName} ({rep.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                        <SelectItem value="in_progress">Đang xử lý</SelectItem>
                        <SelectItem value="matched">
                          Kết nối thành công
                        </SelectItem>
                        <SelectItem value="rejected">Từ chối</SelectItem>
                        <SelectItem value="done">Hoàn thành</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ghi chú</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập ghi chú" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingCase(null)}
                >
                  Hủy
                </Button>
                <Button type="submit" disabled={updateMutation.isPending}>
                  Cập nhật
                </Button>
              </div>
            </form>
          </Form>
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
            Bạn có chắc chắn muốn xóa hồ sơ này không? Hành động này không thể
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

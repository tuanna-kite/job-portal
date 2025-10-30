"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical, Search } from "lucide-react";
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
  type CreateOpportunityDto,
  type Opportunity,
  type OpportunityLocationType,
  type OpportunityStatus,
  type UpdateOpportunityDto,
  useCreateOpportunity,
  useDeleteOpportunity,
  useOpportunities,
  useUpdateOpportunity,
} from "@/shared/http/hooks/opportunities";
import { usePartners } from "@/shared/http/hooks/partners";

const LOCATION_TYPE_LABELS: Record<OpportunityLocationType, string> = {
  remote: "Từ xa",
  hybrid: "Kết hợp",
  onsite: "Tại chỗ",
};

const STATUS_LABELS: Record<OpportunityStatus, string> = {
  open: "Đang mở",
  closed: "Đã đóng",
};

const opportunitySchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tên công việc"),
  partnerId: z.string().min(1, "Vui lòng chọn đối tác"),
  locationType: z.enum(["remote", "hybrid", "onsite"] as const),
  address: z.string().min(1, "Vui lòng nhập địa chỉ"),
  description: z.string().optional(),
  requirements: z.string().optional(),
  salaryRange: z.string().optional(),
  status: z.enum(["open", "closed"] as const).optional(),
});

type OpportunityFormValues = z.infer<typeof opportunitySchema>;

export default function JobsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Opportunity | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: jobs = [], isLoading } = useOpportunities();
  const { data: partnersData } = usePartners();
  const partners = partnersData?.items || [];
  const createMutation = useCreateOpportunity();
  const updateMutation = useUpdateOpportunity();
  const deleteMutation = useDeleteOpportunity();

  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunitySchema),
    defaultValues: {
      title: "",
      partnerId: "",
      locationType: "remote",
      address: "",
      description: "",
      requirements: "",
      salaryRange: "",
      status: "open",
    },
  });

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.partner?.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedByStatus = {
    all: filteredJobs.length,
    open: filteredJobs.filter((j) => j.status === "open").length,
    closed: filteredJobs.filter((j) => j.status === "closed").length,
  };

  const handleCreate = async (values: OpportunityFormValues) => {
    try {
      const dto: CreateOpportunityDto = {
        title: values.title,
        partnerId: values.partnerId,
        locationType: values.locationType,
        address: values.address,
        description: values.description,
        requirements: values.requirements,
        salaryRange: values.salaryRange,
      };
      await createMutation.mutateAsync(dto);
      toast.success("Tạo việc làm thành công");
      setIsCreateOpen(false);
      form.reset();
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Tạo thất bại");
    }
  };

  const handleUpdate = async (values: OpportunityFormValues) => {
    if (!editingJob) return;
    try {
      const dto: UpdateOpportunityDto = {
        title: values.title,
        partnerId: values.partnerId,
        locationType: values.locationType,
        address: values.address,
        description: values.description,
        requirements: values.requirements,
        salaryRange: values.salaryRange,
        status: values.status,
      };
      await updateMutation.mutateAsync({ id: editingJob.id, data: dto });
      toast.success("Cập nhật việc làm thành công");
      setEditingJob(null);
      form.reset();
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Cập nhật thất bại");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Xóa việc làm thành công");
      setDeleteConfirm(null);
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Xóa thất bại");
    }
  };

  const openCreateDialog = () => {
    form.reset({
      title: "",
      partnerId: "",
      locationType: "remote",
      address: "",
      description: "",
      requirements: "",
      salaryRange: "",
      status: "open",
    });
    setIsCreateOpen(true);
  };

  const openEditDialog = (job: Opportunity) => {
    form.reset({
      title: job.title,
      partnerId: job.partnerId,
      locationType: job.locationType,
      address: job.address,
      description: job.description || "",
      requirements: job.requirements || "",
      salaryRange: job.salaryRange || "",
      status: job.status,
    });
    setEditingJob(job);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C1C1C]">Việc làm</h1>
          <p className="text-sm text-gray-500">Bảng điều khiển • Việc làm</p>
        </div>
        <Button onClick={openCreateDialog} className="h-10 px-4">
          + Thêm việc làm
        </Button>
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
            Đang mở{" "}
            <span className="ml-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
              {groupedByStatus.open}
            </span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Đã đóng{" "}
            <span className="ml-1 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
              {groupedByStatus.closed}
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
          {filteredJobs.length} kết quả được tìm thấy
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
                  <th className="pb-3 font-medium">Đối tác</th>
                  <th className="pb-3 font-medium">Loại</th>
                  <th className="pb-3 font-medium">SL</th>
                  <th className="pb-3 font-medium">Thu nhập</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                  <th className="pb-3 font-medium">Ngày tạo</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="border-b last:border-0">
                    <td className="py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      #{job.id.slice(0, 4)}
                    </td>
                    <td className="py-3 text-sm font-medium">{job.title}</td>
                    <td className="py-3 text-sm text-gray-600">
                      {job.partner?.email || "N/A"}
                    </td>
                    <td className="py-3 text-sm">
                      {LOCATION_TYPE_LABELS[job.locationType]}
                    </td>
                    <td className="py-3 text-sm text-gray-600">5/10</td>
                    <td className="py-3 text-sm text-gray-600">
                      {job.salaryRange || "8 - 10 triệu"}
                    </td>
                    <td className="py-3 text-sm">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          job.status === "open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {STATUS_LABELS[job.status]}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {new Date(job.createdAt).toLocaleDateString("vi-VN")}
                      <br />
                      <span className="text-xs">
                        {new Date(job.createdAt).toLocaleTimeString("vi-VN")}
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
                          <DropdownMenuItem onClick={() => openEditDialog(job)}>
                            Sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(job.id)}
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
            <DialogTitle>Thêm việc làm</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên công việc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đối tác cung cấp</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đối tác" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {partners.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.email}
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
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại công việc" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="remote">Từ xa</SelectItem>
                        <SelectItem value="hybrid">Kết hợp</SelectItem>
                        <SelectItem value="onsite">Tại chỗ</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ làm việc</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khoảng thu nhập</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: 8 - 10 triệu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập mô tả công việc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yêu cầu công việc</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập yêu cầu" {...field} />
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
                  Tạo việc làm
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editingJob}
        onOpenChange={(open) => !open && setEditingJob(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Sửa việc làm</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên công việc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đối tác cung cấp</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn đối tác" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {partners.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.email}
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
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Loại</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại công việc" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="remote">Từ xa</SelectItem>
                        <SelectItem value="hybrid">Kết hợp</SelectItem>
                        <SelectItem value="onsite">Tại chỗ</SelectItem>
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
                        <SelectItem value="open">Đang mở</SelectItem>
                        <SelectItem value="closed">Đã đóng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ làm việc</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập địa chỉ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khoảng thu nhập</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: 8 - 10 triệu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập mô tả công việc" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Yêu cầu công việc</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập yêu cầu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingJob(null)}
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
            Bạn có chắc chắn muốn xóa việc làm này không? Hành động này không
            thể hoàn tác.
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

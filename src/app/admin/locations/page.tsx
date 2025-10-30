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
import {
  type CreateRegionDto,
  type Region,
  type RegionLevel,
  type UpdateRegionDto,
  useCreateRegion,
  useDeleteRegion,
  useRegions,
  useUpdateRegion,
} from "@/shared/http/hooks/regions";

const LEVEL_LABELS: Record<RegionLevel, string> = {
  province: "Thành phố",
  district: "Quận/Huyện",
  ward: "Phường/Xã",
  municipality: "Thành phố TW",
};

const regionSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên khu vực"),
  level: z.enum(["province", "district", "ward", "municipality"] as const),
  parentId: z.string().optional(),
});

type RegionFormValues = z.infer<typeof regionSchema>;

export default function LocationAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: regions = [], isLoading } = useRegions();
  const createMutation = useCreateRegion();
  const updateMutation = useUpdateRegion();
  const deleteMutation = useDeleteRegion();

  const form = useForm<RegionFormValues>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      name: "",
      level: "province",
      parentId: undefined,
    },
  });

  const filteredRegions = regions.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByLevel = {
    all: filteredRegions.length,
    province: filteredRegions.filter((r) => r.level === "province").length,
    district: filteredRegions.filter((r) => r.level === "district").length,
    ward: filteredRegions.filter((r) => r.level === "ward").length,
  };

  const handleCreate = async (values: RegionFormValues) => {
    try {
      const dto: CreateRegionDto = {
        name: values.name,
        level: values.level,
        parentId: values.parentId || undefined,
      };
      await createMutation.mutateAsync(dto);
      toast.success("Tạo khu vực thành công");
      setIsCreateOpen(false);
      form.reset();
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Tạo thất bại");
    }
  };

  const handleUpdate = async (values: RegionFormValues) => {
    if (!editingRegion) return;
    try {
      const dto: UpdateRegionDto = {
        name: values.name,
        level: values.level,
        parentId: values.parentId || null,
      };
      await updateMutation.mutateAsync({ id: editingRegion.id, data: dto });
      toast.success("Cập nhật khu vực thành công");
      setEditingRegion(null);
      form.reset();
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Cập nhật thất bại");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Xóa khu vực thành công");
      setDeleteConfirm(null);
    } catch (e: unknown) {
      const error = e as { message?: string };
      toast.error(error?.message || "Xóa thất bại");
    }
  };

  const openCreateDialog = () => {
    form.reset({
      name: "",
      level: "province",
      parentId: undefined,
    });
    setIsCreateOpen(true);
  };

  const openEditDialog = (region: Region) => {
    form.reset({
      name: region.name,
      level: region.level,
      parentId: region.parentId || undefined,
    });
    setEditingRegion(region);
  };

  const provinceRegions = regions.filter((r) => r.level === "province" || r.level === "municipality");

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1C1C1C]">Khu vực</h1>
          <p className="text-sm text-gray-500">Bảng điều khiển • Khu vực</p>
        </div>
        <Button onClick={openCreateDialog} className="h-10 px-4">
          + Thêm khu vực
        </Button>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="mb-4 flex gap-3 border-b">
          <button className="border-b-2 border-black px-4 pb-2 text-sm font-medium">
            Tất cả <span className="ml-1 rounded bg-black px-2 py-0.5 text-xs text-white">{groupedByLevel.all}</span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Xuất bản <span className="ml-1 rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">{groupedByLevel.province}</span>
          </button>
          <button className="px-4 pb-2 text-sm text-gray-600">
            Nháp <span className="ml-1 rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{groupedByLevel.district}</span>
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
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
          {filteredRegions.length} kết quả được tìm thấy
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-gray-500">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 font-medium">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </th>
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Tên</th>
                  <th className="pb-3 font-medium">Cấp độ</th>
                  <th className="pb-3 font-medium">Khu vực cha</th>
                  <th className="pb-3 font-medium">Ngày tạo</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredRegions.map((region) => (
                  <tr key={region.id} className="border-b last:border-0">
                    <td className="py-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      #{region.id.slice(0, 4)}
                    </td>
                    <td className="py-3 text-sm font-medium">{region.name}</td>
                    <td className="py-3 text-sm">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                        {LEVEL_LABELS[region.level]}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {region.parent?.name || "--"}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      12/01/2025<br />
                      <span className="text-xs">09:00 am</span>
                    </td>
                    <td className="py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <EllipsisVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(region)}>
                            Sửa
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(region.id)}
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Thêm khu vực</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreate)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khu vực" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp độ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="province">Thành phố</SelectItem>
                        <SelectItem value="district">Quận/Huyện</SelectItem>
                        <SelectItem value="ward">Phường/Xã</SelectItem>
                        <SelectItem value="municipality">Thành phố TW</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khu vực cha</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khu vực cha" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {provinceRegions.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  Tạo khu vực
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingRegion} onOpenChange={(open) => !open && setEditingRegion(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sửa khu vực</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khu vực" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp độ</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn cấp độ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="province">Thành phố</SelectItem>
                        <SelectItem value="district">Quận/Huyện</SelectItem>
                        <SelectItem value="ward">Phường/Xã</SelectItem>
                        <SelectItem value="municipality">Thành phố TW</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khu vực cha</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn khu vực cha" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-80">
                        {provinceRegions.map((r) => (
                          <SelectItem key={r.id} value={r.id}>
                            {r.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingRegion(null)}
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

      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            Bạn có chắc chắn muốn xóa khu vực này không? Hành động này không thể hoàn tác.
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

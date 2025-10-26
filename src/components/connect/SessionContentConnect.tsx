"use client";

import { CalendarDays, Send } from 'lucide-react';
import React, { useState } from "react";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function SessionContentConnect() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    gender: '',
    dob: '',
    disability: '',
    skills: '',
    ward: '',
    address: '',
    need: '',
    consent: false,
  });

  const handleChange = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="h-max bg-white py-[30px] md:py-[70px]">
      <div className="mx-auto w-full max-w-[1280px] rounded-3xl overflow-hidden relative px-6 md:px-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1C1C1C]">Khởi tạo hồ sơ</h1>
        <p className="text-[#637381] mt-3 mb-10 text-base md:text-lg">
          Cung cấp thông tin chi tiết về kỹ năng và nhu cầu để chúng tôi kết nối bạn với Đại diện khu vực.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Thông tin định danh */}
          <div>
            <h2 className="font-semibold text-lg text-[#1C1C1C] mb-4">Thông tin định danh</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Họ tên đầy đủ" value={form.name} onChange={e => handleChange('name', e.target.value)} />
              <Input placeholder="Điện thoại liên hệ" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Select onValueChange={(val: string) => handleChange('gender', val)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Nam</SelectItem>
                  <SelectItem value="female">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative">
                <Input
                  type="date"
                  className="pr-10 border border-gray-300 rounded-lg"
                  onChange={e => handleChange('dob', e.target.value)}
                />
                <CalendarDays className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              <Select onValueChange={(val: string) => handleChange('disability', val)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn loại khuyết tật chính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hearing">Nghe / Nói</SelectItem>
                  <SelectItem value="vision">Thị giác</SelectItem>
                  <SelectItem value="mobility">Vận động</SelectItem>
                  <SelectItem value="mental">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4">
              <Input
                placeholder="Các kỹ năng hiện có"
                value={form.skills}
                onChange={e => handleChange('skills', e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <Select onValueChange={(val: string) => handleChange('ward', val)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Chọn phường" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phuong1">Phường 1</SelectItem>
                  <SelectItem value="phuong2">Phường 2</SelectItem>
                  <SelectItem value="phuong3">Phường 3</SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Nhập địa chỉ cụ thể"
                value={form.address}
                onChange={e => handleChange('address', e.target.value)}
              />
            </div>
          </div>

          {/* Nhu cầu hỗ trợ */}
          <div>
            <h2 className="font-semibold text-lg text-[#1C1C1C] mb-4">Nhu cầu hỗ trợ</h2>
            <Select onValueChange={(val: string) => handleChange('need', val)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Chọn nhu cầu hỗ trợ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="job">Tìm việc làm</SelectItem>
                <SelectItem value="education">Học nghề</SelectItem>
                <SelectItem value="medical">Hỗ trợ y tế</SelectItem>
                <SelectItem value="fund">Hỗ trợ tài chính</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Xác nhận */}
          <div className="flex items-start gap-3">
            <Checkbox
              checked={form.consent}
              onCheckedChange={val => handleChange('consent', !!val)}
              id="consent"
            />
            <label htmlFor="consent" className="text-sm text-[#637381] leading-relaxed">
              Tôi đồng ý để Việc Lành sử dụng thông tin trên để khởi tạo hồ sơ và gắn Đại diện khu vực hỗ trợ tìm việc.
            </label>
          </div>

          {/* Nút gửi */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#6941C6] hover:bg-[#5A37AD] text-white rounded-full px-6 py-5"
            >
              Gửi yêu cầu <Send className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

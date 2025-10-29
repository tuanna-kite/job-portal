"use client";

import {
  Home,
  User,
  BookOpen,
  Heart,
  Star,
  AlertCircle,
  ShoppingCart,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils"; // Optional helper

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const activePath = "Tổng quan"; // Replace with route match logic

  const menuItems = [
    { label: "Tổng quan", icon: <Home size={18} /> },
    { label: "Hồ sơ", icon: <User size={18} /> },
    { label: "Khóa học đã đăng ký", icon: <BookOpen size={18} /> },
    { label: "Yêu thích", icon: <Heart size={18} /> },
    { label: "Đánh giá", icon: <Star size={18} /> },
    { label: "Điểm kiểm tra", icon: <AlertCircle size={18} /> },
    { label: "Lịch sử mua hàng", icon: <ShoppingCart size={18} /> },
    { label: "Cài đặt", icon: <Settings size={18} /> },
  ];

  return (
    <div>
      <Drawer
        direction="right"
        open={open}
        onOpenChange={setOpen}
        onClose={() => {}}
      >
        <DrawerTrigger>
          <Image
            src="/avatar.png"
            alt="Avatar"
            width={40}
            height={40}
            className="h-10 w-10 cursor-pointer rounded-full"
          />
        </DrawerTrigger>

        <DrawerContent className="flex h-full w-[320px] flex-col justify-between rounded-none bg-white p-4 shadow-md">
          <div>
            {/* Nút đóng Drawer */}
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-muted absolute top-4 left-4 rounded-full p-1 transition"
              aria-label="Đóng menu"
            >
              <X size={20} />
            </button>

            {/* Avatar & Info */}
            <div className="flex flex-col items-center py-4">
              <Image
                src="/avatar.png"
                alt="Avatar"
                width={64}
                height={64}
                className="rounded-full border-4 border-red-200"
              />
              <h3 className="mt-2 text-sm font-semibold">Chris Hemsworth</h3>
              <p className="text-muted-foreground text-xs">
                demo@lichsukythu.cc
              </p>
            </div>

            <div className="my-4 border-t" />

            {/* Menu Items */}
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition",
                    activePath === item.label
                      ? "text-destructive bg-red-50 font-semibold"
                      : "hover:bg-accent hover:text-foreground text-muted-foreground",
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <DrawerFooter className="pt-6">
            <Button
              variant="destructive"
              className="h-10 w-full rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
            >
              <LogOut size={16} className="mr-2" />
              Đăng xuất
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserButton;

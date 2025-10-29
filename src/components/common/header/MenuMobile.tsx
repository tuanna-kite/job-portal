"use client";

import { clsx } from "clsx";
import { ArrowLeft2, HambergerMenu } from "iconsax-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { logoWhite } from "@/contants/images";

export const MenuMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [menuStep, setMenuStep] = useState<"main" | "account">("account");
  const [open, setOpen] = useState(false);

  const handleNavigateToHome = () => {
    router.push("/");
  };

  const handleRoute = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const listExplore = [
    "Việt Nam Tiền Sử",
    "Việt Nam thời Kỷ Dựng Nước",
    "Việt Nam Thời Bắc Thuộc",
    "Việt Nam thời kỳ chống Bắc Thuộc",
    "Việt Nam Thời Phong Kiến Độc Lập",
    "Việt Nam Cận Hiện Đại",
  ];

  const listChallenge = ["Câu hỏi vui", "Sắp xếp", "Ghép hình", "Điền từ"];

  const listMainMenu = [
    {
      label: "Tổng quan",
      href: "/",
      onClick: () => handleRoute("/"),
    },
    {
      label: "Hồ sơ",
      href: "/",
      onClick: () => handleRoute("/"),
    },
    {
      label: "Khoá học đã đăng ký",
      href: "/",
      onClick: () => handleRoute("/"),
    },
    {
      label: "Cài đặt",
      onClick: () => {},
    },
  ];

  return (
    <Drawer
      direction="left"
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) setMenuStep("main");
      }}
    >
      <DrawerTrigger>
        <HambergerMenu variant="Broken" size={24} color="#637381" />
      </DrawerTrigger>
      <DrawerContent className="h-full w-[320px] overflow-y-auto rounded-none bg-white shadow-md">
        <DrawerTitle className="sr-only">menu</DrawerTitle>

        <div className="w-full p-4">
          <Image
            src={logoWhite}
            alt="Logo"
            width={127}
            height={40}
            onClick={handleNavigateToHome}
          />
        </div>

        {/* === Account View === */}
        {menuStep === "account" && (
          <div className="p-4">
            <div
              onClick={() => setMenuStep("main")}
              className="mb-4 flex w-full items-center gap-2 rounded-md bg-[#919EAB14] px-3 py-6 hover:bg-gray-100"
            >
              <ArrowLeft2 size="16" color="#333" />
              <p>Menu</p>
            </div>

            <div className="mb-2 text-xs font-semibold text-gray-500 uppercase">
              Cá nhân
            </div>
            {listMainMenu.map((item, i) => (
              <Button
                key={i}
                variant="ghost"
                className={clsx(
                  "w-full justify-start rounded-md text-sm",
                  pathname === item.href &&
                    "bg-red-100 font-semibold text-red-500",
                )}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {/* === Main Menu === */}
        {menuStep === "main" && (
          <div className="space-y-4 p-4">
            <h1 className="mb-2 text-xs font-semibold text-gray-500 uppercase">
              Thử thách
            </h1>
            <div className="mb-4 flex flex-col gap-2">
              {listChallenge.map((label, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start rounded-md text-sm"
                >
                  {label}
                </Button>
              ))}
            </div>

            <h1 className="mb-2 text-xs font-semibold text-gray-500 uppercase">
              Khám phá
            </h1>
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-md bg-red-100 text-sm font-semibold text-red-500"
              >
                Việt Nam Tiền Sử
              </Button>
              {listExplore.slice(1).map((item, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  className="w-full justify-start rounded-md text-sm"
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )}

        <DrawerFooter className="mb-6">
          <>
            <Button variant="ghost" className="w-full">
              Đăng nhập
            </Button>
            <Button className="bg-primary-main w-full text-white">
              Bắt đầu miễn phí
            </Button>
          </>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

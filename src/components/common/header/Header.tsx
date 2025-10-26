"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ERouteTable } from "@/contants/route";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { href: ERouteTable.ROOT, label: "Trang chủ" },
    { href: ERouteTable.ABOUT_US, label: "Giới thiệu" },
    { href: ERouteTable.EXPLORE, label: "Liên hệ" },
    { href: ERouteTable.SURVEY, label: "Tra cứu hồ sơ" },
  ];

  useEffect(() => {
    router.prefetch("/explore");
  }, [router]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 30);
    handleScroll(); // chạy 1 lần để set đúng khi reload giữa trang
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Chọn logo theo trạng thái scroll
  const desktopLogoSrc = !scrolled
    ? "/images/auth/logo-white.png"
    : "/images/auth/logo-app.png";
  const mobileLogoSrc = !scrolled
    ? "/images/auth/logo-white.png"
    : "/images/auth/logo-app.png";

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-200 ease-in-out ${
        scrolled
          ? "bg-white/90 shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-19 items-center md:justify-evenly justify-between">
          <Link
            href={ERouteTable.ROOT}
            className="flex items-center"
            aria-label="job-portal"
          >
            <div className="hidden md:block">
              <Image
                src={desktopLogoSrc}
                alt="job-portal"
                width={160}
                height={32}
                priority
              />
            </div>
            <div className="block md:hidden">
              <Image
                src={mobileLogoSrc}
                alt="job-portal"
                width={160}
                height={32}
                priority
              />
            </div>
          </Link>

          <nav className="hidden items-center space-x-8 md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                onMouseEnter={() => router.prefetch(item.href)}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-2 text-base font-medium transition-colors ${
                  scrolled
                    ? pathname === item.href
                      ? "font-semibold text-[#212B36]"
                      : "text-[#637381] hover:text-[#212B36]"
                    : pathname === item.href
                      ? "font-semibold text-white"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

          </nav>
          <div className="md:flex flex-col justify-center gap-4 md:flex-row hidden">
            <Button
              variant="default"
              className="mx-auto w-fit rounded-lg border border-white bg-transparent px-6 py-3 md:mx-0"
              onClick={() => router.push(ERouteTable.EXPLORE)}
            >
              Đăng nhập
            </Button>
            <Button
              className="bg-primary-main mx-auto w-fit rounded-lg px-6 py-3 md:mx-0"
              onClick={() => router.push(ERouteTable.SURVEY)}
            >
              Nhận hỗ trợ
            </Button>
          </div>


          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2"
              aria-label="Open menu"
            >
              <Menu
                className={`h-6 w-6 ${scrolled ? "text-[#212B36]" : "text-white"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-dashed border-[#919EAB3D] px-4 py-4">
          <div className="flex items-center">
            {/* Drawer luôn nền trắng => dùng logo màu */}
            <Image
              src="/images/auth/logo-app.png"
              alt="job-portal"
              width={167}
              height={36}
            />
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6 text-[#212B36]" />
          </button>
        </div>

        <nav className="space-y-4 px-4 py-6">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              onMouseEnter={() => router.prefetch(item.href)}
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-2 text-base font-medium ${
                pathname === item.href
                  ? "text-[#212B36]"
                  : "text-[#637381] hover:text-[#212B36]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  pathname === item.href ? "bg-[#FF8E1A]" : "bg-transparent"
                }`}
              />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-4 px-4">
          <Button
            variant="default"
            className="mx-auto w-full rounded-lg border border-gray-900/25 text-primary bg-transparent px-6 py-3 md:mx-0"
            onClick={() => router.push(ERouteTable.EXPLORE)}
          >
            Đăng nhập
          </Button>
          <Button
            className="bg-primary-main mt-2 mx-auto w-full rounded-lg px-6 py-3 md:mx-0"
            onClick={() => router.push(ERouteTable.SURVEY)}
          >
            Nhận hỗ trợ
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </motion.nav>
  );
};

export default Header;

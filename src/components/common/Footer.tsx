import Image from "next/image";
import Link from "next/link";
import React from "react";

import { logoFooter } from "@/contants/images";

function Footer() {
  return (
    <footer className="bg-[#13171F] text-white">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Cột trái - logo + mô tả */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <Image src={logoFooter} alt="Việc Lành" width={200} height={40} />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-[#EAEAEA]">
              Bạn có năng lực, chúng tôi có giải pháp. Hệ thống độc quyền giúp
              hàng ngàn người khuyết tật tại Việt Nam tiếp cận cơ hội làm việc,
              học nghề, và nhận hỗ trợ sinh kế ngay tại địa phương.
            </p>
          </div>

          {/* Cột giữa */}
          <div className="flex flex-col gap-3 text-sm text-[#EAEAEA]">
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-white"
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              className="transition-colors duration-200 hover:text-white"
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className="transition-colors duration-200 hover:text-white"
            >
              Liên hệ
            </Link>
            <Link
              href="/search-contract"
              className="transition-colors duration-200 hover:text-white"
            >
              Tra cứu hồ sơ
            </Link>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col gap-3 text-sm text-[#EAEAEA]">
            <Link
              href="/contact"
              className="transition-colors duration-200 hover:text-white"
            >
              Trở thành đại diện
            </Link>
            <Link
              href="/contact"
              className="transition-colors duration-200 hover:text-white"
            >
              Trở thành đối tác
            </Link>
            <Link
              href="/term"
              className="transition-colors duration-200 hover:text-white"
            >
              Điều khoản & Điều kiện
            </Link>
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Chính sách bảo mật
            </Link>
          </div>
        </div>

        {/* Line */}
        <div className="my-8 border-t border-[#2B2F36]"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-[#A6A6A6]">
          © 2025 Việc Lành
        </div>
      </div>
    </footer>
  );
}

export default Footer;

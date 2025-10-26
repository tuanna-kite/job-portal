import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { logoFooter } from "@/contants/images";

function Footer() {
  return (
    <footer className="bg-[#13171F] text-white">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột trái - logo + mô tả */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <Image
                src={logoFooter}
                alt="Việc Lành"
                width={200}
                height={40}
              />
            </div>
            <p className="text-[#EAEAEA] text-sm leading-relaxed mt-6">
              Bạn có năng lực, chúng tôi có giải pháp. Hệ thống độc quyền giúp hàng
              ngàn người khuyết tật tại Việt Nam tiếp cận cơ hội làm việc, học nghề,
              và nhận hỗ trợ sinh kế ngay tại địa phương.
            </p>
          </div>

          {/* Cột giữa */}
          <div className="flex flex-col gap-3 text-[#EAEAEA] text-sm">
            <Link
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Trang chủ
            </Link>
            <Link
              href="/about"
              className="hover:text-white transition-colors duration-200"
            >
              Giới thiệu
            </Link>
            <Link
              href="/contact"
              className="hover:text-white transition-colors duration-200"
            >
              Liên hệ
            </Link>
            <Link
              href="/tracking"
              className="hover:text-white transition-colors duration-200"
            >
              Tra cứu hồ sơ
            </Link>
          </div>

          {/* Cột phải */}
          <div className="flex flex-col gap-3 text-[#EAEAEA] text-sm">
            <Link
              href="/representative"
              className="hover:text-white transition-colors duration-200"
            >
              Trở thành đại diện
            </Link>
            <Link
              href="/partner"
              className="hover:text-white transition-colors duration-200"
            >
              Trở thành đối tác
            </Link>
            <Link
              href="/terms"
              className="hover:text-white transition-colors duration-200"
            >
              Điều khoản & Điều kiện
            </Link>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Chính sách bảo mật
            </Link>
          </div>
        </div>

        {/* Line */}
        <div className="border-t border-[#2B2F36] my-8"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-[#A6A6A6]">
          © 2025 Việc Lành
        </div>
      </div>
    </footer>
  );
}

export default Footer;

"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-4 text-4xl font-bold text-gray-800">Oops!</h1>
      <p className="mb-6 text-gray-600">
        Xin lỗi, chúng tôi không tìm thấy trang bạn đang tìm kiếm.
      </p>
      <Link
        href="/"
        className="rounded bg-red-600 px-6 py-2 text-white transition-colors hover:bg-red-700"
      >
        ← Về trang chủ
      </Link>
    </div>
  );
}

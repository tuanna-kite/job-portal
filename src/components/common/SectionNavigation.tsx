"use client";

import { SmoothScrollLink } from "./SmoothScroll";

const navigationItems = [
  { id: "hero", label: "Trang chủ" },
  { id: "description", label: "Giới thiệu" },
  { id: "courses", label: "Khóa học" },
  { id: "challenges", label: "Thử thách" },
  { id: "feedback", label: "Phản hồi" },
  { id: "contact", label: "Liên hệ" },
  { id: "about", label: "Về chúng tôi" },
];

export default function SectionNavigation() {
  return (
    <nav className="hidden space-x-6 md:flex">
      {navigationItems.map((item) => (
        <SmoothScrollLink
          key={item.id}
          href={`#${item.id}`}
          className="hover:text-primary-main font-medium text-gray-700 transition-colors duration-300"
        >
          {item.label}
        </SmoothScrollLink>
      ))}
    </nav>
  );
}

// Component cho mobile menu
export function MobileSectionNavigation() {
  return (
    <div className="flex flex-col space-y-4 py-4">
      {navigationItems.map((item) => (
        <SmoothScrollLink
          key={item.id}
          href={`#${item.id}`}
          className="hover:text-primary-main py-2 font-medium text-gray-700 transition-colors duration-300"
        >
          {item.label}
        </SmoothScrollLink>
      ))}
    </div>
  );
}

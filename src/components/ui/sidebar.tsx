"use client";

import {
  Category2,
  UserSquare,
  CloseSquare,
  Location,
  Briefcase,
  FolderOpen,
  MessageText1,
} from "iconsax-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { logoMini } from "@/contants/images";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onTabChange?: (tab: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, onTabChange, isOpen = true, onToggle, ...props }, ref) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobile, setIsMobile] = React.useState(false);

    // Check if we're on mobile
    React.useEffect(() => {
      const checkMobile = () => {
        const mobile = window.innerWidth < 1024;
        const wasMobile = isMobile;
        setIsMobile(mobile);

        // Only auto-close sidebar when transitioning from desktop to mobile
        // and sidebar was already open on desktop
        if (mobile && !wasMobile && isOpen && onToggle) {
          onToggle();
        }
      };

      checkMobile();
      window.addEventListener("resize", checkMobile);

      return () => window.removeEventListener("resize", checkMobile);
    }, [isMobile, isOpen, onToggle]);

    const menuItems = [
      {
        section: "TỔNG QUAN",
        items: [
          {
            id: "dashboard",
            label: "Bảng điều khiển",
            icon: Category2,
            href: "/admin",
          },
        ],
      },
      {
        section: "QUẢN LÝ",
        items: [
          {
            id: "users",
            label: "Người dùng",
            icon: UserSquare,
            href: "/admin/users",
          },
          {
            id: "locations",
            label: "Khu vực",
            icon: Location,
            href: "/admin/locations",
          },
          {
            id: "jobs",
            label: "Việc làm",
            icon: Briefcase,
            href: "/admin/jobs",
          },
          {
            id: "profile",
            label: "Hồ sơ",
            icon: FolderOpen,
            href: "/admin/profile",
          },
          {
            id: "support",
            label: "Yêu cầu hỗ trợ",
            icon: MessageText1,
            href: "/admin/support",
          },
        ],
      },
    ];

    const handleNavigation = (href: string, itemId: string) => {
      router.push(href);
      onTabChange?.(itemId);

      // Close sidebar on mobile after navigation
      if (isMobile && onToggle) {
        // Small delay to let the navigation happen first
        setTimeout(() => {
          onToggle();
        }, 150);
      }
    };

    const isActiveRoute = (href: string) => {
      return pathname === href;
    };

    // Handle escape key to close sidebar
    React.useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen && isMobile && onToggle) {
          onToggle();
        }
      };

      if (isOpen && isMobile) {
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
      }
    }, [isOpen, isMobile, onToggle]);

    // Prevent body scroll when sidebar is open on mobile
    React.useEffect(() => {
      if (isMobile && isOpen) {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "unset";
        };
      }
    }, [isMobile, isOpen]);

    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && isMobile && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onToggle}
          />
        )}

        {/* Sidebar */}
        <div
          ref={ref}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r border-gray-200 bg-gray-50 lg:relative",
            // Smooth transition for all screen sizes
            "transition-transform duration-300 ease-in-out",
            // Mobile: Transform based on isOpen state
            !isOpen && "-translate-x-full lg:translate-x-0",
            // Desktop: Show/hide based on isOpen state
            !isOpen && "lg:hidden",
            className,
          )}
          {...props}
        >
          {/* Header with Toggle Button */}
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
            <Image
              src={logoMini}
              alt="Logo"
              width={176}
              height={40}
              className="w-44 cursor-pointer"
              onClick={() => router.push("/")}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <CloseSquare size="20" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
            {menuItems.map((section) => (
              <div key={section.section} className="space-y-2">
                <h3 className="px-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                  {section.section}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.href);

                    return (
                      <div key={item.id} className="space-y-1">
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          className={cn(
                            "h-10 w-full cursor-pointer justify-start px-3",
                            isActive
                              ? "bg-[#6A62FF14] text-[#6A62FF] hover:bg-[#6A62FF14]"
                              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                          )}
                          onClick={() => {
                            handleNavigation(item.href, item.id);
                          }}
                        >
                          <Icon
                            size="32"
                            variant="Bulk"
                            color={isActive ? "#6A62FF" : "#637381"}
                            className="mr-3"
                          />
                          {item.label}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </>
    );
  },
);
Sidebar.displayName = "Sidebar";

export { Sidebar };

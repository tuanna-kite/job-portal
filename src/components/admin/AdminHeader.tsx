"use client";

import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onToggleSidebar?: () => void;
}

const AdminHeader = React.forwardRef<HTMLDivElement, AdminHeaderProps>(
  ({ className, onToggleSidebar, ...props }, ref) => {
    const router = useRouter();

    return (
      <div
        ref={ref}
        className={cn(
          "flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6",
          className,
        )}
        {...props}
      >
        {/* Left side - Toggle button and Search */}
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle Button - Always visible for better UX */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
            className="transition-colors hover:bg-gray-100"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </Button>
        </div>

        {/* Right side - Actions */}
        <div
          onClick={() => {
            router.push("/login");
          }}
          className="bg-primary-main cursor-pointer rounded-md px-3 py-1.5 font-semibold text-white"
        >
          Đăng xuất
        </div>
      </div>
    );
  },
);
AdminHeader.displayName = "AdminHeader";

export { AdminHeader };

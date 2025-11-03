"use client";

import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

import { AdminProfileModal } from "@/components/admin/AdminProfileModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAdminProfile } from "@/shared/http/hooks/auth";
import { useAuthStore } from "@/store/auth";

interface AdminHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onToggleSidebar?: () => void;
}

const AdminHeader = React.forwardRef<HTMLDivElement, AdminHeaderProps>(
  ({ className, onToggleSidebar, ...props }, ref) => {
    const router = useRouter();
    const { signOut, user, email } = useAuthStore();
    const { data: profile } = useAdminProfile();
    const [isProfileOpen, setIsProfileOpen] = React.useState(false);

    const handleLogout = () => {
      signOut();
      router.push("/login");
    };

    return (
      <>
        <div
          ref={ref}
          className={cn(
            "flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6",
            className,
          )}
          {...props}
        >
          {/* Left side - Toggle button */}
          <div className="flex items-center space-x-4">
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
          <div className="flex items-center gap-3">
            {/* Notification Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="relative transition-colors hover:bg-gray-100"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            {/* Avatar */}
            <div
              onClick={() => setIsProfileOpen(true)}
              className="relative h-10 w-10 cursor-pointer overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shadow-md transition-transform hover:scale-105"
            >
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                  {(profile?.email?.[0] ||
                    user?.email?.[0] ||
                    email?.[0] ||
                    "A"
                  ).toUpperCase()}
                </div>
              )}
            </div>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              className="bg-primary-main hover:bg-primary-main/90"
            >
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Profile Modal */}
        <AdminProfileModal
          open={isProfileOpen}
          onOpenChange={setIsProfileOpen}
        />
      </>
    );
  },
);
AdminHeader.displayName = "AdminHeader";

export { AdminHeader };

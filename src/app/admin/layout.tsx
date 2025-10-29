"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { AdminHeader } from "@/components/admin/AdminHeader";
import { Sidebar } from "@/components/ui/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Start closed on mobile

  // Set initial sidebar state based on screen size
  React.useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setIsSidebarOpen(isDesktop);
    };

    // Set initial state
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getActiveTab = () => {
    if (pathname === "/admin") return "dashboard";
    if (pathname.startsWith("/admin/users")) return "users";
    if (pathname.startsWith("/admin/locations")) return "locations";
    if (pathname.startsWith("/admin/jobs")) return "jobs";
    if (pathname.startsWith("/admin/profile")) return "profile";
    if (pathname.startsWith("/admin/support")) return "support";
    if (pathname.startsWith("/admin/account")) return "account";
    return "dashboard";
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case "dashboard":
        router.push("/admin");
        break;
      case "users":
        router.push("/admin/users");
        break;
      case "locations":
        router.push("/admin/locations");
        break;
      case "jobs":
        router.push("/admin/jobs");
        break;
      case "profile":
        router.push("/admin/profile");
        break;
      case "support":
        router.push("/admin/support");
        break;
      case "account":
        router.push("/admin/account");
        break;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeTab={getActiveTab()}
        onTabChange={handleTabChange}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader onToggleSidebar={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

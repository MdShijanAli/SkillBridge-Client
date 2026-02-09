"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default function AdminDashboardLayout({
  userData,
  children,
}: {
  userData?: any;
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        userData={userData}
      />

      {/* Main Content */}
      <div
        className="transition-all duration-300 lg:ml-64"
        style={{
          marginLeft:
            typeof window !== "undefined" && window.innerWidth >= 1024
              ? sidebarCollapsed
                ? "5rem"
                : "16rem"
              : "0",
        }}
      >
        <AdminTopbar
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
          userData={userData}
        />

        {/* Page Content */}
        <main className="p-3">{children}</main>
      </div>
    </div>
  );
}

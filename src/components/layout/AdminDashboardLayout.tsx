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
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed ? "5rem" : "16rem",
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

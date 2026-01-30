"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Tag,
  BarChart3,
  MessageSquare,
  Shield,
  Settings,
  ChevronLeft,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users, badge: "12" },
  { name: "Tutors", href: "/admin/tutors", icon: GraduationCap },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar, badge: "5" },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Reports", href: "/admin/reports", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 h-screen bg-card border-r border-border/50 transition-all duration-300 flex-col z-40 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo & Toggle */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gradient-primary">
                SkillBridge
              </span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className={`${collapsed ? "mx-auto" : ""}`}
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all group ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="font-medium flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="ml-auto bg-primary/20 text-primary border-0"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        {!collapsed && (
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Admin User
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@skillbridge.com
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-50 transition-opacity ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onMobileClose}
      >
        <aside
          className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border/50 transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gradient-primary">
                SkillBridge
              </span>
            </Link>
            <Button variant="ghost" size="sm" onClick={onMobileClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                  onClick={onMobileClose}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary border-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile User Profile */}
          <div className="p-4 border-t border-border/50">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Admin User
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  admin@skillbridge.com
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

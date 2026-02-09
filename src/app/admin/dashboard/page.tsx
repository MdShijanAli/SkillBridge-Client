"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  Eye,
  Pencil,
  Plus,
  User,
  Lock,
} from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  users,
  bookings,
  categories as initialCategories,
  tutors,
  Category,
} from "@/lib/data";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import Link from "next/link";
import StatCard from "@/components/dashboard/StatCard";
import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  icon: z.string().min(1, "Icon is required").max(10),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(100),
  tutorCount: z.coerce.number().min(0, "Must be 0 or more"),
});

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [categoriesData, setCategoriesData] =
    useState<Category[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: dashboardData } = useQuery(apiRoutes.dashboard.adminStats);

  console.log("Dashboard Data:", dashboardData?.data);

  const form = useForm({
    defaultValues: {
      name: "",
      icon: "",
      description: "",
      tutorCount: 0,
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      if (editingCategory) {
        // Update existing category
        setCategoriesData((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id ? { ...cat, ...value } : cat,
          ),
        );
        toast.success("Category Updated", {
          description: `${value.name} has been updated successfully.`,
        });
      } else {
        // Add new category
        const newCategory: Category = {
          id: `cat-${Date.now()}`,
          name: value.name,
          icon: value.icon,
          description: value.description,
          tutorCount: value.tutorCount,
        };
        setCategoriesData((prev) => [...prev, newCategory]);
        toast.success("Category Added", {
          description: `${value.name} has been added successfully.`,
        });
      }
      setIsDialogOpen(false);
      setEditingCategory(null);
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleUserAction = (
    action: string,
    userId: string,
    userName: string,
  ) => {
    toast.success(`User ${action}`, {
      description: `${userName} has been ${action}.`,
    });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    form.setFieldValue("name", category.name);
    form.setFieldValue("icon", category.icon);
    form.setFieldValue("description", category.description);
    form.setFieldValue("tutorCount", category.tutorCount);
    setIsDialogOpen(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    form.setFieldValue("name", "");
    form.setFieldValue("icon", "📚");
    form.setFieldValue("description", "");
    form.setFieldValue("tutorCount", 0);
    setIsDialogOpen(true);
  };

  return (
    <div className="">
      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Total Users"
              value={dashboardData?.data?.totalUsers || 0}
              icon={Users}
            />
            <StatCard
              title="Active Tutors"
              value={dashboardData?.data?.totalTutors || 0}
              icon={Users}
            />
            <StatCard
              title="Total Bookings"
              value={dashboardData?.data?.totalBookings || 0}
              icon={Calendar}
            />
            <StatCard
              title="Total Revenue"
              value={`$${dashboardData?.data?.totalEarnings || 0}`}
              icon={DollarSign}
            />
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Recent Users
              </h3>
              <div className="space-y-3">
                {dashboardData?.data?.recentUsers?.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.image} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    <Badge variant="secondary">{user.role}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Recent Bookings
              </h3>
              <div className="space-y-3">
                {dashboardData?.data?.recentBookings
                  ?.slice(0, 5)
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {booking?.student?.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          with {booking?.tutor?.name} • {booking?.subject}
                        </p>
                      </div>
                      <Badge
                        className={
                          booking.status === "confirmed"
                            ? "badge-confirmed"
                            : booking.status === "completed"
                              ? "badge-completed"
                              : "badge-cancelled"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

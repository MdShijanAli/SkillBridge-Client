"use client";

import { useState } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  MoreVertical,
  Ban,
  CheckCircle,
  Eye,
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
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

  const students = users.filter((u) => u.role === "student");
  const tutorUsers = users.filter((u) => u.role === "tutor");
  const totalRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.price, 0);

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
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden mb-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard
              title="Total Users"
              value={users.length}
              change="+12% from last month"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Active Tutors"
              value={tutorUsers.length}
              change="+5 this week"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Total Bookings"
              value={bookings.length}
              icon={Calendar}
            />
            <StatCard
              title="Total Revenue"
              value={`$${totalRevenue}`}
              change="+18% from last month"
              changeType="positive"
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
                {users.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} />
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
                {bookings.slice(0, 5).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {booking.studentName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        with {booking.tutorName} • {booking.subject}
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

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="glass-card rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.status === "active"
                            ? "badge-completed"
                            : "badge-cancelled"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.createdAt}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleUserAction("viewed", user.id, user.name)
                            }
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUserAction("banned", user.id, user.name)
                              }
                              className="text-destructive"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Ban User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() =>
                                handleUserAction("unbanned", user.id, user.name)
                              }
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Unban User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="glass-card rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Tutor</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.studentAvatar} />
                        <AvatarFallback>
                          {booking.studentName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{booking.studentName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.tutorAvatar} />
                        <AvatarFallback>{booking.tutorName[0]}</AvatarFallback>
                      </Avatar>
                      <span>{booking.tutorName}</span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.subject}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {booking.date} at {booking.time}
                  </TableCell>
                  <TableCell className="font-medium">
                    ${booking.price}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Categories Tab */}
      {activeTab === "categories" && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button onClick={handleAddCategory} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categoriesData.map((category) => (
              <div key={category.id} className="glass-card rounded-xl p-6">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-foreground">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-primary font-medium">
                    {category.tutorCount} tutors
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCategory(category)}
                    className="gap-1"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit/Add Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the category details below."
                : "Fill in the details to create a new category."}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-3"
          >
            <form.Field
              name="icon"
              validators={{
                onChange: categorySchema.shape.icon,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Icon (Emoji)</Label>
                  <Input
                    id={field.name}
                    placeholder="📚"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="name"
              validators={{
                onChange: categorySchema.shape.name,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Name</Label>
                  <Input
                    id={field.name}
                    placeholder="Category name"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="description"
              validators={{
                onChange: categorySchema.shape.description,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Description</Label>
                  <Input
                    id={field.name}
                    placeholder="Brief description"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="tutorCount"
              validators={{
                onChange: categorySchema.shape.tutorCount,
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Tutor Count</Label>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm font-medium text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingCategory ? "Save Changes" : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;

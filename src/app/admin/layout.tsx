import AdminDashboardLayout from "@/components/layout/AdminDashboardLayout";
import { userService } from "@/services/user.service";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const api = userService;
  const { data } = await api.getSession();
  const { user } = data || {};
  return (
    <AdminDashboardLayout userData={user}>{children}</AdminDashboardLayout>
  );
}

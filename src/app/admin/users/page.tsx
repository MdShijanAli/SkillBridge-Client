import { apiRoutes } from "@/api/apiRoutes";
import { BaseTableList } from "@/components/ui/BaseTableList";
import { User } from "@/lib/types";

const userColumns = [
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "role", title: "Role" },
  { key: "phone", title: "Phone" },
  {
    key: "is_active",
    title: "Active",
    // render: (v: boolean) => (v ? "Yes" : "No"),
  },
  {
    key: "is_banned",
    title: "Banned",
    // render: (v: boolean) => (v ? "Yes" : "No"),
  },
  {
    key: "createdAt",
    title: "Created At",
    // render: (v: string) => new Date(v).toLocaleString(),
  },
];

export default function Users() {
  return (
    <BaseTableList<User>
      tableName="Users"
      description="Manage all users in the system."
      searchPlaceholder="Search users by name or email..."
      addNewButton={true}
      endpoint={apiRoutes.users.getAll}
      columns={userColumns}
    />
  );
}

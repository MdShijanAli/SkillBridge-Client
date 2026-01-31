"use client";

import { apiRoutes } from "@/api/apiRoutes";
import DeleteModal from "@/components/modals/delete-modal";
import { Column } from "@/components/table/BaseTable";
import { BaseTableList } from "@/components/table/BaseTableList";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User } from "@/lib/types";
import { changeStatus } from "@/services/api.service";
import { useState } from "react";
import { toast } from "sonner";

const UserRolesStyle = (role: string) => {
  switch (role) {
    case "ADMIN":
      return "bg-black text-white";
    case "TUTOR":
      return "bg-blue-600 text-white";
    case "STUDENT":
      return "bg-green-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

export default function Users() {
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleChangeStatus = (user: User) => {
    console.log("Change status for user:", user);
    setSelectedUser(user);
    setShowChangeStatusModal(true);
  };

  const handleConfirmChangeStatus = async () => {
    try {
      setIsChangingStatus(true);
      const response = await changeStatus({
        endpoint: apiRoutes.users.changeStatus(selectedUser!.id),
        data: {
          is_active: selectedUser!.is_active === true ? false : true,
        },
      });
      console.log("Change Status Response:", response);
      toast.success("User status changed successfully.");
      setShowChangeStatusModal(false);
    } catch (error: any) {
      console.error("Error changing user status:", error);
      toast.error(
        error.message || "Failed to change user status. Please try again.",
      );
    } finally {
      setIsChangingStatus(false);
    }
  };

  const userColumns: Column<User>[] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    {
      key: "role",
      label: "Role",
      render: (user) => (
        <Badge variant="outline" className={UserRolesStyle(user.role)}>
          {user.role}
        </Badge>
      ),
    },
    { key: "phone", label: "Phone" },
    {
      key: "is_active",
      label: "Active",
      render: (user) => (
        <div>
          <Badge variant={user.is_active === true ? "success" : "destructive"}>
            {user.is_active ? "Yes" : "No"}
          </Badge>
          <Switch
            onCheckedChange={() => handleChangeStatus(user)}
            checked={user.is_active}
            className="ml-2"
          />
        </div>
      ),
    },
    {
      key: "is_banned",
      label: "Banned",
      render: (user) => (
        <Badge variant={user.is_banned ? "destructive" : "success"}>
          {user.is_banned ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (user) => new Date(user.createdAt).toLocaleString(),
    },
  ];
  return (
    <div>
      <BaseTableList<User>
        tableName="Users"
        description="Manage all users in the system."
        searchPlaceholder="Search users by name or email..."
        addNewButton={true}
        endpoint={apiRoutes.users.getAll}
        columns={userColumns}
        getRowKey={(item) => item.id}
      />

      <DeleteModal
        open={showChangeStatusModal}
        onClose={() => setShowChangeStatusModal(false)}
        title="Change User Status"
        description={`Are you sure you want to change the Activity status of ${selectedUser?.name}?`}
        onConfirm={handleConfirmChangeStatus}
        submitButtonText="Yes, Change Status"
        isDeleting={isChangingStatus}
        submitButtonVariant="default"
      />
    </div>
  );
}

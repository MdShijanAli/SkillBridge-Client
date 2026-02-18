"use client";

import { apiRoutes } from "@/api/apiRoutes";
import DeleteModal from "@/components/modals/delete-modal";
import { Column } from "@/components/table/BaseTable";
import { BaseTableList } from "@/components/table/BaseTableList";
import {
  ActionItem,
  DropdownMenuActions,
} from "@/components/table/DropdownMenuActions";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User } from "@/lib/types";
import { banUser, changeStatus, deleteItem } from "@/services/api.service";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ViewModal from "./view-modal";
import FormModal from "./form-modal";
import { getSerialNumber } from "@/lib/utils";
import { Roles } from "@/constants/roles";

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
  const [showChangeBannedModal, setShowChangeBannedModal] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showIsFeaturedModal, setShowIsFeaturedModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [editData, setEditData] = useState<User | null>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChangeStatus = (user: User) => {
    console.log("Change status for user:", user);
    setSelectedUser(user);
    setShowChangeStatusModal(true);
  };
  const handleBannedUser = (user: User) => {
    console.log("Change banned status for user:", user);
    setSelectedUser(user);
    setShowChangeBannedModal(true);
  };
  const handleFeaturedUser = (user: User) => {
    console.log("Change featured status for user:", user);
    setSelectedUser(user);
    setShowIsFeaturedModal(true);
  };

  const handleConfirmChangeStatus = async () => {
    try {
      if (!selectedUser) return;
      setIsChangingStatus(true);
      let response;
      if (showChangeStatusModal) {
        response = await changeStatus({
          endpoint: apiRoutes.users.changeStatus(selectedUser!.id),
          data: {
            is_active: selectedUser!.is_active === true ? false : true,
          },
        });
      } else if (showIsFeaturedModal) {
        response = await changeStatus({
          endpoint: apiRoutes.users.changeFeaturedStatus(selectedUser!.id),
          data: {
            is_featured: selectedUser!.is_featured === true ? false : true,
          },
        });
      } else {
        response = await banUser({
          endpoint: apiRoutes.users.bannedUser(selectedUser!.id),
          data: {
            is_banned: selectedUser!.is_banned === true ? false : true,
          },
        });
      }
      if (!response.success) {
        throw new Error(response.message || "Failed to change user status");
      } else {
        console.log("Change Status Response:", response);
        toast.success(
          showChangeStatusModal
            ? "User status changed successfully."
            : showChangeBannedModal
              ? "User banned status changed successfully."
              : "User featured status changed successfully.",
        );
        setShowChangeStatusModal(false);
        setShowChangeBannedModal(false);
        setShowIsFeaturedModal(false);
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error: any) {
      console.error("Error changing user status:", error);
      toast.error(
        error.message ||
          (showChangeStatusModal
            ? "Failed to change user status. Please try again."
            : showChangeBannedModal
              ? "Failed to change user banned status. Please try again."
              : "Failed to change user featured status. Please try again."),
      );
    } finally {
      setIsChangingStatus(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!selectedUserId) return;
      setIsDeleting(true);
      const response = await deleteItem({
        endpoint: apiRoutes.users.delete(selectedUserId),
      });
      console.log("Delete Response:", response);
      toast.success("User deleted successfully.");
      setShowDeleteModal(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast.error(error.message || "Failed to delete user. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = (user: User) => {
    setShowDeleteModal(true);
    setSelectedUserId(user.id);
  };

  const handleView = (user: User) => {
    setShowDetailModal(true);
    setSelectedUserId(user.id);
  };
  const handleEdit = (user: User) => {
    setShowFormModal(true);
    setEditData(user);
  };

  const userActions = (user: User): ActionItem<User>[] => [
    {
      label: "View User",
      icon: Eye,
      onClick: handleView,
    },
    {
      label: "Edit User",
      icon: Edit,
      onClick: handleEdit,
      separator: true,
      show: user.role !== "ADMIN",
    },
    {
      label: "Delete User",
      icon: Trash2,
      onClick: handleDelete,
      variant: "destructive",
      show: user.role !== "ADMIN",
    },
  ];

  const userColumns: Column<User>[] = [
    {
      key: "sl",
      label: "SL",
      render: (user, index) => getSerialNumber(index),
    },
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
          {user.role !== "ADMIN" && (
            <Switch
              onCheckedChange={() => handleChangeStatus(user)}
              checked={user.is_active}
              className="ml-2"
            />
          )}
        </div>
      ),
    },
    {
      key: "is_banned",
      label: "Banned",
      render: (user) => (
        <div>
          <Badge variant={user.is_banned ? "destructive" : "success"}>
            {user.is_banned ? "Yes" : "No"}
          </Badge>
          {user.role !== "ADMIN" && (
            <Switch
              onCheckedChange={() => handleBannedUser(user)}
              checked={!user.is_banned}
              className="ml-2"
            />
          )}
        </div>
      ),
    },
    {
      key: "is_featured",
      label: "Featured",
      render: (user) => (
        <div>
          <Badge variant={user.is_featured ? "blue" : "secondary"}>
            {user.is_featured ? "Yes" : "No"}
          </Badge>
          {user.role === Roles.TUTOR && (
            <Switch
              onCheckedChange={() => handleFeaturedUser(user)}
              checked={user.is_featured}
              className="ml-2"
            />
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (user) => new Date(user.createdAt).toLocaleString(),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (user) => (
        <DropdownMenuActions item={user} actions={userActions(user)} />
      ),
    },
  ];
  return (
    <div>
      <BaseTableList<User>
        tableName="Users"
        description="Manage all users in the system."
        searchPlaceholder="Search users by name or email..."
        addNewButton={false}
        endpoint={apiRoutes.users.getAll}
        columns={userColumns}
        getRowKey={(item) => item.id}
        key={refreshKey}
      />

      <DeleteModal
        open={
          showChangeStatusModal || showChangeBannedModal || showIsFeaturedModal
        }
        onClose={() => {
          setShowChangeStatusModal(false);
          setShowChangeBannedModal(false);
          setShowIsFeaturedModal(false);
        }}
        title={
          showChangeStatusModal
            ? "Change User Status"
            : showChangeBannedModal
              ? "Change Banned Status"
              : "Change Featured Status"
        }
        description={`${showChangeStatusModal ? "Are you sure you want to change the Activity status of" : showChangeBannedModal ? "Are you sure you want to change the Banned status of" : "Are you sure you want to change the Featured status of"} ${selectedUser?.name}?`}
        onConfirm={handleConfirmChangeStatus}
        submitButtonText={
          showChangeStatusModal
            ? "Change Status"
            : showChangeBannedModal
              ? "Change Banned Status"
              : "Change Featured Status"
        }
        isDeleting={isChangingStatus}
        submitButtonVariant="default"
      />

      {showDetailModal && selectedUserId !== null && (
        <ViewModal
          open={showDetailModal}
          onClose={setShowDetailModal}
          userId={selectedUserId}
        />
      )}

      {showFormModal && (
        <FormModal
          open={showFormModal}
          onClose={() => setShowFormModal(false)}
          editData={editData}
          setRefreshKey={setRefreshKey}
        />
      )}

      {showDeleteModal && selectedUserId !== null && (
        <DeleteModal
          open={showDeleteModal}
          title="Delete User"
          description="Are you sure you want to delete this user? This action cannot be undone."
          onClose={setShowDeleteModal}
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

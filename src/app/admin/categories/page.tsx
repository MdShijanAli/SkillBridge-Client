"use client";

import { apiRoutes } from "@/api/apiRoutes";
import { Column } from "@/components/table/BaseTable";
import { BaseTableList } from "@/components/table/BaseTableList";
import {
  ActionItem,
  DropdownMenuActions,
} from "@/components/table/DropdownMenuActions";
import { Category } from "@/lib/types";
import { Edit, Eye, Trash2 } from "lucide-react";

export default function Categories() {
  const handleDelete = (category: Category) => {
    // Implement delete logic here
  };

  const handleVieew = (category: Category) => {
    // Implement view logic here
  };
  const handleEdit = (category: Category) => {
    // Implement edit logic here
  };

  const categoryActions: ActionItem<Category>[] = [
    {
      label: "View Category",
      icon: Eye,
      onClick: handleVieew,
    },
    {
      label: "Edit Category",
      icon: Edit,
      onClick: handleEdit,
      separator: true,
    },
    {
      label: "Delete Category",
      icon: Trash2,
      onClick: handleDelete,
      variant: "destructive",
    },
  ];

  const categoryColumns: Column<Category>[] = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    {
      key: "isActive",
      label: "Active",
      render: (item) => (item.isActive ? "Yes" : "No"),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (item) => new Date(item.createdAt).toLocaleString(),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (category) => (
        <DropdownMenuActions item={category} actions={categoryActions} />
      ),
    },
  ];
  return (
    <BaseTableList<Category>
      tableName="Categories"
      description="Manage all categories in the system."
      searchPlaceholder="Search categories by name..."
      addNewButton={true}
      endpoint={apiRoutes.categories.getAll}
      columns={categoryColumns}
      getRowKey={(item) => item.id}
    />
  );
}

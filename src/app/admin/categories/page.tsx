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
import { useState } from "react";
import ViewModal from "./view-modal";
import FormModal from "./form-modal";

export default function Categories() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | number | null
  >(null);
  const [editData, setEditData] = useState<Category | null>();

  const handleDelete = (category: Category) => {
    // Implement delete logic here
  };

  const handleView = (category: Category) => {
    setShowDetailModal(true);
    setSelectedCategoryId(category.id);
  };
  const handleEdit = (category: Category) => {
    setShowFormModal(true);
    setEditData(category);
  };

  const categoryActions: ActionItem<Category>[] = [
    {
      label: "View Category",
      icon: Eye,
      onClick: handleView,
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
    <div>
      <BaseTableList<Category>
        tableName="Categories"
        description="Manage all categories in the system."
        searchPlaceholder="Search categories by name..."
        addNewButton={true}
        addNewHandler={() => setShowFormModal(true)}
        endpoint={apiRoutes.categories.getAll}
        columns={categoryColumns}
        getRowKey={(item) => item.id}
      />

      {showDetailModal && selectedCategoryId !== null && (
        <ViewModal
          open={showDetailModal}
          onClose={setShowDetailModal}
          categoryId={selectedCategoryId}
        />
      )}
      {showFormModal && (
        <FormModal
          open={showFormModal}
          onClose={() => setShowFormModal(false)}
          editData={editData}
        />
      )}
    </div>
  );
}

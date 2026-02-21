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
import DeleteModal from "@/components/modals/delete-modal";
import { changeStatus, deleteItem } from "@/services/api.service";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { getSerialNumber } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function Categories() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | number | null
  >(null);
  const [editData, setEditData] = useState<Category | null>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const handleDelete = (category: Category) => {
    setShowDeleteModal(true);
    setSelectedCategoryId(category.id);
  };

  const handleView = (category: Category) => {
    setShowDetailModal(true);
    setSelectedCategoryId(category.id);
  };
  const handleEdit = (category: Category) => {
    setShowFormModal(true);
    setEditData(category);
  };

  const handleDeleteCategory = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteItem({
        endpoint: apiRoutes.categories.delete(Number(selectedCategoryId)),
      });
      console.log("Delete Response:", response);
      setShowDeleteModal(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleChangeStatus = (category: Category) => {
    console.log("Change status for category:", category);
    setSelectedCategory(category);
    setShowChangeStatusModal(true);
  };

  const handleConfirmChangeStatus = async () => {
    try {
      if (!selectedCategory) return;
      setIsChangingStatus(true);
      const response = await changeStatus({
        endpoint: apiRoutes.categories.changeStatus(selectedCategory.id),
        data: {
          isActive: selectedCategory.isActive === true ? false : true,
        },
      });

      console.log("Change Status Response:", response);
      toast.success(
        showChangeStatusModal
          ? "Category status changed successfully."
          : "Category banned status changed successfully.",
      );
      setShowChangeStatusModal(false);
      setRefreshKey((prev) => prev + 1);
    } catch (error: any) {
      console.error("Error changing category status:", error);
      toast.error(
        error.message || "Failed to change category status. Please try again.",
      );
    } finally {
      setIsChangingStatus(false);
    }
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
    {
      key: "sl",
      label: "SL",
      render: (_, index) => getSerialNumber(index, currentPage),
    },
    { key: "name", label: "Name" },
    {
      key: "description",
      label: "Description",
      className: "w-[100px] truncate max-w-[200px] ",
    },
    {
      key: "isActive",
      label: "Active",
      render: (category) => (
        <div>
          <Badge variant={category.isActive ? "success" : "destructive"}>
            {category.isActive ? "Yes" : "No"}
          </Badge>
          <Switch
            onCheckedChange={() => handleChangeStatus(category)}
            checked={category.isActive}
            className="ml-2"
          />
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (category) => new Date(category.createdAt).toLocaleString(),
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
        key={refreshKey}
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
          setRefreshKey={setRefreshKey}
        />
      )}

      {showDeleteModal && selectedCategoryId !== null && (
        <DeleteModal
          open={showDeleteModal}
          title="Delete Category"
          description="Are you sure you want to delete this category? This action cannot be undone."
          onClose={setShowDeleteModal}
          isDeleting={isDeleting}
          onConfirm={handleDeleteCategory}
        />
      )}

      <DeleteModal
        open={showChangeStatusModal}
        onClose={() => setShowChangeStatusModal(false)}
        title="Change Category Status"
        description={`Are you sure you want to change the Activity status of ${selectedCategory?.name}?`}
        onConfirm={handleConfirmChangeStatus}
        submitButtonText="Change Status"
        isDeleting={isChangingStatus}
        submitButtonVariant="default"
      />
    </div>
  );
}

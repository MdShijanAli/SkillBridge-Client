"use client";

import { apiRoutes } from "@/api/apiRoutes";
import { BaseModal } from "@/components/modals/base-modal";
import { Separator } from "@/components/ui/separator";
import { Category } from "@/lib/types";
import { fetchDetails } from "@/services/api.service";
import { useEffect, useState } from "react";

interface ViewModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  categoryId: string | number | null;
}

export default function ViewModal({
  open,
  onClose,
  categoryId,
}: ViewModalProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;
    const fetchCategory = async () => {
      setIsCategoryLoading(true);
      try {
        const url = apiRoutes.categories.getById(Number(categoryId));
        const response = await fetchDetails({ endpoint: url });
        console.log("Fetched category details:", response);
        setCategory(response.data);
      } catch (error) {
        console.error("Failed to fetch category details:", error);
      } finally {
        setIsCategoryLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return (
    <BaseModal
      open={open}
      onOpenChange={() => onClose(false)}
      title="Category Details"
      size="2xl"
      showSubmitButton={false}
      loading={isCategoryLoading}
      closeButtonText="Close"
    >
      <div className="space-y-6">
        {!category && !isCategoryLoading && (
          <p className="text-center text-sm text-gray-500">
            No category data found
          </p>
        )}

        {category && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Name */}
            <div>
              <p className="text-gray-500 mb-1">Name</p>
              <p className="font-medium text-gray-900">{category.name}</p>
            </div>

            {/* Status */}
            <div>
              <p className="text-gray-500 mb-1">Status</p>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              ${
                category.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
              >
                {category.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <p className="text-gray-500 mb-1">Description</p>
              <p className="text-gray-900">{category.description || "—"}</p>
            </div>

            {/* Created At */}
            <div>
              <p className="text-gray-500 mb-1">Created At</p>
              <p className="text-gray-900">
                {new Date(category.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Updated At */}
            <div>
              <p className="text-gray-500 mb-1">Last Updated</p>
              <p className="text-gray-900">
                {new Date(category.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}

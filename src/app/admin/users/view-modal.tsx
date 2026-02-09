"use client";

import { apiRoutes } from "@/api/apiRoutes";
import { BaseModal } from "@/components/modals/base-modal";
import { User } from "@/lib/types";
import { fetchDetails } from "@/services/api.service";
import { useEffect, useState } from "react";

interface ViewModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  userId: string | number | null;
}

export default function ViewModal({ open, onClose, userId }: ViewModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const fetchUser = async () => {
      setIsUserLoading(true);
      try {
        const url = apiRoutes.users.getById(userId);
        const response = await fetchDetails({ endpoint: url });
        console.log("Fetched user details:", response);
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <BaseModal
      open={open}
      onOpenChange={() => onClose(false)}
      title="User Details"
      size="2xl"
      showSubmitButton={false}
      loading={isUserLoading}
      closeButtonText="Close"
    >
      {!user && !isUserLoading && (
        <p className="text-center text-sm text-gray-500 py-10">
          No user data found
        </p>
      )}

      {user && (
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
              {user.name?.charAt(0)}
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
          ${
            user.role === "ADMIN"
              ? "bg-black text-white"
              : user.role === "TUTOR"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
          }`}
            >
              {user.role}
            </span>
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
          ${
            user.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
            >
              {user.is_active ? "Active" : "Inactive"}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
          ${
            user.is_banned
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
            >
              {user.is_banned ? "Banned" : "Not Banned"}
            </span>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 mb-1">Phone</p>
              <p className="font-medium text-gray-900">{user.phone || "—"}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 mb-1">Email Verified</p>
              <p className="font-medium text-gray-900">
                {user.emailVerified ? "Yes" : "No"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 mb-1">Created At</p>
              <p className="text-gray-900">
                {new Date(user.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 mb-1">Last Updated</p>
              <p className="text-gray-900">
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </BaseModal>
  );
}

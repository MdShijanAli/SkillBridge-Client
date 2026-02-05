"use client";

import { apiRoutes } from "@/api/apiRoutes";
import { Column } from "@/components/table/BaseTable";
import { BaseTableList } from "@/components/table/BaseTableList";
import {
  ActionItem,
  DropdownMenuActions,
} from "@/components/table/DropdownMenuActions";
import { Booking, Category } from "@/lib/types";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import BookingDetailsModal from "./view-modal";
import DeleteModal from "@/components/modals/delete-modal";
import { changeStatus, deleteItem } from "@/services/api.service";
import { toast } from "sonner";

export default function BookingsPage() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBookingId, setselectedBookingId] = useState<
    string | number | null
  >(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDelete = (booking: Booking) => {
    setShowDeleteModal(true);
    setselectedBookingId(booking.id);
  };

  const handleView = (booking: Booking) => {
    setShowDetailModal(true);
    setselectedBookingId(booking.id);
  };

  const handleDeleteBooking = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteItem({
        endpoint: apiRoutes.bookings.delete(Number(selectedBookingId)),
      });
      console.log("Delete Response:", response);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete booking");
      } else {
        toast.success("Booking deleted successfully.");
        setShowDeleteModal(false);
        setRefreshKey((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking. Please try again.");
    }
  };

  const categoryActions: ActionItem<Booking>[] = [
    {
      label: "View Booking",
      icon: Eye,
      onClick: handleView,
    },
    {
      label: "Delete Booking",
      icon: Trash2,
      onClick: handleDelete,
      variant: "destructive",
    },
  ];

  const categoryColumns: Column<Booking>[] = [
    {
      key: "sl",
      label: "SL",
      render: (_, index) => index + 1,
    },
    {
      key: "tutor",
      label: "Tutor",
      render: (booking) => booking?.tutor?.name,
      className: "w-[120px]",
    },
    {
      key: "student",
      label: "Student",
      render: (booking) => booking?.student?.name,
      className: "w-[120px]",
    },
    { key: "scheduleDate", label: "Booking Date" },
    { key: "scheduleTime", label: "Booking Time" },
    { key: "duration", label: "Duration" },
    {
      key: "price",
      label: "Price",
      render: (booking) => `BDT${booking?.price}`,
      className: "w-[100px]",
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (booking) => new Date(booking.createdAt).toLocaleString(),
    },
    {
      key: "actions",
      label: "Actions",
      className: "text-right",
      render: (booking) => (
        <DropdownMenuActions item={booking} actions={categoryActions} />
      ),
    },
  ];
  return (
    <div>
      <BaseTableList<Booking>
        tableName="Bookings"
        description="Manage all bookings in the system."
        searchPlaceholder="Search bookings by name..."
        addNewButton={false}
        endpoint={apiRoutes.bookings.getAll}
        columns={categoryColumns}
        getRowKey={(item) => item.id}
        key={refreshKey}
      />

      {showDetailModal && selectedBookingId !== null && (
        <BookingDetailsModal
          open={showDetailModal}
          onClose={setShowDetailModal}
          bookingId={selectedBookingId}
        />
      )}

      {showDeleteModal && selectedBookingId !== null && (
        <DeleteModal
          open={showDeleteModal}
          title="Delete Category"
          description="Are you sure you want to delete this category? This action cannot be undone."
          onClose={setShowDeleteModal}
          isDeleting={isDeleting}
          onConfirm={handleDeleteBooking}
        />
      )}
    </div>
  );
}

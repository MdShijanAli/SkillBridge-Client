"use client";

import { Calendar, Clock, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Booking, BookingStatus } from "@/lib/types";
import { Roles } from "@/constants/roles";
import { toast } from "sonner";
import { useState } from "react";
import { BaseModal } from "@/components/modals/base-modal";
import { changeStatus } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";
import { useRouter } from "next/navigation";

interface BookingCardProps {
  booking: Booking;
  userType: "STUDENT" | "TUTOR";
  onAction?: (action: string, bookingId: string) => void;
}

const BookingCard = ({ booking, userType, onAction }: BookingCardProps) => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  const getStatusBadge = () => {
    switch (booking.status) {
      case BookingStatus.CONFIRMED:
        return <Badge className="badge-confirmed">Confirmed</Badge>;
      case BookingStatus.COMPLETED:
        return <Badge className="badge-completed">Completed</Badge>;
      case BookingStatus.CANCELLED:
        return <Badge className="badge-cancelled">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const displayName =
    userType === Roles.STUDENT ? booking?.tutor?.name : booking?.student?.name;
  const displayAvatar =
    userType === Roles.STUDENT
      ? booking?.tutor?.image
      : booking?.student?.image;

  const handleJoin = () => {
    setIsSessionModalOpen(true);
  };

  const handleMarkAsCompleted = async () => {
    setIsCompleting(true);
    try {
      await changeStatus({
        endpoint: apiRoutes.bookings.updateStatus(booking.id),
        data: { status: BookingStatus.COMPLETED },
      });
      toast.success("Session completed!", {
        description: "You can now leave a review for your tutor.",
      });
      setIsSessionModalOpen(false);
      onAction?.("completed", booking.id);
    } catch (error) {
      toast.error("Failed to complete session", {
        description: "Please try again later.",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      await changeStatus({
        endpoint: apiRoutes.bookings.updateStatus(booking.id),
        data: { status: BookingStatus.CANCELLED },
      });
      toast.success("Booking cancelled", {
        description: "Your booking has been cancelled successfully.",
      });
      // Trigger refetch
      onAction?.("cancelled", booking.id);
    } catch (error) {
      toast.error("Failed to cancel booking", {
        description: "Please try again later.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="font-medium text-foreground">{displayName}</h4>
            <p className="text-sm text-primary">{booking?.category?.name}</p>
          </div>
        </div>

        {getStatusBadge()}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{booking.scheduleDate}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {booking.scheduleTime} ({booking.duration} min)
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-foreground">
          ${booking.price}
        </span>

        <div className="flex gap-2">
          {booking.status === BookingStatus.CONFIRMED && (
            <>
              <Button onClick={handleJoin} variant="outline" size="sm">
                <Video className="w-4 h-4 mr-1" />
                Join
              </Button>
              {onAction && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={handleCancel}
                  disabled={isCancelling}
                >
                  {isCancelling ? "Cancelling..." : "Cancel"}
                </Button>
              )}
            </>
          )}
          {booking.status === BookingStatus.COMPLETED &&
            userType === Roles.STUDENT && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAction?.("review", booking.id)}
              >
                Leave Review
              </Button>
            )}
        </div>
      </div>

      <BaseModal
        open={isSessionModalOpen}
        onOpenChange={setIsSessionModalOpen}
        title="Live Session"
        showCloseButton={true}
        closeButtonText="Leave Session"
        showSubmitButton={true}
        submitButtonText="Mark as Completed"
        onSubmit={handleMarkAsCompleted}
        isSubmitting={isCompleting}
        size="md"
      >
        <div className="text-center py-8">
          <div className="mb-4">
            <Video className="w-16 h-16 mx-auto text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Welcome to the session!
          </h3>
          <p className="text-lg text-muted-foreground mb-4">You&apos;re in</p>
          <div className="glass-card p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              This is a demo session. In a real application, you would be
              connected to a video call with your tutor.
            </p>
          </div>
        </div>
      </BaseModal>
    </div>
  );
};

export default BookingCard;

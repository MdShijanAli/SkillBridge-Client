"use client";

import { Calendar, Clock, Video, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Booking, BookingStatus, User } from "@/lib/types";
import { Roles } from "@/constants/roles";
import { toast } from "sonner";
import { useState } from "react";
import { BaseModal } from "@/components/modals/base-modal";
import { changeStatus } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";

interface BookingCardProps {
  booking: Booking;
  userType: "STUDENT" | "TUTOR";
  onAction?: (action: string, booking: Booking) => void;
  auth?: User;
  isUpcoming?: boolean;
}

const BookingCard = ({
  booking,
  userType,
  onAction,
  auth,
  isUpcoming = false,
}: BookingCardProps) => {
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  console.log("Current User in BookingCard:", auth);

  const getStatusBadge = () => {
    switch (booking.status) {
      case BookingStatus.CONFIRMED:
        return (
          <Badge variant="blue" className="badge-confirmed">
            Confirmed
          </Badge>
        );
      case BookingStatus.COMPLETED:
        return (
          <Badge variant="success" className="badge-completed">
            Completed
          </Badge>
        );
      case BookingStatus.CANCELLED:
        return (
          <Badge variant="destructive" className="badge-cancelled">
            Cancelled
          </Badge>
        );
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

  const handleLeaveReview = () => {
    onAction?.("review", booking);
    setIsSessionModalOpen(false);
  };

  const handleMarkAsCompleted = async () => {
    setIsCompleting(true);
    try {
      const response = await changeStatus({
        endpoint: apiRoutes.bookings.updateStatus(booking.id),
        data: { status: BookingStatus.COMPLETED },
      });
      console.log("Status update response:", response);
      if (!response.success) {
        toast.error(response.message, {
          description: response.error,
        });
      } else {
        toast.success("Session completed!", {
          description: "This session has been marked as completed.",
        });
        setIsSessionModalOpen(false);
        onAction?.("completed", booking);
      }
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
      const response = await changeStatus({
        endpoint: apiRoutes.bookings.updateStatus(booking.id),
        data: { status: BookingStatus.CANCELLED },
      });
      if (!response.success) {
        toast.error(response.message, {
          description: response.error,
        });
      } else {
        toast.success("Booking cancelled", {
          description: "Your booking has been cancelled successfully.",
        });
        // Trigger refetch
        onAction?.("cancelled", booking);
      }
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
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={displayAvatar || ""} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {displayName
                ?.split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="font-medium text-foreground">{displayName}</h4>
            <p className="text-sm text-primary">{booking?.subject}</p>
          </div>
        </div>

        {getStatusBadge()}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
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
          {(booking.status === BookingStatus.CONFIRMED ||
            booking.status === BookingStatus.COMPLETED) &&
          !isUpcoming &&
          booking.review ? (
            <div className="flex flex-col gap-2 max-w-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= booking.review!.rating
                          ? "text-accent fill-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <Badge variant="secondary" className="text-xs">
                  Reviewed
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {booking.review.comment}
              </p>
            </div>
          ) : (
            <>
              {booking.status === BookingStatus.CONFIRMED && isUpcoming && (
                <Button onClick={handleJoin} variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-1" />
                  Join
                </Button>
              )}

              {onAction &&
                userType === Roles.STUDENT &&
                booking.status !== BookingStatus.COMPLETED && (
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
            userType === Roles.STUDENT &&
            booking.review === null && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAction?.("review", booking)}
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
        submitButtonText={
          userType === Roles.TUTOR ? "Mark as Completed" : "Leave Review"
        }
        onSubmit={
          userType === Roles.TUTOR ? handleMarkAsCompleted : handleLeaveReview
        }
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

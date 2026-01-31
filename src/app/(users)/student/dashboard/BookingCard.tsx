"use client";

import { Calendar, Clock, Video } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Booking } from "@/lib/types";
import { Roles } from "@/constants/roles";

interface BookingCardProps {
  booking: Booking;
  userType: "STUDENT" | "TUTOR";
  onAction?: (action: string, bookingId: string) => void;
}

const BookingCard = ({ booking, userType, onAction }: BookingCardProps) => {
  const getStatusBadge = () => {
    switch (booking.status) {
      case "confirmed":
        return <Badge className="badge-confirmed">Confirmed</Badge>;
      case "completed":
        return <Badge className="badge-completed">Completed</Badge>;
      case "cancelled":
        return <Badge className="badge-cancelled">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const displayName =
    userType === Roles.STUDENT ? booking.tutorName : booking.studentName;
  const displayAvatar =
    userType === Roles.STUDENT ? booking.tutorAvatar : booking.studentAvatar;

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={displayAvatar} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {displayName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div>
            <h4 className="font-medium text-foreground">{displayName}</h4>
            <p className="text-sm text-primary">{booking.subject}</p>
          </div>
        </div>

        {getStatusBadge()}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{booking.date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {booking.time} ({booking.duration} min)
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-lg font-semibold text-foreground">
          ${booking.price}
        </span>

        <div className="flex gap-2">
          {booking.status === "confirmed" && (
            <>
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4 mr-1" />
                Join
              </Button>
              {onAction && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onAction("cancel", booking.id)}
                >
                  Cancel
                </Button>
              )}
            </>
          )}
          {booking.status === "completed" && userType === Roles.STUDENT && (
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
    </div>
  );
};

export default BookingCard;

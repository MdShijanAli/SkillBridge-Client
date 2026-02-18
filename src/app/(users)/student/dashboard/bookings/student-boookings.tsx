"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingCard from "../BookingCard";
import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";
import { Booking, BookingStatus } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import ReviewDialog from "@/components/common/ReviewDialog";

const StudentBookings = ({ user }: { user: any }) => {
  console.log("User prop in StudentBookings:", user);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking>(null as any);

  const {
    data: myBookings,
    refetch,
    isLoading,
  } = useQuery(apiRoutes.bookings.getMyBookings(user.id), {});

  console.log("Fetched bookings:", myBookings);

  const upcomingBookings =
    myBookings?.data?.filter(
      (b: Booking) => b.status === BookingStatus.CONFIRMED,
    ) || [];
  const completedBookings =
    myBookings?.data?.filter(
      (b: Booking) => b.status === BookingStatus.COMPLETED,
    ) || [];
  const cancelledBookings =
    myBookings?.data?.filter(
      (b: Booking) => b.status === BookingStatus.CANCELLED,
    ) || [];

  const handleBookingAction = (action: string, booking: Booking) => {
    console.log(`Action: ${action} on Booking ID: ${booking.id}`);
    if (action === "completed") {
      refetch();
    } else if (action === "review") {
      setReviewDialogOpen(true);
      setSelectedBooking(booking);
    } else if (action === "cancelled") {
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl px-5 mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            My Bookings
          </h1>

          <Tabs
            defaultValue={BookingStatus.CONFIRMED}
            className="glass-card rounded-xl p-6"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={BookingStatus.CONFIRMED}>
                Upcoming ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value={BookingStatus.COMPLETED}>
                Completed ({completedBookings.length})
              </TabsTrigger>
              <TabsTrigger value={BookingStatus.CANCELLED}>
                Cancelled ({cancelledBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={BookingStatus.CONFIRMED} className="mt-6">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-card rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Skeleton className="h-6 w-16" />
                        <div className="flex gap-2">
                          <Skeleton className="h-9 w-20" />
                          <Skeleton className="h-9 w-20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : upcomingBookings.length > 0 ? (
                <div className="space-y-3">
                  {upcomingBookings.map((booking: Booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="STUDENT"
                      onAction={(action, booking) =>
                        handleBookingAction(action, booking)
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No upcoming sessions.
                </p>
              )}
            </TabsContent>

            <TabsContent value={BookingStatus.COMPLETED} className="mt-6">
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="glass-card rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-9 w-28" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : completedBookings.length > 0 ? (
                <div className="space-y-3">
                  {completedBookings.map((booking: Booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="STUDENT"
                      onAction={(action, booking) =>
                        handleBookingAction(action, booking)
                      }
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No completed sessions yet.
                </p>
              )}
            </TabsContent>

            <TabsContent value={BookingStatus.CANCELLED} className="mt-6">
              {isLoading ? (
                <div className="space-y-3">
                  {[1].map((i) => (
                    <div key={i} className="glass-card rounded-xl p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : cancelledBookings.length > 0 ? (
                <div className="space-y-3">
                  {cancelledBookings.map((booking: Booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="STUDENT"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No cancelled sessions.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <ReviewDialog
          booking={selectedBooking}
          open={reviewDialogOpen}
          onOpenChange={setReviewDialogOpen}
          onSuccess={() => {
            refetch();
            return true;
          }}
        />
      </main>
    </div>
  );
};

export default StudentBookings;

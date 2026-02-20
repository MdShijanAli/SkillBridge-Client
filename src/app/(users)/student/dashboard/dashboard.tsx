"use client";

import { Calendar, BookOpen, Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import BookingCard from "./BookingCard";
import { apiRoutes } from "@/api/apiRoutes";
import { useQuery } from "@/hooks/useQuery";
import { Booking, User } from "@/lib/types";
import { useState } from "react";
import ReviewDialog from "@/components/common/ReviewDialog";

const StudentDashboard = ({ auth }: { auth: User }) => {
  const { data: stats, refetch } = useQuery(
    apiRoutes.dashboard.studentStats,
    {},
    {
      staleWhileRevalidate: true,
      cacheTime: 0.5 * 60 * 1000,
    },
  );
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking>(null as any);

  console.log("Dashboard stats:", stats);

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
    <div className="min-h-screen bg-backgrodund">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl px-5 mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {stats?.data?.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your learning journey.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <StatCard
              title="Upcoming Sessions"
              value={stats?.data?.upcomingSessions}
              icon={Calendar}
            />
            <StatCard
              title="Completed Sessions"
              value={stats?.data?.completedSessions}
              icon={BookOpen}
            />
            <StatCard
              title="Total Hours"
              value={stats?.data?.totalHours}
              icon={Clock}
            />
            <StatCard
              title="Reviews Given"
              value={stats?.data?.reviewsGiven}
              icon={Star}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Upcoming Sessions
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/student/dashboard/bookings">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              {stats?.data?.recentBookings?.length > 0 ? (
                <div className="space-y-3">
                  {stats.data.recentBookings.map((booking: Booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="STUDENT"
                      auth={auth}
                      onAction={(action, booking) =>
                        handleBookingAction(action, booking)
                      }
                      isUpcoming={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-card rounded-xl p-8 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">
                    No upcoming sessions
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Book a session with a tutor to get started.
                  </p>
                  <Button asChild>
                    <Link href="/tutors">Find a Tutor</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/tutors"
                  className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift block"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      Find a Tutor
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Browse available tutors
                    </p>
                  </div>
                </Link>

                <Link
                  href="/student/dashboard/bookings"
                  className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift block"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">My Bookings</h3>
                    <p className="text-sm text-muted-foreground">
                      View all sessions
                    </p>
                  </div>
                </Link>

                <Link
                  href="/student/profile"
                  className="glass-card rounded-xl p-4 flex items-center gap-3 hover-lift block"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">My Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      Edit your information
                    </p>
                  </div>
                </Link>
              </div>
            </div>
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
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;

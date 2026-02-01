"use client";

import { Calendar, BookOpen, Star, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookings, currentUser } from "@/lib/data";
import StatCard from "@/components/dashboard/StatCard";
import Link from "next/link";
import BookingCard from "./BookingCard";

const StudentDashboard = () => {
  const userBookings = bookings.filter((b) => b.studentId === "s1");
  const upcomingBookings = userBookings.filter((b) => b.status === "confirmed");
  const completedBookings = userBookings.filter(
    (b) => b.status === "completed",
  );

  return (
    <div className="min-h-screen bg-backgrodund">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {currentUser.name.split(" ")[0]}! 👋
            </h1>
            <p className="text-muted-foreground mt-2">
              Here's what's happening with your learning journey.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Upcoming Sessions"
              value={upcomingBookings.length}
              icon={Calendar}
            />
            <StatCard
              title="Completed Sessions"
              value={completedBookings.length}
              change="+3 this month"
              changeType="positive"
              icon={BookOpen}
            />
            <StatCard title="Total Hours" value="12.5" icon={Clock} />
            <StatCard title="Reviews Given" value="5" icon={Star} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  Upcoming Sessions
                </h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/bookings">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      userType="STUDENT"
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
              <div className="space-y-4">
                <Link
                  href="/tutors"
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift block"
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
                  href="/dashboard/bookings"
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift block"
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
                  className="glass-card rounded-xl p-4 flex items-center gap-4 hover-lift block"
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

              {/* Recent Activity */}
              <h2 className="text-xl font-semibold text-foreground mt-8 mb-6">
                Recent Activity
              </h2>
              <div className="glass-card rounded-xl p-4 space-y-4">
                {completedBookings.slice(0, 3).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        Session with {booking.tutorName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.subject} • {booking.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;

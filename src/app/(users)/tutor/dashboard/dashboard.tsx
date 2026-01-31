"use client";

import { Calendar, DollarSign, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bookings, reviews, currentTutor } from "@/lib/data";
import Link from "next/link";
import BookingCard from "../../student/dashboard/BookingCard";
import ReviewCard from "@/components/dashboard/ReviewCard";
import StatCard from "@/components/dashboard/StatCard";
import { Roles } from "@/constants/roles";

const TutorDashboard = () => {
  const tutorBookings = bookings.filter((b) => b.tutorId === currentTutor.id);
  const tutorReviews = reviews.filter((r) => r.tutorId === currentTutor.id);
  const upcomingBookings = tutorBookings.filter(
    (b) => b.status === "confirmed",
  );
  const completedBookings = tutorBookings.filter(
    (b) => b.status === "completed",
  );

  const totalEarnings = completedBookings.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Tutor Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your sessions and track your performance.
              </p>
            </div>
            <Button variant="hero" asChild>
              <Link href="/tutor/availability">
                <Clock className="w-4 h-4 mr-2" />
                Manage Availability
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Upcoming Sessions"
              value={upcomingBookings.length}
              icon={Calendar}
            />
            <StatCard
              title="Total Earnings"
              value={`$${totalEarnings}`}
              change="+$320 this week"
              changeType="positive"
              icon={DollarSign}
            />
            <StatCard title="Rating" value={currentTutor.rating} icon={Star} />
            <StatCard
              title="Total Students"
              value={currentTutor.totalSessions}
              change="+12 this month"
              changeType="positive"
              icon={Users}
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs
                defaultValue="upcoming"
                className="glass-card rounded-xl p-6"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="mt-6">
                  {upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          userType={Roles.TUTOR}
                          onAction={(action, id) => console.log(action, id)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">
                        No upcoming sessions
                      </h3>
                      <p className="text-muted-foreground">
                        Update your availability to get more bookings.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="mt-6">
                  {completedBookings.length > 0 ? (
                    <div className="space-y-4">
                      {completedBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          userType={Roles.TUTOR}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        No completed sessions yet.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  {tutorReviews.length > 0 ? (
                    <div className="space-y-4">
                      {tutorReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No reviews yet.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Your Profile
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hourly Rate</span>
                    <span className="font-medium text-foreground">
                      ${currentTutor.hourlyRate}/hr
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subjects</span>
                    <span className="font-medium text-foreground">
                      {currentTutor.subjects.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Total Sessions
                    </span>
                    <span className="font-medium text-foreground">
                      {currentTutor.totalSessions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviews</span>
                    <span className="font-medium text-foreground">
                      {currentTutor.reviewCount}
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/tutor/profile">Edit Profile</Link>
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Link
                    href="/tutor/availability"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Update Availability</span>
                  </Link>
                  <Link
                    href="/tutor/profile"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-foreground">Edit Profile</span>
                  </Link>
                  <Link
                    href={`/tutors/${currentTutor.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <Star className="w-5 h-5 text-primary" />
                    <span className="text-foreground">View Public Profile</span>
                  </Link>
                </div>
              </div>

              {/* Earnings Overview */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Earnings Overview
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Week</span>
                    <span className="font-medium text-foreground">$320</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="font-medium text-foreground">$1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-medium text-gradient-primary">
                      ${totalEarnings}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorDashboard;

"use client";

import { Calendar, DollarSign, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import BookingCard from "../../student/dashboard/BookingCard";
import ReviewCard from "@/components/dashboard/ReviewCard";
import StatCard from "@/components/dashboard/StatCard";
import { Roles } from "@/constants/roles";
import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";
import { Booking, BookingStatus, User } from "@/lib/types";

const TutorDashboard = ({ userData }: { userData: User }) => {
  const {
    data: myBookings,
    refetch,
    isLoading,
  } = useQuery(apiRoutes.bookings.getByTutor(userData.id), {});

  const {
    data: tutorStats,
    refetch: refetchStats,
    isLoading: isLoadingStats,
  } = useQuery(apiRoutes.dashboard.tutorStats, {});

  const { data: reviews, isLoading: isLoadingReviews } = useQuery(
    apiRoutes.tutor.getReviews,
    {},
  );

  console.log("Tutor stats:", tutorStats);
  console.log("Reviews:", reviews);

  console.log("Fetched tutor bookings:", myBookings);

  const tutorReviews = reviews?.data;
  console.log("Tutor reviews:", tutorReviews);
  const upcomingBookings = myBookings?.data?.filter(
    (b) => b.status === BookingStatus.CONFIRMED,
  );
  console.log("Upcoming bookings:", upcomingBookings);
  const completedBookings = myBookings?.data?.filter(
    (b) => b.status === BookingStatus.COMPLETED,
  );

  const handleBookingAction = (action: string, booking: Booking) => {
    console.log(`Action: ${action} on Booking ID: ${booking.id}`);
    if (action === "completed") {
      refetch();
      refetchStats();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {isLoadingStats ? (
              <>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </>
            ) : (
              <>
                <StatCard
                  title="Upcoming Sessions"
                  value={tutorStats?.data?.upcomingSessions || 0}
                  icon={Calendar}
                />
                <StatCard
                  title="Total Earnings"
                  value={`$${tutorStats?.data?.totalEarnings?.toFixed(2) || "0.00"}`}
                  icon={DollarSign}
                />
                <StatCard
                  title="Rating"
                  value={tutorStats?.data?.totalRating?.toFixed(2) || "0.00"}
                  icon={Star}
                />
                <StatCard
                  title="Total Students"
                  value={tutorStats?.data?.totalStudents || 0}
                  icon={Users}
                />
              </>
            )}
          </div>

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
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ) : upcomingBookings?.length > 0 ? (
                    <div className="space-y-3">
                      {upcomingBookings.map((booking) => (
                        <BookingCard
                          key={booking.id}
                          booking={booking}
                          userType={Roles.TUTOR}
                          onAction={(action, booking) =>
                            handleBookingAction(action, booking)
                          }
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
                  {isLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-32 w-full" />
                      <Skeleton className="h-32 w-full" />
                    </div>
                  ) : completedBookings?.length > 0 ? (
                    <div className="space-y-3">
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
                  {isLoadingReviews ? (
                    <div className="space-y-3">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ) : tutorReviews?.length > 0 ? (
                    <div className="space-y-3">
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

            <div className="space-y-3">
              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Your Profile
                </h3>
                {isLoadingStats ? (
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-10 w-full mt-4" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Hourly Rate
                        </span>
                        <span className="font-medium text-foreground">
                          ${tutorStats?.data?.hourlyRate}/hr
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subjects</span>
                        <span className="font-medium text-foreground">
                          {tutorStats?.data?.subjectCount || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Sessions
                        </span>
                        <span className="font-medium text-foreground">
                          {tutorStats?.data?.totalSessions || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reviews</span>
                        <span className="font-medium text-foreground">
                          {tutorStats?.data?.totalReviews || 0}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href="/tutor/profile">Edit Profile</Link>
                    </Button>
                  </>
                )}
              </div>

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
                    href={`/tutors/${userData.id}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <Star className="w-5 h-5 text-primary" />
                    <span className="text-foreground">View Public Profile</span>
                  </Link>
                </div>
              </div>

              <div className="glass-card rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Earnings Overview
                </h3>
                {isLoadingStats ? (
                  <div className="space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">This Week</span>
                      <span className="font-medium text-foreground">
                        ${tutorStats?.data?.thisWeekEarnings || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-medium text-foreground">
                        ${tutorStats?.data?.thisMonthEarnings || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-medium text-gradient-primary">
                        ${tutorStats?.data?.totalEarnings || 0}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorDashboard;

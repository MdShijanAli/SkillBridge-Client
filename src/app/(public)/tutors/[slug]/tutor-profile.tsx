"use client";

import {
  Star,
  CheckCircle,
  Clock,
  Globe,
  GraduationCap,
  Calendar,
  MessageSquare,
  Video,
  ArrowLeft,
  Users,
  Award,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";
import ReviewCard from "@/components/dashboard/ReviewCard";
import { TutorData } from "@/lib/types";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { apiRoutes } from "@/api/apiRoutes";
import { storeItem } from "@/services/api.service";
import { FieldError } from "@/components/ui/field";

// Booking form schema
const bookingSchema = z.object({
  scheduleDate: z.string().min(1, "Please select a date"),
  scheduleTime: z.string().min(1, "Please select a time"),
  duration: z.number().min(30, "Minimum duration is 30 minutes"),
  price: z.string().min(1, "Price is required"),
  tutorId: z.string().min(1, "Tutor ID is required"),
  subject: z.string().min(1, "Please select a subject"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const TutorProfile = ({ tutorData }: { tutorData: TutorData }) => {
  console.log("Rendering TutorProfile with data:", tutorData);
  const form = useForm({
    defaultValues: {
      scheduleDate: "",
      scheduleTime: "",
      duration: 60,
      price: String(tutorData?.tutorProfile?.hourlyRate || 0),
      tutorId: tutorData?.id || "",
      subject: "",
    } as BookingFormData,
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Booking your session...");
      try {
        const response = await storeItem({
          endpoint: apiRoutes.bookings.create,
          data: value,
        });

        console.log("Booking response:", response);

        if (!response.success) {
          throw new Error(response.message || "Failed to book session");
        }

        toast.success(
          `Successfully booked a session with ${tutorData.name} on ${new Date(
            value.scheduleDate,
          ).toLocaleDateString()} at ${value.scheduleTime} for ${value.duration} minutes!`,
          { id: toastId },
        );

        // Reset form
        form.reset();
      } catch (error) {
        console.error("Booking error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to book session",
          { id: toastId },
        );
      }
    },
  });

  const activeSlots =
    tutorData?.tutorProfile?.availability?.filter((slot) => slot.isActive) ||
    [];

  const availableDaysOfWeek = Array.from(
    new Set(activeSlots.map((slot) => slot.dayOfWeek)),
  );

  const availableDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date;
  })
    .filter((date) => {
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();
      return availableDaysOfWeek.includes(dayName);
    })
    .map((date) => ({
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      dayOfWeek: date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase(),
    }));

  const getTimeSlotsForDate = (dateString: string) => {
    if (!dateString) return [];

    const selectedDateObj = availableDates.find((d) => d.value === dateString);
    if (!selectedDateObj) return [];

    const dayOfWeek = selectedDateObj.dayOfWeek;
    return activeSlots
      .filter((slot) => slot.dayOfWeek === dayOfWeek)
      .map((slot) => ({
        value: slot.startTime,
        label: `${slot.startTime} - ${slot.endTime}`,
        slot,
      }));
  };

  if (!tutorData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-24 pb-16 max-w-6xl px-5 mx-auto text-center">
          <div className="glass-card rounded-xl p-12 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Tutor not found
            </h1>
            <p className="text-muted-foreground mb-6">
              The tutor you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link href="/tutors">Browse Tutors</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl px-5 mx-auto">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tutors
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card rounded-xl p-6 md:p-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Avatar className="h-28 w-28 ring-4 ring-primary/20">
                      <AvatarImage
                        src={tutorData.image || ""}
                        alt={tutorData.name}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-400 text-primary-foreground text-2xl font-bold">
                        {tutorData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {tutorData.emailVerified && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
                        <CheckCircle className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                        {tutorData.name}
                      </h1>
                      {tutorData.emailVerified && (
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-primary font-medium mt-1">
                      {tutorData?.tutorProfile?.specialization}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <div className="flex items-center gap-1 bg-accent/10 px-3 py-1 rounded-full">
                        <Star className="w-5 h-5 text-accent fill-accent" />
                        <span className="font-bold text-foreground">
                          {tutorData?.tutorProfile?.averageRating}
                        </span>
                        <span className="text-muted-foreground">
                          ({tutorData?.tutorProfile?.totalReviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>
                          {tutorData?.tutorProfile?.yearsExperience}+ years
                          experience
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Award className="w-4 h-4" />
                        <span>
                          {tutorData?.tutorProfile?.totalSessions} sessions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                {(tutorData?.tutorProfile?.categories.length ?? 0) > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">
                      Categories:
                    </span>
                    {tutorData?.tutorProfile?.categories.map((categoryName) => {
                      return (
                        <Link
                          key={categoryName.id}
                          href={`/tutors?category=${encodeURIComponent(categoryName?.category?.name || "")}`}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                        >
                          <span>{categoryName?.category?.icon}</span>
                          {categoryName?.category?.name}
                        </Link>
                      );
                    })}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {tutorData?.tutorProfile?.subjects.map((subject) => (
                    <Badge
                      key={subject}
                      variant="secondary"
                      className="text-sm"
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <Tabs defaultValue="about" className="glass-card rounded-xl p-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="reviews">
                    Reviews ({tutorData?.tutorProfile?.totalReviews || 0})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-6 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">
                      About Me
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {tutorData?.bio}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Education
                        </p>
                        <p className="font-medium text-foreground">
                          {tutorData?.tutorProfile?.education}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Languages
                        </p>
                        <p className="font-medium text-foreground">
                          {tutorData?.tutorProfile?.languages.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="text-center p-4 rounded-lg bg-secondary/50">
                      <div className="text-2xl font-bold text-foreground">
                        {tutorData?.tutorProfile?.totalSessions}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sessions
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/50">
                      <div className="text-2xl font-bold text-foreground">
                        {tutorData?.tutorProfile?.averageRating}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Rating
                      </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/50">
                      <div className="text-2xl font-bold text-foreground">
                        {tutorData?.tutorProfile?.totalReviews}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Reviews
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="availability" className="mt-6">
                  <div className="space-y-3">
                    <p className="text-muted-foreground mb-4">
                      {tutorData?.name}'s regular availability:
                    </p>
                    {tutorData?.tutorProfile?.availability.map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <span className="font-medium text-foreground">
                            {slot.dayOfWeek}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {slot.startTime} - {slot.endTime}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  {tutorData?.receivedReviews?.length > 0 ? (
                    <div className="space-y-3">
                      {tutorData.receivedReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        No reviews yet. Be the first to review!
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <div className="glass-card rounded-xl p-6 sticky top-24">
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <span className="text-4xl font-bold text-gradient-primary">
                      ${tutorData?.tutorProfile?.hourlyRate}
                    </span>
                    <span className="text-muted-foreground text-lg">/hour</span>
                  </div>

                  <form.Subscribe
                    selector={(state) => ({
                      scheduleDate: state.values.scheduleDate,
                      scheduleTime: state.values.scheduleTime,
                      duration: state.values.duration,
                    })}
                    children={({ scheduleDate, scheduleTime, duration }) => {
                      const availableTimeSlots =
                        getTimeSlotsForDate(scheduleDate);
                      const totalPrice = (
                        (tutorData?.tutorProfile?.hourlyRate ?? 0) *
                        (duration / 60)
                      ).toFixed(2);

                      return (
                        <div className="space-y-3">
                          {/* Subject Selection */}
                          <form.Field
                            name="subject"
                            validators={{
                              onChange: bookingSchema.shape.subject,
                            }}
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <div>
                                  <label className="text-sm font-medium text-foreground mb-2 block">
                                    Select Subject *
                                  </label>
                                  <Select
                                    value={
                                      field.state.value
                                        ? String(field.state.value)
                                        : undefined
                                    }
                                    onValueChange={(val) => {
                                      field.handleChange(val);
                                      form.setFieldValue("price", totalPrice);
                                    }}
                                  >
                                    <SelectTrigger className="bg-secondary/50">
                                      <SelectValue placeholder="Choose a subject" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {tutorData?.tutorProfile?.subjects?.map(
                                        (cat: any, index: number) => (
                                          <SelectItem
                                            key={index}
                                            value={String(cat)}
                                          >
                                            <span className="flex items-center gap-2">
                                              {cat}
                                            </span>
                                          </SelectItem>
                                        ),
                                      )}
                                    </SelectContent>
                                  </Select>
                                  {isInvalid && (
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  )}
                                </div>
                              );
                            }}
                          />

                          {/* Date Selection */}
                          <form.Field
                            name="scheduleDate"
                            validators={{
                              onChange: bookingSchema.shape.scheduleDate,
                            }}
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <div>
                                  <label className="text-sm font-medium text-foreground mb-2 block">
                                    Select Date *
                                  </label>
                                  <Select
                                    value={field.state.value}
                                    onValueChange={(date) => {
                                      field.handleChange(date);
                                      form.setFieldValue("scheduleTime", "");
                                    }}
                                  >
                                    <SelectTrigger className="bg-secondary/50">
                                      <SelectValue placeholder="Choose a date" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {availableDates.length > 0 ? (
                                        availableDates.map((date) => (
                                          <SelectItem
                                            key={date.value}
                                            value={date.value}
                                          >
                                            {date.label}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <SelectItem value="no-dates" disabled>
                                          No available dates
                                        </SelectItem>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  {isInvalid && (
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  )}
                                </div>
                              );
                            }}
                          />

                          {/* Time Selection */}
                          <form.Field
                            name="scheduleTime"
                            validators={{
                              onChange: bookingSchema.shape.scheduleTime,
                            }}
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <div>
                                  <label className="text-sm font-medium text-foreground mb-2 block">
                                    Select Time *
                                  </label>
                                  <Select
                                    value={field.state.value}
                                    onValueChange={field.handleChange}
                                    disabled={
                                      !scheduleDate ||
                                      availableTimeSlots.length === 0
                                    }
                                  >
                                    <SelectTrigger className="bg-secondary/50">
                                      <SelectValue placeholder="Choose a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {availableTimeSlots.length > 0 ? (
                                        availableTimeSlots.map((timeSlot) => (
                                          <SelectItem
                                            key={`${timeSlot.slot.id}-${timeSlot.value}`}
                                            value={timeSlot.value}
                                          >
                                            {timeSlot.label}
                                          </SelectItem>
                                        ))
                                      ) : (
                                        <SelectItem value="no-times" disabled>
                                          {scheduleDate
                                            ? "No available times"
                                            : "Select a date first"}
                                        </SelectItem>
                                      )}
                                    </SelectContent>
                                  </Select>
                                  {isInvalid && (
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  )}
                                </div>
                              );
                            }}
                          />

                          {/* Duration Selection */}
                          <form.Field
                            name="duration"
                            validators={{
                              onChange: bookingSchema.shape.duration,
                            }}
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched &&
                                !field.state.meta.isValid;
                              return (
                                <div>
                                  <label className="text-sm font-medium text-foreground mb-2 block">
                                    Duration *
                                  </label>
                                  <Select
                                    value={String(field.state.value)}
                                    onValueChange={(val) => {
                                      field.handleChange(Number(val));
                                      const newPrice = (
                                        (tutorData?.tutorProfile?.hourlyRate ??
                                          0) *
                                        (Number(val) / 60)
                                      ).toFixed(2);
                                      form.setFieldValue("price", newPrice);
                                    }}
                                  >
                                    <SelectTrigger className="bg-secondary/50">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="30">
                                        30 minutes
                                      </SelectItem>
                                      <SelectItem value="60">
                                        60 minutes
                                      </SelectItem>
                                      <SelectItem value="90">
                                        90 minutes
                                      </SelectItem>
                                      <SelectItem value="120">
                                        120 minutes
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  {isInvalid && (
                                    <FieldError
                                      errors={field.state.meta.errors}
                                    />
                                  )}
                                </div>
                              );
                            }}
                          />

                          {/* Price Display */}
                          {scheduleDate && scheduleTime && (
                            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                              <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">
                                  Session Total
                                </span>
                                <span className="text-2xl font-bold text-foreground">
                                  ${totalPrice}
                                </span>
                              </div>
                            </div>
                          )}

                          <form.Subscribe
                            selector={(state) => [
                              state.canSubmit,
                              state.isSubmitting,
                            ]}
                            children={([canSubmit, isSubmitting]) => (
                              <Button
                                type="submit"
                                variant="hero"
                                className="w-full"
                                size="lg"
                                disabled={!canSubmit || isSubmitting}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                {isSubmitting ? "Booking..." : "Book Session"}
                              </Button>
                            )}
                          />
                        </div>
                      );
                    }}
                  />

                  <div className="mt-6 pt-6 border-t border-border space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Video className="w-4 h-4 text-primary" />
                      <span>Sessions conducted via video call</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>100% satisfaction guarantee</span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorProfile;

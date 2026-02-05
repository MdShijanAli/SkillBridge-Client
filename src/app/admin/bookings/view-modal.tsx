"use client";

import { apiRoutes } from "@/api/apiRoutes";
import { BaseModal } from "@/components/modals/base-modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/lib/types";
import { fetchDetails } from "@/services/api.service";
import { useEffect, useState } from "react";

interface BookingDetailsModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  bookingId: string | number | null;
}

export default function BookingDetailsModal({
  open,
  onClose,
  bookingId,
}: BookingDetailsModalProps) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  useEffect(() => {
    if (!bookingId) return;
    const fetchBooking = async () => {
      setIsBookingLoading(true);
      try {
        const url = apiRoutes.bookings.getById(Number(bookingId));
        const response = await fetchDetails({ endpoint: url });
        console.log("Fetched booking details:", response);
        setBooking(response.data);
      } catch (error) {
        console.error("Failed to fetch booking details:", error);
      } finally {
        setIsBookingLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  return (
    <BaseModal
      open={open}
      onOpenChange={() => onClose(false)}
      title="Booking Details"
      size="2xl"
      showSubmitButton={false}
      loading={isBookingLoading}
      closeButtonText="Close"
    >
      <div className="space-y-6">
        {!booking && !isBookingLoading && (
          <p className="text-center text-sm text-gray-500">
            No booking data found
          </p>
        )}

        {booking && (
          <div className="space-y-6">
            {/* Status and Price Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-xs text-gray-500 mb-1">Booking Status</p>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase
                  ${
                    booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700"
                          : booking.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Session Price</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${booking.price}
                </p>
              </div>
            </div>

            {/* Schedule Information */}
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Schedule Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Date</p>
                  <p className="font-medium text-gray-900">
                    {new Date(booking.scheduleDate).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Time</p>
                  <p className="font-medium text-gray-900">
                    {booking.scheduleTime}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Duration</p>
                  <p className="font-medium text-gray-900">
                    {booking.duration} minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Student Information */}
            <Card className="border-l-4 border-purple-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                    {booking.student?.name?.charAt(0).toUpperCase()}
                  </span>
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Name</p>
                    <p className="font-medium text-gray-900">
                      {booking.student?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Email</p>
                    <p className="font-medium text-gray-900">
                      {booking.student?.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">
                      {booking.student?.phone || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Location</p>
                    <p className="font-medium text-gray-900">
                      {booking.student?.location || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Status</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          booking.student?.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {booking.student?.is_active ? "Active" : "Inactive"}
                      </span>
                      {booking.student?.is_banned && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                          Banned
                        </span>
                      )}
                    </div>
                  </div>
                  {booking.student?.bio && (
                    <div className="md:col-span-2">
                      <p className="text-gray-500 mb-1">Bio</p>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                        {booking.student.bio}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Tutor Information */}
            <Card className="border-l-4 border-orange-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">
                    {booking.tutor?.name?.charAt(0).toUpperCase()}
                  </span>
                  Tutor Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 mb-1">Name</p>
                      <p className="font-medium text-gray-900">
                        {booking.tutor?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-900">
                        {booking.tutor?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Phone</p>
                      <p className="font-medium text-gray-900">
                        {booking.tutor?.phone || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Location</p>
                      <p className="font-medium text-gray-900">
                        {booking.tutor?.location || "—"}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            booking.tutor?.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {booking.tutor?.is_active ? "Active" : "Inactive"}
                        </span>
                        {booking.tutor?.is_banned && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Banned
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tutor Profile Details */}
                  {booking.tutor?.tutorProfile && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">
                        Professional Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg">
                          <p className="text-green-700 text-xs mb-1">
                            Hourly Rate
                          </p>
                          <p className="font-bold text-green-900 text-lg">
                            ${booking.tutor.tutorProfile.hourlyRate}/hr
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg">
                          <p className="text-blue-700 text-xs mb-1">
                            Experience
                          </p>
                          <p className="font-bold text-blue-900 text-lg">
                            {booking.tutor.tutorProfile.yearsExperience} years
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-3 rounded-lg">
                          <p className="text-yellow-700 text-xs mb-1">
                            Average Rating
                          </p>
                          <p className="font-bold text-yellow-900 text-lg">
                            ⭐ {booking.tutor.tutorProfile.averageRating}
                          </p>
                          <p className="text-xs text-yellow-700 mt-1">
                            {booking.tutor.tutorProfile.totalReviews} reviews
                          </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg">
                          <p className="text-purple-700 text-xs mb-1">
                            Total Sessions
                          </p>
                          <p className="font-bold text-purple-900 text-lg">
                            {booking.tutor.tutorProfile.totalSessions || 0}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-gray-500 mb-1">Specialization</p>
                          <p className="font-medium text-gray-900">
                            {booking.tutor.tutorProfile.specialization}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-gray-500 mb-1">Education</p>
                          <p className="font-medium text-gray-900">
                            {booking.tutor.tutorProfile.education || "—"}
                          </p>
                        </div>
                        {booking.tutor.tutorProfile.languages &&
                          booking.tutor.tutorProfile.languages.length > 0 && (
                            <div>
                              <p className="text-gray-500 mb-2">Languages</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.tutor.tutorProfile.languages.map(
                                  (lang, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                                    >
                                      {lang}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        {booking.tutor.tutorProfile.subjects &&
                          booking.tutor.tutorProfile.subjects.length > 0 && (
                            <div>
                              <p className="text-gray-500 mb-2">Subjects</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.tutor.tutorProfile.subjects.map(
                                  (subject, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700"
                                    >
                                      {subject}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        {(booking.tutor.tutorProfile.isVerified ||
                          booking.tutor.tutorProfile.isFeatured) && (
                          <div className="md:col-span-2">
                            <p className="text-gray-500 mb-2">Badges</p>
                            <div className="flex flex-wrap gap-2">
                              {booking.tutor.tutorProfile.isVerified && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                  ✓ Verified
                                </span>
                              )}
                              {booking.tutor.tutorProfile.isFeatured && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                                  ⭐ Featured
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tutor Bio */}
                  {booking.tutor?.bio && (
                    <div className="border-t pt-4">
                      <p className="text-gray-500 mb-1">Bio</p>
                      <p className="text-gray-900 bg-gray-50 p-3 rounded-md">
                        {booking.tutor.bio}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Session Notes */}
            {booking.sessionNotes && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Session Notes
                </h3>
                <p className="text-sm text-gray-700">{booking.sessionNotes}</p>
              </div>
            )}

            {/* Cancellation Information */}
            {booking.status === "CANCELLED" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-red-900 mb-2">
                  Cancellation Details
                </h3>
                <div className="space-y-2 text-sm">
                  {booking.cancellationReason && (
                    <div>
                      <p className="text-red-700 font-medium">Reason:</p>
                      <p className="text-red-700">
                        {booking.cancellationReason}
                      </p>
                    </div>
                  )}
                  {booking.cancelledBy && (
                    <div>
                      <p className="text-red-700">
                        <span className="font-medium">Cancelled by:</span>{" "}
                        {booking.cancelledBy}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Completion Information */}
            {booking.completedAt && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-green-900 mb-2">
                  Completion Details
                </h3>
                <p className="text-sm text-green-700">
                  <span className="font-medium">Completed at:</span>{" "}
                  {new Date(booking.completedAt).toLocaleString()}
                </p>
              </div>
            )}

            {/* Timestamps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-4 border-t">
              <div>
                <p className="text-gray-500 mb-1">Booking Created</p>
                <p className="text-gray-900">
                  {new Date(booking.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Last Updated</p>
                <p className="text-gray-900">
                  {new Date(booking.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseModal>
  );
}

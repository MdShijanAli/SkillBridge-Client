import { useState } from "react";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Booking } from "@/lib/types";
import { toast } from "sonner";
import { BaseModal } from "@/components/modals/base-modal";
import { storeItem } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";

interface ReviewDialogProps {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => boolean;
}

const ReviewDialog = ({
  booking,
  open,
  onOpenChange,
  onSuccess,
}: ReviewDialogProps) => {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!booking) return;

    if (comment.trim().length < 10) {
      toast.error("Please write at least 10 characters for your review.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await storeItem({
        endpoint: apiRoutes.reviews.create,
        data: {
          bookingId: booking.id,
          rating,
          comment,
          tutorId: booking?.tutor?.id,
        },
      });
      if (!response.success) {
        toast.error(
          response.error || "Failed to submit review. Please try again.",
        );

        return;
      }
      console.log("Review API response:", response);
      toast.success("Review submitted successfully!");

      // Reset form
      setRating(5);
      setComment("");
      setIsSubmitting(false);
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error submitting review:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(5);
    setComment("");
    onOpenChange(false);
  };

  if (!booking) return null;

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title="Leave a Review"
      showCloseButton={true}
      closeButtonText="Cancel"
      closeButtonVariant="outline"
      onClose={handleClose}
      showSubmitButton={true}
      submitButtonText="Submit Review"
      submitButtonVariant="default"
      onSubmit={handleSubmit}
      submitButtonDisabled={comment.trim().length < 10}
      isSubmitting={isSubmitting}
      size="md"
    >
      <div className="space-y-2 mb-4">
        <p className="text-sm text-muted-foreground">
          Share your experience with {booking?.tutor?.name} for your{" "}
          {booking?.category?.name} session.
        </p>
      </div>

      <div className="space-y-3">
        {/* Star Rating */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "text-accent fill-accent"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </p>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Review</label>
          <Textarea
            placeholder="Share details about your learning experience, the tutor's teaching style, and what you liked..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            {comment.length}/500 characters (minimum 10)
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

export default ReviewDialog;

"use client";

import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Review } from "@/lib/data";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 relative">
      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />

      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < review.rating ? "text-accent fill-accent" : "text-muted"}`}
          />
        ))}
      </div>

      <p className="text-muted-foreground leading-relaxed mb-6">
        "{review.comment}"
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={review.studentAvatar}
            alt={review.studentName}
            className="object-cover"
          />
          <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
            {review.studentName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h4 className="font-medium text-foreground text-sm">
            {review.studentName}
          </h4>
          <span className="text-xs text-muted-foreground">{review.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

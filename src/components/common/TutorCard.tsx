"use client";

import { Star, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TutorData } from "@/lib/types";

interface TutorCardProps {
  tutor: TutorData;
}

const TutorCard = ({ tutor }: TutorCardProps) => {
  console.log("Rendering TutorCard for tutor:", tutor);

  return (
    <div
      className={`glass-card rounded-xl p-6 hover-lift transition-all duration-300 ${tutor?.is_featured ? "ring-2 ring-primary/30 shadow-lg shadow-primary/10" : ""}`}
    >
      {tutor.is_featured && (
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-gradient-to-r from-accent to-orange-400 text-accent-foreground border-0">
            ⭐ Featured
          </Badge>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="relative">
          <Avatar className="h-16 w-16 ring-2 ring-primary/20">
            <AvatarImage
              src={tutor.image || ""}
              alt={tutor.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-primary to-cyan-400 text-primary-foreground font-semibold">
              {tutor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {tutor.emailVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-2 ring-background">
              <CheckCircle className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate text-lg">
            {tutor.name}
          </h3>
          <p className="text-sm text-primary font-medium">
            {tutor?.tutorProfile?.specialization}
          </p>

          <div className="flex items-center gap-3 mt-2">
            {(tutor.tutorProfile?.totalReviews ?? 0) > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-semibold text-foreground">
                  {tutor.tutorProfile?.averageRating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({tutor.tutorProfile?.totalReviews})
                </span>
              </div>
            )}

            {(tutor?.tutorProfile?.yearsExperience ?? 0) > 0 && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {tutor?.tutorProfile?.yearsExperience}+ years
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {tutor?.tutorProfile?.bio}
      </p>

      {/* Categories */}
      {(tutor?.tutorProfile?.categories?.length ?? 0) > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tutor?.tutorProfile?.categories.slice(0, 2).map((categoryName) => {
            return (
              <div
                key={categoryName.id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
              >
                <span>{categoryName?.category?.icon}</span>
                {categoryName?.category?.name}
              </div>
            );
          })}
          {(tutor?.tutorProfile?.categories.length ?? 0) > 2 && (
            <span className="text-xs text-muted-foreground px-2 py-0.5">
              +{tutor?.tutorProfile?.categories.length! - 2} more
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {tutor?.tutorProfile?.subjects?.slice(0, 3).map((subject) => (
          <Badge
            key={subject}
            variant="secondary"
            className="text-xs font-medium"
          >
            {subject}
          </Badge>
        ))}
        {(tutor?.tutorProfile?.subjects?.length ?? 0) > 3 && (
          <Badge variant="secondary" className="text-xs font-medium">
            +{(tutor?.tutorProfile?.subjects?.length ?? 0) - 3} more
          </Badge>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
        {tutor?.tutorProfile?.hourlyRate && (
          <div>
            <span className="text-2xl font-bold text-gradient-primary">
              ${tutor?.tutorProfile?.hourlyRate}
            </span>
            <span className="text-muted-foreground text-sm">/hour</span>
          </div>
        )}

        <Button asChild className="shadow-lg shadow-primary/20">
          <Link href={`/tutors/${tutor.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default TutorCard;

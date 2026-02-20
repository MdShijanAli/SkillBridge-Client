"use client";

import { CheckCircle, Clock, Shield, Star } from "lucide-react";

export default function TrustBadge() {
  return (
    <section className="py-5 border-y border-border/50 bg-card/30">
      <div className="max-w-6xl px-5 mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Verified Tutors</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Star className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">5-Star Reviews</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Flexible Scheduling</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="text-sm font-medium">Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}

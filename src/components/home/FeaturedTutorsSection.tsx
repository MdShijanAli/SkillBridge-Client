"use client";

import Link from "next/link";
import { Award, ArrowRight, Star, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredTutors = [
  {
    id: 1,
    name: "Sarah Johnson",
    subject: "Mathematics",
    rating: 4.9,
    reviews: 156,
    hourlyRate: 45,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    verified: true,
    students: 89,
    expertise: ["Calculus", "Algebra", "Statistics"],
  },
  {
    id: 2,
    name: "David Chen",
    subject: "Programming",
    rating: 5.0,
    reviews: 203,
    hourlyRate: 60,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    verified: true,
    students: 142,
    expertise: ["JavaScript", "React", "Node.js"],
  },
  {
    id: 3,
    name: "Emily Martinez",
    subject: "English",
    rating: 4.8,
    reviews: 128,
    hourlyRate: 40,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    verified: true,
    students: 76,
    expertise: ["Grammar", "Writing", "Literature"],
  },
];

export function FeaturedTutorsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl px-5 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Award className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Top Rated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured <span className="text-gradient-primary">Tutors</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Learn from our top-rated, verified expert tutors with proven track
              records
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:border-primary/30 shrink-0"
            asChild
          >
            <Link href="/tutors">
              View All Tutors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTutors.map((tutor) => (
            <Link key={tutor.id} href={`/tutors/${tutor.id}`} className="group">
              <div className="glass-card p-6 rounded-2xl border border-border/50 hover:border-primary/30 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 h-full">
                <div className="flex items-start gap-3 mb-4">
                  <div className="relative">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-16 h-16 rounded-xl ring-2 ring-primary/20"
                    />
                    {tutor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center ring-2 ring-background">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tutor.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {tutor.subject}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-sm font-semibold text-foreground">
                          {tutor.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({tutor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.expertise.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Users className="w-4 h-4" />
                    <span>{tutor.students} students</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">
                      ${tutor.hourlyRate}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      per hour
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-gradient-to-r from-primary to-cyan-400 hover:from-primary/90 hover:to-cyan-400/90 text-white"
                  size="sm"
                >
                  Book Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

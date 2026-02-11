"use client";

import Link from "next/link";
import { Award, ArrowRight, Star, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";
import TutorCard from "../common/TutorCard";
import { TutorData } from "@/lib/types";

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
  const { data: tutors, isLoading } = useQuery(apiRoutes.tutor.getAll, {
    is_featured: true,
  });

  console.log("Is Featued tutor list", tutors);
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-card/50 to-background">
      <div className="max-w-6xl px-5 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Tutors
            </h2>
            <p className="mt-4 text-muted-foreground">
              Learn from our top-rated, verified expert tutors.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/tutors">
              View All Tutors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors?.data?.slice(0, 3)?.map((tutor: TutorData, index: number) => (
            <div
              key={tutor.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TutorCard tutor={tutor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

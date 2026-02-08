"use client";

import Link from "next/link";
import { Target, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Mathematics",
    icon: "📐",
    tutors: 89,
    color: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
  },
  {
    id: 2,
    name: "Science",
    icon: "🔬",
    tutors: 67,
    color: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/20",
  },
  {
    id: 3,
    name: "Languages",
    icon: "🌍",
    tutors: 124,
    color: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-500/20",
  },
  {
    id: 4,
    name: "Programming",
    icon: "💻",
    tutors: 98,
    color: "from-orange-500/10 to-red-500/10",
    border: "border-orange-500/20",
  },
  {
    id: 5,
    name: "Business",
    icon: "💼",
    tutors: 56,
    color: "from-indigo-500/10 to-blue-500/10",
    border: "border-indigo-500/20",
  },
  {
    id: 6,
    name: "Arts",
    icon: "🎨",
    tutors: 43,
    color: "from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/20",
  },
  {
    id: 7,
    name: "Music",
    icon: "🎵",
    tutors: 38,
    color: "from-amber-500/10 to-yellow-500/10",
    border: "border-amber-500/20",
  },
  {
    id: 8,
    name: "Test Prep",
    icon: "📚",
    tutors: 71,
    color: "from-teal-500/10 to-cyan-500/10",
    border: "border-teal-500/20",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-6xl px-5 mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Popular Categories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Explore by <span className="text-gradient-primary">Subject</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our wide range of subjects and find the perfect tutor for
            your learning journey
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/tutors?category=${category.name.toLowerCase()}`}
              className="group"
            >
              <div
                className={`glass-card p-6 rounded-2xl border ${category.border} bg-gradient-to-br ${category.color} hover:scale-105 transition-all duration-300 cursor-pointer h-full`}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {category.tutors} tutors
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:border-primary/30"
            asChild
          >
            <Link href="/tutors">
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

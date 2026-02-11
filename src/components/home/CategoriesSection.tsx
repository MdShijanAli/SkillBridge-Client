"use client";

import Link from "next/link";
import { Target, Users, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRoutes } from "@/api/apiRoutes";
import { useQuery } from "@/hooks/useQuery";

const categoryIcons: Record<string, string> = {
  Mathematics: "📐",
  Science: "🔬",
  Languages: "🌍",
  Programming: "💻",
  Music: "🎵",
  Business: "📈",
  "Art & Design": "🎨",
  Arts: "🎨",
  "Test Prep": "📝",
};

const categoryColors = [
  {
    color: "from-blue-500/10 to-cyan-500/10",
    border: "border-blue-500/20",
  },
  {
    color: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/20",
  },
  {
    color: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-500/20",
  },
  {
    color: "from-orange-500/10 to-red-500/10",
    border: "border-orange-500/20",
  },
  {
    color: "from-indigo-500/10 to-blue-500/10",
    border: "border-indigo-500/20",
  },
  {
    color: "from-pink-500/10 to-rose-500/10",
    border: "border-pink-500/20",
  },
  {
    color: "from-amber-500/10 to-yellow-500/10",
    border: "border-amber-500/20",
  },
  {
    color: "from-teal-500/10 to-cyan-500/10",
    border: "border-teal-500/20",
  },
];

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count: {
    tutorCategories: number;
  };
  tutorsCount: number;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    prevPage: string | null;
    nextPage: string | null;
  };
}

export function CategoriesSection() {
  const {
    data: categoriesResponse,
    isLoading,
    isError,
  } = useQuery<CategoriesResponse>(apiRoutes.categories.getAll, {
    page: 1,
    limit: 8,
  });

  const categories =
    categoriesResponse?.data?.filter((cat) => cat.isActive).slice(0, 8) || [];
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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-destructive text-lg">
              Failed to load categories. Please try again later.
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No active categories found.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-3">
              {categories.map((category, index) => {
                const colorScheme =
                  categoryColors[index % categoryColors.length];
                return (
                  <Link
                    key={category.id}
                    href={`/tutors?category=${encodeURIComponent(category.name)}`}
                    className="group"
                  >
                    <div
                      className={`glass-card p-6 rounded-2xl border ${colorScheme.border} bg-gradient-to-br ${colorScheme.color} hover:scale-105 transition-all duration-300 cursor-pointer h-full`}
                    >
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {categoryIcons[category.name] || category.icon || "📚"}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {category.tutorsCount}{" "}
                        {category.tutorsCount === 1 ? "tutor" : "tutors"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-border/50 hover:border-primary/30"
            asChild
          >
            <Link href="/categories">
              View All Categories
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

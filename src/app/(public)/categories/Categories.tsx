"use client";

import { apiRoutes } from "@/api/apiRoutes";
import { useQuery } from "@/hooks/useQuery";
import { ArrowRight, Users, BookOpen, TrendingUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const categoryIcons: Record<string, string> = {
  Mathematics: "📐",
  Science: "🔬",
  Languages: "🌍",
  Programming: "💻",
  Music: "🎵",
  Business: "📈",
  "Art & Design": "🎨",
  "Test Prep": "📝",
};

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

const Categories = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);

  const {
    data: categoriesResponse,
    isLoading,
    isError,
  } = useQuery<CategoriesResponse>(apiRoutes.categories.getAll, {
    page,
    limit,
  });

  console.log("Fetched categories:", categoriesResponse);

  const categories =
    categoriesResponse?.data?.filter((cat) => cat.isActive) || [];
  const pagination = categoriesResponse?.pagination;

  const totalTutors = categories.reduce((sum, cat) => sum + cat.tutorsCount, 0);
  const totalCategories = pagination?.totalItems || categories.length;

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-24 pb-12 hero-pattern">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore <span className="text-gradient-primary">Categories</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Find expert tutors across a wide range of subjects. Whether you're
              looking to master mathematics, learn a new language, or dive into
              programming, we have the right tutor for you.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{totalCategories}</p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{totalTutors}+</p>
                  <p className="text-sm text-muted-foreground">Expert Tutors</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/tutors?category=${encodeURIComponent(category.name)}`}
                    className="group glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50 hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">
                        {categoryIcons[category.name] || category.icon || "📚"}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">
                        {category.tutorsCount}
                      </span>
                      <span className="text-muted-foreground">
                        {category.tutorsCount === 1 ? "tutor" : "tutors"}{" "}
                        available
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={!pagination.prevPage || isLoading}
                    className="px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-muted-foreground">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={!pagination.nextPage || isLoading}
                    className="px-6 py-2 rounded-xl border border-border hover:bg-muted transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Popular Subjects Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Subjects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are the most sought-after subjects on our platform
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Calculus",
              "Python",
              "Spanish",
              "Physics",
              "Piano",
              "SAT Prep",
              "JavaScript",
              "French",
              "Statistics",
              "Data Structures",
              "Chemistry",
              "Guitar",
              "TOEFL",
              "Linear Algebra",
              "Business Strategy",
            ].map((subject) => (
              <Link
                key={subject}
                href={`/tutors?search=${encodeURIComponent(subject)}`}
                className="px-4 py-2 rounded-full bg-background border border-border hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium"
              >
                {subject}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-border/50">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't Find Your Subject?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're constantly adding new categories and tutors. Let us know
              what subject you're looking for and we'll help you find the
              perfect tutor.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Browse All Tutors
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border hover:bg-muted transition-colors font-medium"
              >
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;

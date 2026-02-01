"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { tutors, categories } from "@/lib/data";
import { useSearchParams } from "next/navigation";
import TutorCard from "@/components/common/TutorCard";
import { PaginationMeta, TutorData } from "@/lib/types";

interface BrowseTutorsProps {
  tutorData: {
    data: TutorData[];
    message: string;
    pagination: PaginationMeta;
    success: boolean;
  };
}

const BrowseTutors = ({ tutorData }: BrowseTutorsProps) => {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get("category") || "";
  const tutorsLists = tutorData?.data || [];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("rating");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const activeFiltersCount = [
    selectedCategory,
    priceRange[0] > 0 || priceRange[1] < 200,
    verifiedOnly,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 200]);
    setVerifiedOnly(false);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          Category
        </label>
        <Select
          value={selectedCategory || "all"}
          onValueChange={(val) => setSelectedCategory(val === "all" ? "" : val)}
        >
          <SelectTrigger className="bg-card">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.name}>
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  {cat.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          Price Range
        </label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            min={0}
            max={200}
            step={5}
            className="mt-2"
          />
          <div className="flex justify-between mt-3 text-sm">
            <span className="text-primary font-semibold">${priceRange[0]}</span>
            <span className="text-muted-foreground">to</span>
            <span className="text-primary font-semibold">
              ${priceRange[1]}/hr
            </span>
          </div>
        </div>
      </div>

      {/* Verified Only */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
        <Checkbox
          id="verified"
          checked={verifiedOnly}
          onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
        />
        <label
          htmlFor="verified"
          className="text-sm text-foreground cursor-pointer flex-1"
        >
          Verified tutors only
        </label>
        <Badge variant="secondary" className="text-xs">
          Recommended
        </Badge>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Find Your Perfect Tutor
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{tutorsLists.length} tutors available</span>
              {selectedCategory && (
                <>
                  <span>•</span>
                  <Badge variant="secondary">{selectedCategory}</Badge>
                </>
              )}
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, subject, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border text-base"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 h-12 bg-card">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">⭐ Highest Rated</SelectItem>
                <SelectItem value="reviews">💬 Most Reviews</SelectItem>
                <SelectItem value="price-low">💰 Price: Low to High</SelectItem>
                <SelectItem value="price-high">
                  💎 Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden h-12 relative">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">
                      {activeFiltersCount} active
                    </Badge>
                  )}
                </div>
                <FilterContent />
              </div>
            </aside>

            {/* Tutor Grid */}
            <div className="flex-1">
              {tutorsLists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tutorsLists.map((tutor, index) => (
                    <div
                      key={tutor.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <TutorCard tutor={tutor} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 glass-card rounded-xl">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No tutors found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseTutors;

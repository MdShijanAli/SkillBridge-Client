# Browse Tutors Component with Caching Example

This document demonstrates how to implement intelligent caching in a tutors browsing component using the `useQuery` hook.

## Benefits of Caching

- **First load**: Fetches from API
- **Subsequent loads**: Instant display from cache (within 5 minutes)
- **Stale data**: Shows old data immediately while fetching fresh data in background
- **Auto-refresh**: When admin adds new tutor via `invalidateTutorCache()`
- **Better UX**: No loading spinners after first load

---

## Complete Component Example

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TutorCard from "@/components/common/TutorCard";
import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";
import { TutorData } from "@/lib/types";

const BrowseTutorsWithCache = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);

  const queryParams = {
    search: searchQuery,
    categoryId: selectedCategory,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sortBy: "averageRating",
    sortOrder: "desc" as const,
  };

  // ✅ Categories cached for 10 minutes
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    apiRoutes.categories.getAll,
    {},
    {
      cacheTime: 10 * 60 * 1000, // Categories don't change often - cache for 10 minutes
      staleWhileRevalidate: true, // Show old data while fetching new
    },
  );

  // ✅ Tutors cached for 5 minutes
  const {
    data: tutorData,
    isLoading: tutorsLoading,
    isError,
    error,
    refetch, // Manual refetch if needed
    invalidateCache, // Invalidate only this query's cache
  } = useQuery(apiRoutes.tutor.getAll, queryParams, {
    cacheTime: 5 * 60 * 1000, // Tutors change more often - cache for 5 minutes
    staleWhileRevalidate: true,
  });

  const tutorsLists = tutorData?.data || [];

  // Optional: Force refresh button
  const handleForceRefresh = () => {
    refetch(true); // Skip cache and fetch fresh data
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 pb-16">
        <div className="max-w-6xl px-5 mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold">Find Your Perfect Tutor</h1>

            {/* Optional: Manual refresh button */}
            <Button variant="outline" onClick={handleForceRefresh} size="sm">
              Refresh
            </Button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <Input
              placeholder="Search tutors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Tutor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tutorsLoading ? (
              <div>Loading...</div>
            ) : tutorsLists.length > 0 ? (
              tutorsLists.map((tutor: TutorData) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))
            ) : (
              <div>No tutors found</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowseTutorsWithCache;
```

---

## How the Cache Works

### 1. First Visit

- Fetches categories from API (10 min cache)
- Fetches tutors from API (5 min cache)
- Shows loading state
- Stores data in cache

### 2. Subsequent Visits (within cache time)

- ✅ Instantly shows cached categories
- ✅ Instantly shows cached tutors
- ✅ No loading state!
- ✅ Instant page load

### 3. After Cache Expires (Stale-While-Revalidate)

- Shows old (stale) data immediately
- Fetches fresh data in background
- Updates UI when fresh data arrives
- **User never sees loading state!**

### 4. When Admin Adds New Tutor

- Admin calls `invalidateTutorCache()` after adding
- This component's cache is cleared
- Next fetch gets fresh data with new tutor
- Automatic refresh without manual intervention

### 5. Manual Refresh

- User clicks "Refresh" button
- Skips cache and fetches fresh data
- Forces immediate data reload

---

## Cache Configuration Options

```typescript
const { data } = useQuery(apiRoute, params, {
  cacheTime: 5 * 60 * 1000, // How long to cache (5 minutes)
  staleWhileRevalidate: true, // Show stale data while fetching
  useCache: true, // Enable/disable caching
  enabled: true, // Enable/disable query
  refetchOnMount: true, // Refetch on component mount
});
```

---

## Best Practices

### ✅ DO

- Cache static data longer (categories: 10-15 min)
- Cache dynamic data shorter (tutors: 3-5 min)
- Use `staleWhileRevalidate` for better UX
- Invalidate cache after mutations (add/edit/delete)

### ❌ DON'T

- Cache user-specific data (or use very short TTL)
- Forget to invalidate cache after updates
- Use very long cache times for frequently changing data
- Disable `staleWhileRevalidate` unless necessary

---

## Related Functions

```typescript
// From useQuery
const { data, refetch, invalidateCache } = useQuery(...);

// From cache-utils
import { invalidateTutorCache } from "@/lib/cache-utils";
invalidateTutorCache(); // Clear all tutor cache
```

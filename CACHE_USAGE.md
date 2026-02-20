# Cache Control System - Usage Guide

## Overview

This project implements a reusable cache control system that caches API responses and automatically revalidates when data changes.

## Features

- ✅ Automatic caching with configurable TTL
- ✅ Stale-while-revalidate pattern
- ✅ Pattern-based cache invalidation
- ✅ Manual cache invalidation
- ✅ Cache statistics

## Basic Usage

### 1. Using useQuery with Caching (Default)

```typescript
import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";

// Automatically caches for 5 minutes
const { data, isLoading, error, refetch, invalidateCache } = useQuery(
  apiRoutes.tutor.getAll,
  { category: "math" },
);
```

### 2. Custom Cache Configuration

```typescript
// Cache for 10 minutes
const { data } = useQuery(
  apiRoutes.categories.getAll,
  {},
  {
    cacheTime: 10 * 60 * 1000, // 10 minutes
    staleWhileRevalidate: true,
  },
);

// Disable caching for specific queries
const { data } = useQuery(apiRoutes.user.profile, {}, { useCache: false });
```

## Cache Invalidation

### Option 1: Using Cache Utils (Recommended)

```typescript
import {
  invalidateTutorCache,
  invalidateCategoryCache,
  invalidateReviewCache,
} from "@/lib/cache-utils";

// After adding a new tutor
const handleAddTutor = async (tutorData) => {
  await addTutor(tutorData);
  invalidateTutorCache(); // Clear all tutor-related cache
};

// After adding a new category
const handleAddCategory = async (categoryData) => {
  await addCategory(categoryData);
  invalidateCategoryCache(); // Clear all category-related cache
};
```

### Option 2: Using invalidateCache from useQuery

```typescript
const { data, invalidateCache } = useQuery(apiRoutes.tutor.getAll);

const handleUpdate = async () => {
  await updateTutor(data);
  invalidateCache(); // Clear this specific query's cache
};
```

### Option 3: Pattern-based Invalidation

```typescript
import { cacheManager } from "@/lib/cache-manager";

// Invalidate all tutor endpoints
cacheManager.invalidatePattern(/tutor/i);

// Invalidate specific routes
cacheManager.invalidatePattern(/api\/tutors\/\d+/);
```

## Complete Examples

### Example 1: Browse Tutors with Cache

```typescript
"use client";

import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";
import { invalidateTutorCache } from "@/lib/cache-utils";

const BrowseTutors = () => {
  const {
    data: tutorData,
    isLoading,
    refetch
  } = useQuery(
    apiRoutes.tutor.getAll,
    { category: "math" },
    {
      cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
      staleWhileRevalidate: true // Show old data while fetching new
    }
  );

  return (
    <div>
      {tutorData?.data?.map(tutor => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
};
```

### Example 2: Admin Panel - Add Tutor

```typescript
"use client";

import { invalidateTutorCache } from "@/lib/cache-utils";
import { storeItem } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";

const AddTutorForm = () => {
  const handleSubmit = async (formData) => {
    try {
      await storeItem({
        endpoint: apiRoutes.tutor.create,
        data: formData
      });

      // Invalidate tutor cache so all tutor lists refresh
      invalidateTutorCache();

      toast.success("Tutor added successfully!");
    } catch (error) {
      toast.error("Failed to add tutor");
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Example 3: Categories with Cache

```typescript
"use client";

import { useQuery } from "@/hooks/useQuery";
import { apiRoutes } from "@/api/apiRoutes";
import { invalidateCategoryCache } from "@/lib/cache-utils";

const CategoriesPage = () => {
  const {
    data: categories,
    isLoading,
    refetch
  } = useQuery(
    apiRoutes.categories.getAll,
    {},
    {
      cacheTime: 10 * 60 * 1000, // Cache for 10 minutes
    }
  );

  const handleAddCategory = async (newCategory) => {
    await addCategory(newCategory);

    // Clear category cache to show new category
    invalidateCategoryCache();
  };

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {categories?.data?.map(cat => (
        <div key={cat.id}>{cat.name}</div>
      ))}
    </div>
  );
};
```

### Example 4: Multiple Queries with Cache

```typescript
const Dashboard = () => {
  // Each query is cached independently
  const { data: tutors } = useQuery(apiRoutes.tutor.getAll);
  const { data: categories } = useQuery(apiRoutes.categories.getAll);
  const { data: reviews } = useQuery(apiRoutes.reviews.getAll);

  return (
    <div>
      <TutorsList tutors={tutors?.data} />
      <CategoriesList categories={categories?.data} />
      <ReviewsList reviews={reviews?.data} />
    </div>
  );
};
```

## Cache Configuration Options

| Option                 | Type    | Default        | Description                                 |
| ---------------------- | ------- | -------------- | ------------------------------------------- |
| `cacheTime`            | number  | 300000 (5 min) | How long to cache data in milliseconds      |
| `staleWhileRevalidate` | boolean | true           | Return stale data while fetching fresh data |
| `useCache`             | boolean | true           | Enable/disable caching for this query       |
| `enabled`              | boolean | true           | Enable/disable the query                    |
| `refetchOnMount`       | boolean | true           | Refetch when component mounts               |

## Cache Utilities Reference

### Invalidation Functions

```typescript
import {
  invalidateTutorCache, // Clear all tutor cache
  invalidateCategoryCache, // Clear all category cache
  invalidateReviewCache, // Clear all review cache
  invalidateUserCache, // Clear all user cache
  invalidateBookmarkCache, // Clear all bookmark cache
  invalidateCache, // Clear specific cache
  invalidateAllCache, // Clear all cache (use on logout)
  getCacheStats, // Get cache statistics
} from "@/lib/cache-utils";
```

### Direct Cache Manager Access

```typescript
import { cacheManager } from "@/lib/cache-manager";

// Get cached data
const data = cacheManager.get("cache-key");

// Set cached data
cacheManager.set("cache-key", data, 60000); // 1 minute TTL

// Check if valid
const isValid = cacheManager.isValid("cache-key");

// Invalidate by pattern
cacheManager.invalidatePattern(/pattern/);

// Get all cache keys
const keys = cacheManager.getKeys();
```

## Best Practices

1. **Cache static data longer**: Categories, settings (10-15 minutes)
2. **Cache dynamic data shorter**: Tutors, reviews (3-5 minutes)
3. **Don't cache user-specific data**: Profile, bookmarks (or use very short TTL)
4. **Always invalidate after mutations**: Create, update, delete operations
5. **Use stale-while-revalidate for better UX**: Users see instant results

## When to Invalidate Cache

✅ **After creating** new items → Invalidate list cache
✅ **After updating** items → Invalidate item and list cache
✅ **After deleting** items → Invalidate list cache
✅ **On user logout** → Invalidate all cache
✅ **On authentication errors (401)** → Automatically cleared

## Debugging

```typescript
import { getCacheStats } from "@/lib/cache-utils";

// Check cache statistics
const stats = getCacheStats();
console.log(stats);
// { total: 10, valid: 7, stale: 3 }

// See all cached keys
import { cacheManager } from "@/lib/cache-manager";
console.log(cacheManager.getKeys());
```

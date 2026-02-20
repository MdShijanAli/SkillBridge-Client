# Cache Invalidation Examples

This document provides practical examples of how to invalidate cache when performing CRUD operations on tutors and categories.

## Overview

When you add, update, or delete data, you must invalidate the related cache to ensure all components display fresh data. Use the helper functions from `@/lib/cache-utils` to easily invalidate cache.

## Import Required Utilities

```typescript
import { storeItem } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";
import {
  invalidateTutorCache,
  invalidateCategoryCache,
} from "@/lib/cache-utils";
import { toast } from "sonner";
```

---

## Example 1: Add New Tutor

When adding a new tutor, invalidate the tutor cache so all tutor lists refresh.

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export const AddTutorExample = () => {
  const [loading, setLoading] = useState(false);

  const handleAddTutor = async (tutorData: any) => {
    setLoading(true);
    try {
      // Add the tutor to database
      await storeItem({
        endpoint: apiRoutes.tutor.create,
        data: tutorData,
      });

      // ✅ Invalidate tutor cache - this clears ALL tutor-related cache
      // Any component using useQuery for tutors will automatically refetch
      invalidateTutorCache();

      toast.success("Tutor added successfully!");
    } catch (error) {
      toast.error("Failed to add tutor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={() => handleAddTutor({ name: "New Tutor" })}
      disabled={loading}
    >
      Add Tutor
    </Button>
  );
};
```

---

## Example 2: Add New Category

When adding a new category, invalidate the category cache.

```typescript
"use client";

import { Button } from "@/components/ui/button";

export const AddCategoryExample = () => {
  const handleAddCategory = async (categoryData: any) => {
    try {
      await storeItem({
        endpoint: apiRoutes.categories.create,
        data: categoryData,
      });

      // ✅ Invalidate category cache
      // All category lists across the app will now show fresh data
      invalidateCategoryCache();

      toast.success("Category added successfully!");
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  return (
    <Button onClick={() => handleAddCategory({ name: "Mathematics" })}>
      Add Category
    </Button>
  );
};
```

---

## Example 3: Edit Tutor

When updating a tutor, invalidate the cache to show updated data.

```typescript
"use client";

import { Button } from "@/components/ui/button";

export const EditTutorExample = () => {
  const handleEditTutor = async (tutorId: string, tutorData: any) => {
    try {
      await storeItem({
        endpoint: `${apiRoutes.tutor.update}/${tutorId}`,
        data: tutorData,
      });

      // ✅ Invalidate tutor cache after editing
      invalidateTutorCache();

      toast.success("Tutor updated successfully!");
    } catch (error) {
      toast.error("Failed to update tutor");
    }
  };

  return (
    <Button onClick={() => handleEditTutor("123", { name: "Updated Tutor" })}>
      Edit Tutor
    </Button>
  );
};
```

---

## Example 4: Delete Tutor

When deleting a tutor, invalidate the cache to remove them from all lists.

```typescript
"use client";

import { Button } from "@/components/ui/button";

export const DeleteTutorExample = () => {
  const handleDeleteTutor = async (tutorId: string) => {
    try {
      await storeItem({
        endpoint: `${apiRoutes.tutor.delete}/${tutorId}`,
        data: {},
      });

      // ✅ Invalidate tutor cache after deletion
      invalidateTutorCache();

      toast.success("Tutor deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete tutor");
    }
  };

  return (
    <Button variant="destructive" onClick={() => handleDeleteTutor("123")}>
      Delete Tutor
    </Button>
  );
};
```

---

## Key Takeaways

1. **Always invalidate cache after mutations** (create, update, delete)
2. **Use specific invalidation functions** (`invalidateTutorCache()`, `invalidateCategoryCache()`)
3. **Invalidation is automatic** - components using `useQuery` will automatically refetch
4. **No manual refresh needed** - the cache system handles everything

## Available Invalidation Functions

```typescript
import {
  invalidateTutorCache, // Clear all tutor cache
  invalidateCategoryCache, // Clear all category cache
  invalidateReviewCache, // Clear all review cache
  invalidateUserCache, // Clear all user cache
  invalidateBookmarkCache, // Clear all bookmark cache
} from "@/lib/cache-utils";
```

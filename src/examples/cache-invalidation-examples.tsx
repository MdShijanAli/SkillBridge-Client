// Example: Admin Add Tutor/Category with Cache Invalidation

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storeItem } from "@/services/api.service";
import { apiRoutes } from "@/api/apiRoutes";
import {
  invalidateTutorCache,
  invalidateCategoryCache,
} from "@/lib/cache-utils";
import { toast } from "sonner";

// Example 1: Add New Tutor
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

// Example 2: Add New Category
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

// Example 3: Edit Tutor
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

// Example 4: Delete Tutor
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

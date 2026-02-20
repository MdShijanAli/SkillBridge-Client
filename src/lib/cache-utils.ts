"use client";

import { cacheManager } from "./cache-manager";
import { apiRoutes } from "@/api/apiRoutes";

/**
 * Invalidate all tutor-related cache entries
 * Call this after adding, updating, or deleting a tutor
 */
export const invalidateTutorCache = () => {
  cacheManager.invalidatePattern(/tutor/i);
  console.log("Invalidated all tutor cache entries");
};

/**
 * Invalidate all category-related cache entries
 * Call this after adding, updating, or deleting a category
 */
export const invalidateCategoryCache = () => {
  cacheManager.invalidatePattern(/categor/i);
  console.log("Invalidated all category cache entries");
};

/**
 * Invalidate all bookmark-related cache entries
 * Call this after adding or removing bookmarks
 */
export const invalidateBookmarkCache = () => {
  cacheManager.invalidatePattern(/bookmark/i);
  console.log("Invalidated all bookmark cache entries");
};

/**
 * Invalidate all review-related cache entries
 * Call this after adding, updating, or deleting a review
 */
export const invalidateReviewCache = () => {
  cacheManager.invalidatePattern(/review/i);
  console.log("Invalidated all review cache entries");
};

/**
 * Invalidate all user-related cache entries
 * Call this after updating user data
 */
export const invalidateUserCache = () => {
  cacheManager.invalidatePattern(/user/i);
  console.log("Invalidated all user cache entries");
};

/**
 * Invalidate specific cache entry
 */
export const invalidateCache = (
  route: string,
  params?: Record<string, any>,
) => {
  if (params) {
    // Invalidate all variations of this route
    cacheManager.invalidatePattern(new RegExp(route.replace(/\//g, "\\/")));
  } else {
    cacheManager.invalidate(route);
  }
  console.log("Invalidated cache for:", route);
};

/**
 * Invalidate all cache
 * Use sparingly - only when necessary (e.g., logout)
 */
export const invalidateAllCache = () => {
  cacheManager.invalidateAll();
  console.log("Invalidated all cache entries");
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  return cacheManager.getStats();
};

"use client";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheConfig {
  ttl?: number; // Time to live in milliseconds (default: 5 minutes)
  staleWhileRevalidate?: boolean; // Return stale data while fetching fresh data
}

class CacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes default

  /**
   * Get data from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }

    return entry.data as T;
  }

  /**
   * Check if cache entry is valid (not expired)
   */
  isValid(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    return Date.now() < entry.expiresAt;
  }

  /**
   * Check if cache entry is stale (exists but expired)
   */
  isStale(key: string): boolean {
    const entry = this.cache.get(key);

    if (!entry) {
      return false;
    }

    return Date.now() >= entry.expiresAt;
  }

  /**
   * Set data in cache
   */
  set<T>(key: string, data: T, ttl?: number): void {
    const timeToLive = ttl || this.defaultTTL;
    const now = Date.now();

    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + timeToLive,
    });
  }

  /**
   * Invalidate specific cache entry
   */
  invalidate(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Invalidate cache entries matching a pattern
   */
  invalidatePattern(pattern: string | RegExp): void {
    const regex = typeof pattern === "string" ? new RegExp(pattern) : pattern;

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Invalidate all cache entries
   */
  invalidateAll(): void {
    this.cache.clear();
  }

  /**
   * Get all cache keys
   */
  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const keys = this.getKeys();
    const valid = keys.filter((key) => this.isValid(key)).length;
    const stale = keys.filter((key) => this.isStale(key)).length;

    return {
      total: keys.length,
      valid,
      stale,
    };
  }
}

// Singleton instance
export const cacheManager = new CacheManager();

// Cache key utilities
export const createCacheKey = (route: string, params?: Record<string, any>) => {
  if (!params || Object.keys(params).length === 0) {
    return route;
  }

  const sortedParams = Object.keys(params)
    .sort()
    .reduce(
      (acc, key) => {
        const value = params[key];
        if (value !== undefined && value !== null && value !== "") {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, any>,
    );

  return `${route}?${JSON.stringify(sortedParams)}`;
};

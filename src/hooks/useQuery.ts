"use client";

import { useState, useEffect } from "react";
import { cacheManager, createCacheKey } from "@/lib/cache-manager";

interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isError: boolean;
}

interface UseQueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
  cacheTime?: number; // Time to cache in milliseconds (default: 5 minutes)
  staleWhileRevalidate?: boolean; // Return stale data while fetching fresh data (default: true)
  useCache?: boolean; // Enable/disable caching (default: true)
}

export function useQuery<T = any>(
  apiRoute: string,
  params?: Record<string, any>,
  options: UseQueryOptions = {},
) {
  const {
    enabled = true,
    refetchOnMount = true,
    cacheTime = 5 * 60 * 1000, // 5 minutes default
    staleWhileRevalidate = true,
    useCache = true,
  } = options;

  const [state, setState] = useState<QueryState<T>>({
    data: null,
    isLoading: enabled,
    error: null,
    isError: false,
  });

  const fetchData = async (signal?: AbortSignal, skipCache = false) => {
    const cacheKey = createCacheKey(apiRoute, params);

    // Check cache first if enabled
    if (useCache && !skipCache) {
      const cachedData = cacheManager.get<T>(cacheKey);

      if (cachedData && cacheManager.isValid(cacheKey)) {
        // Cache hit - return cached data
        console.log("Cache hit for:", cacheKey);
        setState({
          data: cachedData,
          isLoading: false,
          error: null,
          isError: false,
        });
        return;
      }

      // Stale-while-revalidate: Return stale data immediately, fetch in background
      if (
        staleWhileRevalidate &&
        cachedData &&
        cacheManager.isStale(cacheKey)
      ) {
        console.log("Returning stale data while revalidating:", cacheKey);
        setState({
          data: cachedData,
          isLoading: false,
          error: null,
          isError: false,
        });
        // Continue to fetch fresh data in background
      } else {
        setState((prev) => ({ ...prev, isLoading: true }));
      }
    } else {
      setState((prev) => ({ ...prev, isLoading: true }));
    }

    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, String(value));
          }
        });
      }

      const queryString = queryParams.toString();
      const url = queryString ? `${apiRoute}?${queryString}` : apiRoute;

      console.log("Fetching data from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        signal,
        cache: "no-store",
      });

      console.log("Received response:", response);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Store in cache if enabled
      if (useCache) {
        cacheManager.set(cacheKey, data, cacheTime);
        console.log("Cached data for:", cacheKey);
      }

      setState({
        data,
        isLoading: false,
        error: null,
        isError: false,
      });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error("Error fetching data:", errorMessage);
        setState({
          data: null,
          isLoading: false,
          error: errorMessage,
          isError: true,
        });
      }
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    fetchData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [apiRoute, JSON.stringify(params), enabled, refetchOnMount]);

  const refetch = async (skipCache = true) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await fetchData(undefined, skipCache);
    } catch (error) {
      console.error("Error during refetch:", error);
    }
  };

  const invalidateCache = () => {
    const cacheKey = createCacheKey(apiRoute, params);
    cacheManager.invalidate(cacheKey);
    console.log("Invalidated cache for:", cacheKey);
  };

  return {
    ...state,
    refetch,
    invalidateCache,
  };
}

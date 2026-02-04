"use client";

import { useState, useEffect } from "react";

interface QueryState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isError: boolean;
}

interface UseQueryOptions {
  enabled?: boolean;
  refetchOnMount?: boolean;
}

export function useQuery<T = any>(
  apiRoute: string,
  params?: Record<string, any>,
  options: UseQueryOptions = {},
) {
  const { enabled = true, refetchOnMount = true } = options;

  const [state, setState] = useState<QueryState<T>>({
    data: null,
    isLoading: enabled,
    error: null,
    isError: false,
  });

  useEffect(() => {
    if (!enabled) return;

    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        // Build query string from params
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
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (isMounted) {
          setState({
            data,
            isLoading: false,
            error: null,
            isError: false,
          });
        }
      } catch (error) {
        if (
          isMounted &&
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
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

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [apiRoute, JSON.stringify(params), enabled, refetchOnMount]);

  const refetch = () => {
    setState((prev) => ({ ...prev, isLoading: true }));
  };

  return {
    ...state,
    refetch,
  };
}

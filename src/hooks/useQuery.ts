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

  const fetchData = async (signal?: AbortSignal) => {
    setState((prev) => ({ ...prev, isLoading: true }));

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

  const refetch = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      await fetchData();
    } catch (error) {
      console.error("Error during refetch:", error);
    }
  };

  return {
    ...state,
    refetch,
  };
}

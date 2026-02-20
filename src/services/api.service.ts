"use client";

import { authClient } from "@/lib/auth-client";
import { invalidateAllCache } from "@/lib/cache-utils";

export interface ApiParams {
  endpoint: string;
  queryString?: string;
  data?: unknown;
}

const buildUrl = (endpoint: string, query?: string) => {
  return `${endpoint}${query ? `?${query}` : ""}`;
};

const handleUnauthorized = async () => {
  try {
    invalidateAllCache();

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  } catch (error) {
    console.error("Error during logout:", error);
    window.location.href = "/login";
  }
};

const baseFetch = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    await handleUnauthorized();
    throw { message: "Unauthorized - Session expired", status: 401 };
  }

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const fetchLists = async ({ endpoint, queryString }: ApiParams) => {
  console.log("FINAL URL:", buildUrl(endpoint));
  return baseFetch(buildUrl(endpoint, queryString));
};

export const fetchDetails = async ({ endpoint }: ApiParams) => {
  return baseFetch(buildUrl(endpoint));
};

export const storeItem = async ({ endpoint, data }: ApiParams) => {
  console.log("FINAL URL:", buildUrl(endpoint));
  console.log("Data being sent:", data);
  return baseFetch(buildUrl(endpoint), {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateItem = async ({ endpoint, data }: ApiParams) => {
  return baseFetch(buildUrl(endpoint), {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteItem = async ({ endpoint }: ApiParams) => {
  return baseFetch(buildUrl(endpoint), {
    method: "DELETE",
  });
};

export const changeStatus = async ({ endpoint, data }: ApiParams) => {
  return baseFetch(buildUrl(endpoint), {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

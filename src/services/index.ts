"use server";

import { cookies } from "next/headers";

export const serverQuery = async <T = any>(
  apiRoute: string,
  search?: string,
): Promise<{ data: T | null; error: string | null; isError: boolean }> => {
  const cookieStore = await cookies();
  try {
    const url = search
      ? `${apiRoute}?search=${encodeURIComponent(search)}`
      : apiRoute;

    const response = await fetch(url, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
      method: "GET",
    });

    if (!response.ok) {
      return {
        data: null,
        error: `Error: ${response.status} ${response.statusText}`,
        isError: true,
      };
    }

    return {
      data: await response.json(),
      error: null,
      isError: false,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
      isError: true,
    };
  }
};

export const getQuery = serverQuery;

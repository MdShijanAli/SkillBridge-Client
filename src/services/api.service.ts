"use server";

import { cookies } from "next/headers";

export interface ApiParams {
  endpoint: string;
  queryString?: string;
  data?: unknown;
  id?: string | number;
}

export const fetchLists = async ({ endpoint, queryString }: ApiParams) => {
  const cookieStore = await cookies();
  const url = new URL(`${endpoint}${queryString ? `?${queryString}` : ""}`);
  console.log("Fetching URL:", url.toString());
  const res = await fetch(url.toString(), {
    cache: "no-store",

    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.json();
};

export const fetchDetails = async ({ endpoint }: ApiParams) => {
  const cookieStore = await cookies();
  const url = `${endpoint}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    cache: "no-store",
    headers: { Cookie: cookieStore.toString() },
  });
  return res.json();
};

export const storeItem = async ({ endpoint, data }: ApiParams) => {
  try {
    const cookieStore = await cookies();
    const res = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error("Error in storeItem:", error);
    throw error;
  }
};

export const updateItem = async ({ endpoint, data }: ApiParams) => {
  const cookieStore = await cookies();
  const url = `${endpoint}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteItem = async ({ endpoint }: ApiParams) => {
  const cookieStore = await cookies();
  const url = `${endpoint}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.json();
};

export const changeStatus = async ({ endpoint, data }: ApiParams) => {
  const cookieStore = await cookies();
  const url = `${endpoint}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const banUser = async ({ endpoint, data }: ApiParams) => {
  const cookieStore = await cookies();
  const url = `${endpoint}`;
  console.log("Fetching URL:", url);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

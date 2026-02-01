"use server";

import { apiRoutes } from "@/api/apiRoutes";
import { cookies } from "next/headers";

export const getTutorProfile = async () => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(apiRoutes.tutor.profile, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
      method: "GET",
    });
    console.log("Tutor profile response status:", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching tutor profile:", error);
    return error;
  }
};

export const updateTutorProfile = async (data: any) => {
  console.log("Updating tutor profile with data:", data);
  const cookieStore = await cookies();
  try {
    const response = await fetch(apiRoutes.tutor.profile, {
      headers: {
        cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating tutor profile:", error);
    return error;
  }
};

export const createTutorProfile = async (data: any) => {
  console.log("Creating tutor profile with data:", data);
  const cookieStore = await cookies();
  try {
    const response = await fetch(apiRoutes.tutor.profile, {
      headers: {
        cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating tutor profile:", error);
    return error;
  }
};

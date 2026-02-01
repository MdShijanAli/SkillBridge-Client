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

export const createAvailabilitySlot = async (data: any) => {
  console.log("Creating availability slot with data:", data);
  const cookieStore = await cookies();
  try {
    const response = await fetch(apiRoutes.availabilities.create, {
      headers: {
        cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("Create availability slot response status:", response);
    return await response.json();
  } catch (error) {
    console.error("Error creating availability slot:", error);
    return error;
  }
};

export const updateAvailabilitySlot = async (id: number, data: any) => {
  console.log("Updating availability slot:", id, data);
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${apiRoutes.availabilities.getAll}/${id}`, {
      headers: {
        cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating availability slot:", error);
    return error;
  }
};

export const deleteAvailabilitySlot = async (id: number) => {
  console.log("Deleting availability slot:", id);
  const cookieStore = await cookies();
  try {
    const response = await fetch(`${apiRoutes.availabilities.getAll}/${id}`, {
      headers: {
        cookie: cookieStore.toString(),
      },
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting availability slot:", error);
    return error;
  }
};

export const getAllAvailabilitySlots = async (tutorProfileId: number) => {
  const cookieStore = await cookies();
  try {
    const url =
      apiRoutes.availabilities.getAll + `?tutorProfileId=${tutorProfileId}`;
    console.log("Fetching availability slots from URL:", url);
    const response = await fetch(url, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
      method: "GET",
    });
    console.log("Availability slots response status:", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching availability slots:", error);
    return error;
  }
};

export const changeAvailabilitySlotStatus = async (
  id: number,
  isActive: boolean,
) => {
  console.log("Changing availability slot status:", id, isActive);
  const cookieStore = await cookies();
  try {
    const response = await fetch(
      `${apiRoutes.availabilities.changeStatus(id)}`,
      {
        headers: {
          cookie: cookieStore.toString(),
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ isActive }),
      },
    );
    return await response.json();
  } catch (error) {
    console.error("Error changing availability slot status:", error);
    return error;
  }
};

export const getAllTutors = async () => {
  const cookieStore = await cookies();
  try {
    const response = await fetch(apiRoutes.tutor.getAll, {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "no-store",
      method: "GET",
    });
    console.log("All tutors response status:", response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching all tutors:", error);
    return error;
  }
};

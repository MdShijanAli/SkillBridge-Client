import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      // Properly format cookies for the request header
      const allCookies = cookieStore.getAll();
      const cookieHeader = allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; ");

      console.log("Cookies to send:", cookieHeader);

      const url = `${AUTH_URL}/get-session`;
      console.log("Fetching session from:", url);

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
        cache: "no-store",
      });

      const session = await res.json();
      console.log("Current session:", session);

      if (!session || !session.session) {
        return { data: null, message: "No active session" };
      }

      return {
        data: session,
        message: "Session retrieved successfully",
      };
    } catch (error: any) {
      console.error("Error fetching session:", error);
      return { data: null, error: { message: error.message } };
    }
  },
};

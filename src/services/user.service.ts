import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      console.log(
        "Retrieving session with cookies from cookie store...",
        cookieStore,
      );
      // Properly format cookies for the request header
      const allCookies = cookieStore.getAll();
      console.log("All cookies from cookie store:", allCookies);
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

      // Handle 401 Unauthorized - session is invalid or expired
      if (res.status === 401) {
        console.log("Session unauthorized (401) - treating as no session");
        return {
          data: null,
          error: { message: "Unauthorized - Session expired", status: 401 },
        };
      }

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

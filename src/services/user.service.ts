import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      console.log("Cookies:", cookieStore.get("better-auth.session_token"));
      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      console.log("Current session:", session);
      if (!session.session) {
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

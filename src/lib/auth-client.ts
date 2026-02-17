import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";
import { env } from "@/env";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: env.NEXT_PUBLIC_API_URL.replace("/api", ""),
  // Social providers should be configured on the SERVER side, not client
  plugins: [emailOTPClient()],
  fetchOptions: {
    credentials: "include",
  },
});

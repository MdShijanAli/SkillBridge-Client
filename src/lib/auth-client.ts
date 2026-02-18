import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL should point to Next.js auth proxy, not backend directly */
  baseURL:
    typeof window !== "undefined"
      ? `${window.location.origin}/api/auth`
      : "http://localhost:3000/api/auth",
  // Social providers should be configured on the SERVER side, not client
  plugins: [emailOTPClient()],
  fetchOptions: {
    credentials: "include",
  },
});

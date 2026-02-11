import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:5050",
  // Social providers should be configured on the SERVER side, not client
  plugins: [emailOTPClient()],
});

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_API: z.url(),
    FRONTEND_URL: z.url(),
    API_URL: z.url(),
    AUTH_URL: z.url(),
  },

  client: {
    NEXT_PUBLIC_TEST_VALUE: z.string(),
  },

  runtimeEnv: {
    BACKEND_API: process.env.BACKEND_API,
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_TEST_VALUE: process.env.NEXT_PUBLIC_TEST_VALUE,
  },
});

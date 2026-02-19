import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_API: z.url(),
    API_URL: z.url(),
    AUTH_URL: z.url(),
  },

  client: {
    NEXT_PUBLIC_TEST_VALUE: z.string(),
    NEXT_PUBLIC_API_URL: z.url(),
    NEXT_PUBLIC_URL: z.string().url().or(z.literal("")).optional(),
  },

  runtimeEnv: {
    BACKEND_API: process.env.BACKEND_API,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_TEST_VALUE: process.env.NEXT_PUBLIC_TEST_VALUE,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});

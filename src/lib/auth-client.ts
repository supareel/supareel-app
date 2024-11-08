import { emailOTPClient, magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [emailOTPClient(), magicLinkClient()],
});

export type Session = typeof authClient.$Infer.Session;

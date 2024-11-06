import { db } from "@/lib/db/db"; // your drizzle instance
import { schema } from "@/lib/db/schema";
import { sendAuthMagicLinkEmail } from "@/lib/sendgrid";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { emailOTP, magicLink } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    sendOnSignUp: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        // Implement the sendVerificationOTP method to send the OTP to the user's email address
        console.log(`Sending OTP to ${email}: ${otp} - ${type}`);
      },
    }),
    magicLink({
      sendMagicLink: async (data: {
        email: string;
        url: string;
        token: string;
      }) => {
        // TODO: send the magic link
        sendAuthMagicLinkEmail(data.email, data.url, data.token);
        console.log(data);
      },
    }),
  ],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
});

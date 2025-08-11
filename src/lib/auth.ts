import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance

import * as schema from "@/db/schema"; // your database schema
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema, // your database schema
  }),
  user: {
    modelName: "userTable", // the name of your user table
  },
  session: {
    modelName: "sessionTable", // the name of your session table
  },
  account: {
    modelName: "accountTable", // the name of your account table
  },
  verification: {
    modelName: "verificationTable", // the name of your verification table
  },
});

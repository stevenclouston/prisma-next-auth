import NextAuth from "next-auth";
import { createTransport } from "nodemailer";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";

import { Authsignal } from "@authsignal/node";

const authsignal = new Authsignal({
  secret: process.env.AUTHSIGNAL_TENANT_SECRET || "",
  apiBaseUrl: "https://au.api.authsignal.com/v1",
});

const prisma = new PrismaClient();

import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  callbacks: {},
  providers: [
    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
    CredentialsProvider({
      name: "webauthn",
      credentials: {},
      async authorize(cred: { authsignalToken: string }, req: any) {
        const resultToken = cred.authsignalToken;

        try {
          const result = await authsignal.validateChallenge({
            token: resultToken,
          });

          const { state, userId } = result;

          if (state === "CHALLENGE_SUCCEEDED") {
            return { id: userId, email: userId, name: "Steve" };
          }
          return null;
        } catch (e: any) {
          console.log(e);
        }
      },
    }),
  ],
  secret: process.env.SECRET,
};

export default NextAuth(authOptions);

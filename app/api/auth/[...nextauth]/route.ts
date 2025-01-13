// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import { prisma } from "/lib/prisma.ts";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "web3",
      name: "Web3",
      credentials: {
        message: {
          label: "Message",
          type: "text",
        },
        signature: {
          label: "Signature",
          type: "text",
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.message || !credentials?.signature) {
            throw new Error("Missing message or signature");
          }

          const siwe = new SiweMessage(JSON.parse(credentials.message));
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL);

          const result = await siwe.verify({
            signature: credentials.signature,
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            const user = await prisma.user.upsert({
              where: { walletAddress: siwe.address },
              update: {
                lastLogin: new Date(),
              },
              create: {
                walletAddress: siwe.address,
                name: `User ${siwe.address.slice(0, 6)}`,
              },
            });

            return {
              id: user.id,
              address: siwe.address,
              name: user.name,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        address: token.sub,
        user: {
          ...session.user,
          id: token.id,
          address: token.sub,
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.address;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});

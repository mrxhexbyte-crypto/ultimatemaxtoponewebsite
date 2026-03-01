import NextAuth from "next-auth";
import { SiweMessage } from "siwe";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"));
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: new URL(process.env.NEXTAUTH_URL).host,
            nonce: await getNonce(), // Implement this function to get a nonce from your DB
          });

          if (result.success) {
            return {
              id: siwe.address,
            };
          } else {
            return null;
          }
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.address = token.sub;
      return session;
    },
  },
});

// This is a placeholder for a function that would get a nonce from your database.
// In a real application, you would implement this to prevent replay attacks.
async function getNonce() {
  return "12345678";
}

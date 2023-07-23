import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/utils/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "jhnsmith@yahoo.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user;
        let passWordMatching = false;
        try {
          user = await prisma.user.findUnique({
            where: {
              email: credentials.username,
            },
          });
          passWordMatching = await bcrypt.compare(
            credentials.password,
            user?.password as string
          );
        } catch (err) {
          console.log(err, "authentication error");
          // Throw error
          throw new Error(err);
        }
        if (passWordMatching) {
          // Any object returned will be saved in `user` property of the JWT

          // Remove password from user object
          delete user?.password;

          return user;
        } else {
          // If you return null or false then the credentials will be rejected
          return null;
          // You can also Reject this callback with an Error or with a URL:
          // throw new Error('error message') // Redirect to error page
          // throw '/path/to/redirect'        // Redirect to a URL
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    // ...add more providers here
  ],
};
export default NextAuth(authOptions);

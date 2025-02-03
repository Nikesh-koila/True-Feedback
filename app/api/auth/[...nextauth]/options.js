import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import userModel from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        await dbConnect();

        try {
          const user = await userModel.findOne({
            $or: [
              { email: credentials.identifier },
              { userName: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("No user found! Please create account");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        (session.user._id = token._id),
          (session.user.userName = token.userName),
          (session.user.isVerified = token.isVerified),
          (session.user.isAcceptingMsg = token.isAcceptingMsg);
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        (token._id = user._id?.toString()),
          (token.userName = user.userName),
          (token.isVerified = user.isVerified),
          (token.isAcceptingMsg = user.isAcceptingMsg);
        token.isAcceptingMsg = user.isAcceptingMsg;
        token.isPasswordReset = false;
      }
      return token;
    },
  },
  page: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secrect: process.env.NEXTAUTH_SECRET,
};

// this auth
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub, google],
  trustHost: true,
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        }
        return false;
      }
      return true;
    },
    // jwt: async ({ token, user, account, profile }) => {
    //   // add user id to the token right after the user logs in
    //   if (user) {
    //     token.id = user. as string;
    //   }
    // },
  },
  theme: {
    logo: "https://authjs.dev/img/logo-sm.png",
  },
} satisfies NextAuthConfig;

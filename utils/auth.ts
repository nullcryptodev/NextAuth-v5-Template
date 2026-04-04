import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

import { AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, BETTER_AUTH_SECRET } from "./secrets"
import { find_or_create_user } from "./supabase/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: BETTER_AUTH_SECRET,
  providers: [
    Google({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,

      profile(profile) {
        return {
          name: profile.name,
          email: profile.email,
          id: profile.sub,
          image: profile.picture
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user?.name) {
        const { data, error } = await find_or_create_user({
          email: user.email,
          name: user.name,
          google_id: user.id!,
          image: user.image
        });

        if (error) {
          //toast
        }

        if (data) {
          token.userId = data.id;
          token.picture = data.profile_image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        //@ts-ignore
        session.user.id = token.userId;
        session.user.profile_image = token.picture;
      }
      return session;
    },
  },
});

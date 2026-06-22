import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              name: user.name,
              email: user.email,
              photo: user.image,
            }
          );

          user.backendToken = res.data.token;
          user.backendUser = res.data.user;
          user.isNewUser = res.data.isNewUser || false;
          
          return true;
        } catch (err) {
          console.error("Google sign in error:", err?.response?.data || err.message);
          return false;
        }
      }

      return true;
    },
    
    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.backendUser = user.backendUser;
        token.isNewUser = user.isNewUser;
      }

      return token;
    },
    
    async session({ session, token }) {
      session.backendToken = token.backendToken || null;
      session.backendUser = token.backendUser || null;
      session.isNewUser = token.isNewUser || false;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
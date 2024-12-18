import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      name: "Guest",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const guestEmail = process.env.GUEST_USER_EMAIL;
        const guestPassword = process.env.GUEST_USER_PASSWORD;

        if (
          credentials.email === guestEmail &&
          credentials.password === guestPassword
        ) {
          return { id: 1, name: "Guest User", email: guestEmail };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async signIn(message) {
      if (message.isNewUser) {
        // Handle new user sign-in
      }
    },
  },
  debug: true,
});

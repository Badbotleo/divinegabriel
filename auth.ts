import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Only these Google accounts can access the admin dashboard.
export const ALLOWED_EMAILS = [
  "gleonard591@gmail.com",
  "divine@divinegabriel.dev",
];

export function isAllowed(email?: string | null): boolean {
  return !!email && ALLOWED_EMAILS.includes(email.toLowerCase());
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [Google],
  callbacks: {
    // Reject anyone not on the allowlist at sign-in.
    async signIn({ user }) {
      return isAllowed(user.email);
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    // Send auth errors back to the dashboard, which renders its own
    // sign-in UI (avoids a redirect loop).
    signIn: "/admin",
    error: "/admin",
  },
});

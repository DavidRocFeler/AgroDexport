import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const role = (account?.params as any)?.role;
            if (role) {
                (user as any).role = role;
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as "buyer" | "supplier";
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };




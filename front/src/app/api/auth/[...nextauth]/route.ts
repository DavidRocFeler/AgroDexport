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
        async signIn({ user, account}) {
            const role = (account?.params as any)?.role;
            if (role) {
                (user as any).role = role;
            }
            return true;
        },
    },
});

export { handler as GET, handler as POST };




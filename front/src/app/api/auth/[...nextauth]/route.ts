// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient(); 

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
//     ],
//     adapter: PrismaAdapter(prisma), 
//     callbacks: {
//         async signIn({ user, account }) {
//             const role = (account?.params as any)?.role;

//             if (role) {
                
//                 try {
//                     await prisma.user.upsert({
//                         where: { email: user.email },
//                         update: { role: role },
//                         create: { 
//                             email: user.email, 
//                             name: user.name, 
//                             role: role 
//                         },
//                     });

//                     // Crear el objeto de sesión 
//                     const sessionData = {
//                         email: user.email,
//                         name: user.name,
//                     };

//                     // Enviar la sesión a la ruta 
//                     const response = await fetch('http://localhost:3000/auth/thirdsingin', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(sessionData),
//                     });

//                     if (!response.ok) {
//                         throw new Error('Failed to send session to the API');
//                     }
//                 } catch (error) {
//                     console.error("Error handling signIn:", error);
//                     return false; 
//                 }
//             }

//             return true; 
//         },
//         async jwt({ token, user, account }) {
//             if (user) {
//                 token.role = (user as any).role;
//             }
//             return token;
//         },
//         async session({ session, token }) {
//             if (token && session.user) {
//                 session.user.role = token.role as "buyer" | "supplier";
//             }
//             return session;
//         },
//     },
// });

// export { handler as GET, handler as POST };


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
            // Aquí puedes acceder al rol desde la URL de callback
            const role = (account?.params as any)?.role;
            if (role) {
                // Aquí podrías guardar el rol en tu base de datos
                // Por ahora, lo añadimos al objeto user
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




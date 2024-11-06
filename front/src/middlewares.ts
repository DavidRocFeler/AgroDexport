// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import CryptoJS from 'crypto-js';

// const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || 'tu-clave-secreta';

// const decryptData = (encryptedData: string) => {
//   try {
//     const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
//     return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   } catch {
//     return null;
//   }
// };

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const protectedRoutes = ['/userpanel', '/profile'];

//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//   if (!isProtectedRoute) {
//     return NextResponse.next();
//   }

//   const encryptedUserState = request.cookies.get('userState');

//   if (!encryptedUserState) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   const userState = decryptData(encryptedUserState.value);

//   // Verifica solo si el usuario está autenticado
//   if (!userState || !userState.isAuthenticated) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }

// // Configura las rutas que deben pasar por este middleware
// export const config = {
//   matcher: ['/userpanel/:path*', '/profile/:path*']
// };

// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // Define las rutas que requieren autenticación
// const protectedRoutes = [
//   '/userpanel',
//   '/profile',
// ]

// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('userState')
//   const pathname = request.nextUrl.pathname

//   // Verifica si la ruta actual necesita protección
//   const isProtectedRoute = protectedRoutes.some(route =>
//     pathname.startsWith(route)
//   )

//   if (isProtectedRoute && !currentUser) {
//     // Redirige al login si no hay usuario autenticado
//     const response = NextResponse.redirect(new URL('/login', request.url))
//     return response
//   }

//   return NextResponse.next()
// }

// // Configura el matcher para las rutas que quieres que pasen por el middleware
// export const config = {
//   matcher: [
//     '/userpanel/:path*',
//     '/profile/:path*',
//   ]
// }

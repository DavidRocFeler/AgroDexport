import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   // Suponiendo que tienes la información de usuario en las cookies o headers
//   const role = req.cookies.get("role_name")?.value;
//   const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";

//   console.log("Role:", role); // Para verificar el valor de role_name
//   console.log("Is Authenticated:", isAuthenticated);
//   console.log("hola:");

//   // Verifica la autenticación y el rol
//   if (!isAuthenticated || role !== "admin") {
//     return NextResponse.redirect(new URL("/home", req.url));
//   }

//   // Permite el acceso si está autenticado como administrador
//   return NextResponse.next();
// }

// // Define las rutas que quieres proteger con el middleware
// export const config = {
//   matcher: ["/admin", "/admin/:path*"],
// };

export function middleware(req: NextRequest) {
  // Obtén las cookies de autenticación y rol
  const role = req.cookies.get("role_name")?.value;
  const isAuthenticated = req.cookies.get("isAuthenticated")?.value === "true";

  // Verifica que el usuario esté autenticado y que tenga rol de "admin"
  if (!isAuthenticated || role !== "admin") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // Si está autenticado y es admin, permite el acceso
  return NextResponse.next();
}

import type { Metadata } from "next";
import "./globals.css";
import ClientWrapers from "./ClientWrapers";
import Header from "@/components/Header";
import GoogleProviders from "./GoogleProviders";
import UserProviders from "./UserProoviders";
import AuthWrapper from "./AuthWrapers";

export const metadata: Metadata = {
  title: "Agro-Dexports",
  description: "App with Next"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return(
    <html lang="en">
      <body>
        <UserProviders>
          <GoogleProviders>
            <Header/>
            <hr className="border-black border-1 "/>
            <AuthWrapper>
              {children}
            </AuthWrapper>
            <ClientWrapers/>
          </GoogleProviders>
        </UserProviders>
      </body>
    </html>
  )
}
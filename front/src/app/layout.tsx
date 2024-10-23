import type { Metadata } from "next";
import "./globals.css";
import ClientWrapers from "./ClientWrapers";
import Header from "@/components/Header";
import GoogleProviders from "./GoogleProviders";
import UserProviders from "./UserProoviders";

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
            {children}
            <ClientWrapers/>
          </GoogleProviders>
        </UserProviders>
      </body>
    </html>
  )
}
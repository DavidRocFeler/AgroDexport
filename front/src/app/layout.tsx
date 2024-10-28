import type { Metadata } from "next";
import "./globals.css";
import ClientWrapers from "./ClientWrapers";
import Header from "@/components/Header";
import GoogleProviders from "./GoogleProviders";
import AuthWrapper from "./AuthWrapers";

export const metadata: Metadata = {
  title: "Agro-Dexports",
  description: "App with Next"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return(
    <html lang="en">
      <body>
        <main>
          <GoogleProviders>
            <AuthWrapper>
              <Header/>
              <hr className="border-black border-1 "/>
                  {children}
              <ClientWrapers/>
            </AuthWrapper>
            </GoogleProviders>
          </main>
      </body>
    </html>
  )
}
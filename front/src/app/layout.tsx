import type { Metadata } from "next";
import "./globals.css";
import ClientWrapers from "./ClientWrapers";
import Header from "@/components/Header";
import GoogleProviders from "./GoogleProviders";
import AuthWrapper from "./AuthWrapers";
import AuthWrapperLoggin from "./AuthWrapersLoggin";
import GoogleWrapper from "./GoogleWrapers";

export const metadata: Metadata = {
  title: "Agro-Dexports",
  description: "App with Next",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col ">
        <main className="min-h-screen">
          <GoogleProviders>

              <Header/>
            <GoogleWrapper>
            <AuthWrapper>
              <AuthWrapperLoggin>
              <hr className="border-black border-1 "/>
                  {children}
              </AuthWrapperLoggin>
            </AuthWrapper>
            </GoogleWrapper>
            <ClientWrapers/>
            </GoogleProviders>
          </main>

      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import ClientWrapers from "./ClientWrapers";
import Header from "@/components/Header";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "Agro-Dexports",
  description: "App with Next"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return(
    <html lang="en">
      <body>
        <Providers>
        <Header/>
        <hr className="border-black border-1 "/> 
        {children}
        </Providers>
      </body>
    </html>
  )
}
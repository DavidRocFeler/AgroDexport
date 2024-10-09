import type { Metadata } from "next";
import "./globals.css";
import ClientWrapers from "./ClientWrapers";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Agro-Dexports",
  description: "App with Next"
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return(
    <html lang="en">
      <body>
        <Header/>
        <hr className="border-black border-1 "/> 
        {children}
      </body>
    </html>
  )
}
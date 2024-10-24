"use client"
import Footer from "@/components/Footer";
import FooterSecond from "@/components/FooterSecond";
import { usePathname } from "next/navigation";

export default function ClientWrapers() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    return(
        <>
            {isHomePage ? (
                <Footer/>
            ) :(
                <FooterSecond/>
            )} 
        </>
    )
}
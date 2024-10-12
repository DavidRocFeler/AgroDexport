"use client"
import React, { useRef } from "react";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css"
import SignUp from "./SignUp";

const Header = () => {
    const [ showSignUp, setShowSignUp ] = useState<boolean>(false);
    const loginRef = useRef<HTMLDivElement>(null);

    const handleShowLoggin = () => {
        setShowSignUp(true);
    }

    const handleCloseLoggin = () => {
        setShowSignUp(false);
    }
    return(
        <>
            <header className="flex flex-row p-[1.5rem] bg-[#d8fba7] ">
                <img src="/LogoTypographic.png" alt="Logo" className={styles.LogoTypo} />
                <nav className="ml-auto mr-[1rem] " >
                    <Link href="http://localhost:3000/market" className="mr-[1rem] ml-[1rem] text-[0.9rem] "> User story </Link>
                    <Link href="/membership" className="mr-[1rem] ml-[1rem] text-[0.9rem] "> Membership </Link>
                    <Link href="/p2p" className="mr-[1rem] ml-[1rem] text-[0.9rem] "> P2P </Link>
                    <Link href="/login" className="mr-[1rem] ml-[1rem] text-[0.9rem] "> Sign Up </Link>
                    <button onClick={handleShowLoggin} className="pt-[0.5rem] pb-[0.5rem] pl-[1.2rem] pr-[1.2rem] text-[0.9rem] ml-[1rem] rounded-[20px] bg-black text-white font-bold "> Log in </button>
                </nav>
            </header>
            {showSignUp && (
                <div ref={loginRef} className={styles.Overlay}>
                    <SignUp onClose={handleCloseLoggin}/>
                </div>
            )}
        </>
    )
};
export default Header
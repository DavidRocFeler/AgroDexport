"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Importa usePathname
import Link from "next/link";
import styles from "../styles/Header.module.css"; // Importa estilos
import SignUp from "./SignUp"; // Importa componente de SignUp
import LogIn from "./LogIn"; // Importa componente de LogIn

const Header: React.FC = () => {
    const pathname = usePathname(); // Obtén la ruta actual
    const isHomePage = pathname === "/"; // Comprueba si es la página de inicio

    // Estilos basados en la ruta
    const backgroundColor = isHomePage ? "#D8FBA7" : "#242424"; // Color de fondo
    const textColor = isHomePage ? "#000000" : "#D6D6D6"; // Color de texto
    const textColorButton = isHomePage ? "white" : "black"; // Color del texto del botón
    const buttonColor = isHomePage ? "#000000" : "#E9E9E9"; // Color de fondo del botón
    const logoSrc = isHomePage ? "/LogoTypographic.png" : "/LogoTypographicWhite.png"; // Logo

    const [modalType, setModalType] = useState<"login" | "signup" | null>(null); // Estado del modal

    // Funciones para manejar los modales
    const handleShowLogIn = () => {
        setModalType("login");
    };

    const handleShowSignUp = () => {
        setModalType("signup");
    };

    const handleCloseModal = () => {
        setModalType(null);
    };

    const handleSwitchModal = (type: "login" | "signup") => {
        setModalType(type);
    };

    return (
        <>
            <header className="flex flex-row p-[1.5rem]" style={{ backgroundColor }}>
                <Link href="/">
                    <img src={logoSrc} alt="Logo" className={styles.LogoTypo} />
                </Link>
                <nav className="ml-auto mr-[1rem] ">
                    <Link href="/userpanel" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                        User panel
                    </Link>
                    <Link href="/tradecontract" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                        Trade contract
                    </Link>
                    <Link href="/p2p" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                        B2B
                    </Link>
                    <button onClick={handleShowSignUp} className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                        Sign Up
                    </button>
                    <button
                        onClick={handleShowLogIn}
                        className="pt-[0.5rem] pb-[0.5rem] pl-[1.2rem] pr-[1.2rem] text-[0.9rem] ml-[1rem] rounded-[20px] font-bold"
                        style={{ backgroundColor: buttonColor, color: textColorButton }}
                    >
                        Log in
                    </button>
                </nav>
            </header>
            {modalType === "login" && (
                <div className={styles.Overlay}>
                    <LogIn 
                        onCloseLogin={handleCloseModal}
                        onSwitchToSignUp={() => handleSwitchModal("signup")}
                    />
                </div>
            )}
            {modalType === "signup" && (
                <div className={styles.Overlay}>
                    <SignUp 
                        onCloseSignUp={handleCloseModal}
                        onSwitchToLogin={() => handleSwitchModal("login")}
                    />
                </div>
            )}
        </>
    );
};

export default Header;

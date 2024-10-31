"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const router = useRouter();
    const [isHydrated, setIsHydrated] = React.useState(false);
    const { clearUser, role_name, isAuthenticated } = useUserStore();

    const backgroundColor = isHomePage ? "#D8FBA7" : "#242424";
    const textColor = isHomePage ? "#000000" : "#D6D6D6";
    const textColorButton = isHomePage ? "white" : "black";
    const buttonColor = isHomePage ? "#000000" : "#E9E9E9";
    const logoSrc = isHomePage ? "/LogoTypographic.png" : "/LogoTypographicWhite.png";

    const [modalType, setModalType] = React.useState<"login" | "signup" | null>(null);

    const handleShowLogIn = () => setModalType("login");
    const handleShowSignUp = () => {
        signOut({redirect: false});
        setModalType("signup");
    }
    const handleCloseModal = () => setModalType(null);
    const handleSwitchModal = (type: "login" | "signup") => setModalType(type);
    
    const handleLogout = async () => {
        clearUser(); 
        localStorage.removeItem("CartProduct")
        router.push('/'); 
    };

    const handleUserPanelClick = () => {
        if (!isAuthenticated) {
            handleShowLogIn(); 
        } else {
            router.push("/userpanel"); 
        }
    };

    React.useEffect(() => {
        setIsHydrated(true);
    }, []);

    if (!isHydrated) {
        return (
            <header className="flex flex-row pl-[1.5rem] pt-[2.7rem] pb-[2.7rem] " style={{ backgroundColor }}>
                <Link href="/">
                    <img src={logoSrc} alt="Logo" className={styles.LogoTypo} style={{}} />
                </Link>
            </header>
        );
    }

    const capitalizeFirstLetter = (role_name: string | null) => {
        if (!role_name) return ""; 
        return role_name.charAt(0).toUpperCase() + role_name.slice(1);
    };

    return (
        <>
            <header className="flex flex-row p-[1.5rem]" style={{ backgroundColor }}>
                <Link href="/">
                    <img src={logoSrc} alt="Logo" className={styles.LogoTypo} />
                </Link>
                <nav className="ml-auto mr-[1rem] ">
                    <button onClick={handleUserPanelClick} className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                        User panel
                    </button>
                    <Link href="/tradecontract" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                        Trade contract
                    </Link>
                    <Link href="/p2p" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                        B2B
                    </Link>
                    { isAuthenticated ? (
                        <>
                            <span className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
                                {capitalizeFirstLetter(role_name)}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="pt-[0.5rem] pb-[0.5rem] pl-[1.2rem] pr-[1.2rem] text-[0.9rem] ml-[1rem] rounded-[20px] font-bold"
                                style={{ backgroundColor: buttonColor, color: textColorButton }}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleShowSignUp}
                                className="mr-[1rem] ml-[1rem] text-[0.9rem]"
                                style={{ color: textColor }}
                            >
                                Sign Up
                            </button>
                            <button
                                onClick={handleShowLogIn}
                                className="pt-[0.5rem] pb-[0.5rem] pl-[1.2rem] pr-[1.2rem] text-[0.9rem] ml-[1rem] rounded-[20px] font-bold"
                                style={{ backgroundColor: buttonColor, color: textColorButton }}
                            >
                                Log in
                            </button>
                        </>
                    )}
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


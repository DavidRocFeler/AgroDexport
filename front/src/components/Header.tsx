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
                                { role_name }
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




// "use client";
// import React, { useState } from "react";
// import { usePathname } from "next/navigation"; // Importa usePathname
// import Link from "next/link";
// import styles from "../styles/Header.module.css"; // Importa estilos
// import SignUp from "./SignUp"; // Importa componente de SignUp
// import LogIn from "./LogIn"; // Importa componente de LogIn
// import { useRouter } from "next/navigation";
// import { useUserStore } from "@/store/useUserStore";

// const Header: React.FC = () => {
//     const pathname = usePathname(); // Obtén la ruta actual
//     const isHomePage = pathname === "/"; // Comprueba si es la página de inicio
//     const router = useRouter();
//     const userType = useUserStore((state) => state.userType); // Obtén el userType del estado global
//     const setUserType = useUserStore((state) => state.setUserType);

//     // Estilos basados en la ruta
//     const backgroundColor = isHomePage ? "#D8FBA7" : "#242424"; // Color de fondo
//     const textColor = isHomePage ? "#000000" : "#D6D6D6"; // Color de texto
//     const textColorButton = isHomePage ? "white" : "black"; // Color del texto del botón
//     const buttonColor = isHomePage ? "#000000" : "#E9E9E9"; // Color de fondo del botón
//     const logoSrc = isHomePage ? "/LogoTypographic.png" : "/LogoTypographicWhite.png"; // Logo

//     const [modalType, setModalType] = useState<"login" | "signup" | null>(null); // Estado del modal

//     // Funciones para manejar los modales
//     const handleShowLogIn = () => {
//         setModalType("login");
//     };

//     const handleShowSignUp = () => {
//         setModalType("signup");
//     };

//     const handleCloseModal = () => {
//         setModalType(null);
//     };

//     const handleSwitchModal = (type: "login" | "signup") => {
//         setModalType(type);
//     };

//     const handleLogout = () => {
//         // Elimina las cookies
//         document.cookie = 'email=; Max-Age=0; path=/'; // Elimina cookie de email
//         document.cookie = 'userType=; Max-Age=0; path=/'; // Elimina cookie de userType
//         setUserType(null); // Limpia el estado global
//         router.push('/home'); // Opcional: redirigir al usuario a la página principal después del logout
//       };

//     return (
//         <>
//             <header className="flex flex-row p-[1.5rem]" style={{ backgroundColor }}>
//                 <Link href="/">
//                     <img src={logoSrc} alt="Logo" className={styles.LogoTypo} />
//                 </Link>
//                 <nav className="ml-auto mr-[1rem] ">
//                     <Link href="/userpanel" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
//                         User panel
//                     </Link>
//                     <Link href="/tradecontract" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
//                         Trade contract
//                     </Link>
//                     <Link href="/p2p" className="mr-[1rem] ml-[1rem] text-[0.9rem]" style={{ color: textColor }}>
//                         B2B
//                     </Link>
//                     {/* Operador ternario para mostrar Log In o Log Out */}
//                     {userType ? (
//                         <button
//                             onClick={handleLogout}
//                             className="pt-[0.5rem] pb-[0.5rem] pl-[1.2rem] pr-[1.2rem] text-[0.9rem] ml-[1rem] rounded-[20px] font-bold"
//                             style={{ backgroundColor: buttonColor, color: textColorButton }}
//                         >
//                             Log out
//                         </button>
//                     ) : (
//                         <>
//                             <button
//                                 onClick={handleShowSignUp}
//                                 className="mr-[1rem] ml-[1rem] text-[0.9rem]"
//                                 style={{ color: textColor }}
//                             >
//                                 Sign Up
//                             </button>
//                             <button
//                                 onClick={handleShowLogIn}
//                                 className="pt-[0.5rem] pb-[0.5rem] pl-[1.2rem] pr-[1.2rem] text-[0.9rem] ml-[1rem] rounded-[20px] font-bold"
//                                 style={{ backgroundColor: buttonColor, color: textColorButton }}
//                             >
//                                 Log in
//                             </button>
//                         </>
//                     )}
//                 </nav>
//             </header>
//             {modalType === "login" && (
//                 <div className={styles.Overlay}>
//                     <LogIn 
//                         onCloseLogin={handleCloseModal}
//                         onSwitchToSignUp={() => handleSwitchModal("signup")}
//                     />
//                 </div>
//             )}
//             {modalType === "signup" && (
//                 <div className={styles.Overlay}>
//                     <SignUp 
//                         onCloseSignUp={handleCloseModal}
//                         onSwitchToLogin={() => handleSwitchModal("login")}
//                     />
//                 </div>
//             )}
//         </>
//     );
// };

// export default Header;

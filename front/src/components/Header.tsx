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
import useUserSettingsStore from "@/store/useUserSettingsStore";
import { useState } from "react";
import ChatBotComponent from "./ChatBot";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const router = useRouter();
  const [isHydrated, setIsHydrated] = React.useState(false);
  const { clearUser, role_name, isAuthenticated } = useUserStore();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleOpenChatbot = () => {
    setIsChatbotOpen(true);
  };
  
  const handleCloseChatbot = () => {
    setIsChatbotOpen(false);
  };

  const handleRedirectProfile = () => {
    router.push("/profile")
  } 

  const backgroundColor = isHomePage ? "#D8FBA7" : "#242424";
  const textColor = isHomePage ? "#000000" : "#D6D6D6";
  const textColorButton = isHomePage ? "white" : "black";
  const buttonColor = isHomePage ? "#000000" : "#E9E9E9";
  const logoSrc = isHomePage
    ? "/LogoTypographic.png"
    : "/LogoTypographicWhite.png";

  const [modalType, setModalType] = React.useState<"login" | "signup" | null>(
    null
  );
  const { clearUserSettings } = useUserSettingsStore();
  const userSettingsStore = useUserSettingsStore((state) => state.userSettings);

  const handleShowLogIn = () => setModalType("login");
  const handleShowSignUp = () => {
    signOut({ redirect: false });
    setModalType("signup");
  };
  const handleCloseModal = () => setModalType(null);
  const handleSwitchModal = (type: "login" | "signup") => setModalType(type);

  const handleLogout = async () => {
    clearUser();
    localStorage.removeItem("CartProduct");
    clearUserSettings();
    router.push("/");
  };

  const getFirstName = (fullName: string | undefined) => {
    if (!fullName) return "";
    return fullName.split(" ")[0];
  };

  const handleUserPanelClick = () => {
    if (!isAuthenticated) {
      handleShowLogIn();
    } else {
      router.push("/userpanel");
    }
  };

  const handleDashboardClick = () => {
    router.push("/admin")
  }

  const handleMarketClick = () => {
      router.push("/market");
  };

  React.useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <header
        className="flex flex-row pl-[1.5rem] pt-[2.7rem] pb-[2.7rem] "
        style={{ backgroundColor }}
      >
        <Link href="/">
          <img
            src={logoSrc}
            alt="Logo"
            className={styles.LogoTypo}
            style={{}}
          />
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
        <nav className="ml-auto flex items-center space-x-[2rem] mr-[1rem]">
          {role_name === "admin" ? (
            <>
            <button
              onClick={handleDashboardClick}
              className="text-[0.9rem]"
              style={{ color: textColor }}
            >
              Dashboard
            </button>
            <button
              onClick={handleRedirectProfile}
              className="text-[0.9rem]"
              style={{ color: textColor }}
            >
              Profile
            </button>
            <button
              onClick={handleOpenChatbot}
              className="text-[0.9rem]"
              style={{ color: textColor }}
            >
              Chat bot
            </button>
            </>
          ) : (
            <button
            onClick={handleUserPanelClick}
            className="text-[0.9rem]"
            style={{ color: textColor }}
          >
            User panel
          </button>
          )}
          <button
              onClick={handleMarketClick}
              className="text-[0.9rem] mr-6"
              style={{ color: textColor }}
            >
              Market
            </button>
          {/* <Link
            href="/tradecontract"
            className="text-[0.9rem]"
            style={{ color: textColor }}
          >
            Trade contract
          </Link>
          <Link
            href="/p2p"
            className="text-[0.9rem]"
            style={{ color: textColor }}
          >
            B2B
          </Link> */}
          {isAuthenticated ? (
            <>
              <div className="flex flex-col items-center">
                <span
                  className="text-[1.2rem] text-black font-bold text-center"
                  style={{ color: textColor }}
                >
                  {getFirstName(userSettingsStore?.user_name)}
                </span>
                <span
                  className="text-[0.7rem] text-gray-600" // Tamaño y color de role
                  style={{ color: textColor }}
                >
                  {capitalizeFirstLetter(role_name)}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] text-[0.9rem] rounded-[20px] font-bold"
                style={{ backgroundColor: buttonColor, color: textColorButton }}
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleShowSignUp}
                className="text-[0.9rem]"
                style={{ color: textColor }}
              >
                Sign Up
              </button>
              <button
                onClick={handleShowLogIn}
                className="pt-[0.5rem] pb-[0.5rem] pl-[1rem] pr-[1rem] text-[0.9rem] rounded-[20px] font-bold"
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
      {isChatbotOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseChatbot} 
        >
          <div 
            className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()} 
          >
            <ChatBotComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

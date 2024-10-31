"use client";
import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { useEffect, useCallback } from "react";

import { useSession } from "next-auth/react";
import { registerAuthProps } from "@/server/signUpHelpers";
import { useAuthThirdStore } from "@/store/useAuthThirdStore";
import Swal from "sweetalert2";

const HomeView: React.FC = () => {
  const {
    googleSession,
    createGoogleSession,
    clearAllSessions,
    isSessionSent,
    hasInitialized,
    resetInitialization,
    setSessionSent,
  } = useAuthThirdStore();
  // const { setUserData } = useUserStore();
  const { data: session, status: sessionStatus } = useSession();

  const handleBackendRegistration = useCallback(async () => {
    if (googleSession && !isSessionSent && hasInitialized) {
      try {
        setSessionSent(true);

        await registerAuthProps(googleSession);

        // Si el registro fue exitoso, limpiar todas las sesiones
        await clearAllSessions();

        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Session registered successfully",
          width: 400,
          padding: "3rem",
        });
      } catch (error) {
        console.error("Error in backend registration:", error);
        // Los errores se manejan en registerAuthProps
      } finally {
        await clearAllSessions();
        resetInitialization();
      }
    }
  }, [
    googleSession,
    isSessionSent,
    clearAllSessions,
    setSessionSent,
    hasInitialized,
    resetInitialization,
  ]);

  useEffect(() => {
    if (
      sessionStatus === "authenticated" &&
      session &&
      !hasInitialized &&
      !isSessionSent
    ) {
      const role_name = localStorage.getItem("userRole");
      if (role_name) {
        createGoogleSession(session);
      } else {
        console.warn("Not found userRole in local storage");
      }
    }
  }, [
    session,
    sessionStatus,
    createGoogleSession,
    hasInitialized,
    isSessionSent,
  ]);

  useEffect(() => {
    if (googleSession && !isSessionSent && hasInitialized) {
      handleBackendRegistration();
    }
  }, [googleSession, handleBackendRegistration, isSessionSent, hasInitialized]);

  useEffect(() => {
    console.log("State currently", {
      sessionStatus,
      hasGoogleSession: !!googleSession,
      isSessionSent,
      hasInitialized,
      role: localStorage.getItem("userRole"),
    });
  }, [sessionStatus, googleSession, isSessionSent, hasInitialized]);

  return (
    <div
      className="h-[78vh]"
      style={{
        background: "#d8fba7",
        paddingTop: "5rem",
        paddingLeft: "5rem",
        paddingBottom: "8rem",
      }}
    >
      <div>
        <h1 className={styles.CoverTitle}> Supervise the agro supply chain</h1>
        <p className={styles.Paragraph}>
          {" "}
          Connect with suppliers and entrepreneurs in a B2B e-commerce service.
        </p>
        <Link className={styles.SignUp} href="/market">
          {" "}
          Market{" "}
        </Link>
      </div>
    </div>
  );
};

export default HomeView;

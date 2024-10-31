"use client"
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css"
import { useSession } from "next-auth/react";
import { registerAuthProps } from "@/server/signUpHelpers";
import { useAuthThirdStore } from "@/store/useAuthThirdStore";
import Swal from "sweetalert2";

const HomeView: React.FC = () => {
   

    return(
        <div style={{background: "#d8fba7", paddingTop: "5rem", paddingLeft: "5rem", paddingBottom: "8rem"}}>
            <div>
                <h1 className={styles.CoverTitle}> Supervise the agro supply chain</h1>
                <p className={styles.Paragraph}> Connect with suppliers and entrepreneurs in a B2B e-commerce service.</p>
                <Link className={styles.SignUp} href="/market"> Market </Link>
            </div>
        </div>
    )
};

export default HomeView;
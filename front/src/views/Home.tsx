"use client"
import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css"
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/useUserStore";
import { IUser } from "@/interface/types";
import { registerAuthProps } from "@/helpers/signUpHelpers";

const HomeView: React.FC = () => {
    const { data: session } = useSession();
    const users = useUserStore((state) => state.users);
    const addUser = useUserStore((state) => state.addUser);

    useEffect(() => {
        const registerUserToBackend = async (sessionUser: Omit<IUser, 'id'>) => {
            try {
                const registeredUser = await registerAuthProps(sessionUser);
                addUser(registeredUser); 
                console.log("User registered successfully:", registeredUser);
            } catch (error) {
                console.error("Error registering user:", error);
            }
        };

        if (session?.user) {
            const sessionUser: Omit<IUser, 'id'> = {
                user_name: session.user.name || "",
                email: session.user.email || "",
                role_name: localStorage.getItem('userRole') as "supplier" | "buyer",
                user_lastname: "",
                password: "",
                confirm_password: "",
                isOlder: true,
            };
            
            registerUserToBackend(sessionUser);
        }
    }, [session, addUser]);

    useEffect(() => {
        console.log("Users in global state:", users);
    }, [users]);

    return(
        <main style={{background: "#d8fba7", paddingTop: "5rem", paddingLeft: "5rem", paddingBottom: "8rem"}}>
            <div>
                <h1 className={styles.CoverTitle}> Supervise the agro supply chain</h1>
                <p className={styles.Paragraph}> Connect with suppliers and entrepreneurs in a B2B e-commerce service.</p>
                <Link className={styles.SignUp} href="/market"> See The Market </Link>
            </div>
        </main>
    )
};
export default HomeView;
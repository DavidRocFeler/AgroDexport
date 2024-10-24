"use client"
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IAuthWrapperProps } from "@/interface/types";

const AuthWrapper: React.FC<IAuthWrapperProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {

        if (status === "loading") return;

        if (session) {
            router.push("/");
        }
    }, [session, status, router]);

    return <>{children}</>;
};

export default AuthWrapper;

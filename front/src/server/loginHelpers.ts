import { ILogin, ILoginAuth } from "@/interface/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const logginProps = async (userData: ILogin) => {
    try {
        const res = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (res.ok) {
            return await res.json();
        } else {
            const errorResponse = await res.json();
            const errorMessage = errorResponse.message || "User not found";
            throw new Error(errorMessage); 
        }
    } catch (error: any) {
        
        console.error("Fetch error:", error.message);
        throw error; 
    }
};

export const logginAuthProps = async ( userData: ILoginAuth ) => {
    try {
        const res = await fetch(`${API_URL}/auth/thirdsingin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(res.ok) {
            return res.json();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "You need to register first",
                width: 400,
                padding: "3rem",
                customClass: {
                    popup: "custom-swual-popup"
                }
            });
        }
    } catch (error: any) {
        throw new Error(error)
    }
};
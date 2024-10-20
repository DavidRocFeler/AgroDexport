import { ISignUpForm, IUser } from "@/interface/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerProps = async (userData: ISignUpForm) => {
    try {
        console.log("API_URL:", API_URL);
        console.log("userData:", JSON.stringify(userData));
        
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        
        console.log("Response status:", res.status);
        console.log("Response headers:", JSON.stringify(Object.fromEntries(res.headers)));
        
        if(res.ok) {
            const registeredUser = await res.json();
            console.log("Response from backend:", JSON.stringify(registeredUser));
            return registeredUser;
        } else {
            const errorText = await res.text();
            console.error("Error response:", errorText);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Registration failed: ${errorText}`,
                width: 400,
                padding: "3rem",
                customClass: {
                    popup: "custom-swual-popup"
                }
            });
            throw new Error(`Failed register: ${errorText}`);
        }
    } catch (error: any) {
        console.error("Fetch error:", error);
        throw error;
    }
}


export const registerAuthProps = async (userData:IUser) => {
    try {
        console.log("Sending to backend:", JSON.stringify(userData));
        const res = await fetch(`${API_URL}/auth/thirdsingin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        if(res.ok) {
            return res.json();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                width: 400,
                padding: "3rem",
                customClass: {
                    popup: "custom-swual-popup"
                }
            })
            throw new Error("Failed register")
        }
    } catch (error: any) {
        console.error("Error sending data:", error);
        console.log("Data that failed to send:", JSON.stringify(userData));
        throw new Error(error)
    }
}



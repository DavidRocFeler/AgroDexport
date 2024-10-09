import { ISignUp } from "@/interface/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerProps = async (userData: ISignUp) => {
    try {
        const res = await fetch(`${API_URL}/register`, {
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
        throw new Error(error)
    }
}
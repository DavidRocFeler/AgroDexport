import { ISignUpForm, IGoogleSession } from "@/interface/types";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const registerProps = async (userData: ISignUpForm) => {
    try {
        const res = await fetch(`${API_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (res.ok) {
            const registeredUser = await res.json();
            return registeredUser;
        } else {
            const errorResponse = await res.json();
            const errorMessage = errorResponse.message || "Registration failed";
            throw new Error(errorMessage);
        }
    } catch (error: any) {
        console.error("Fetch error:", error.message);
        throw error; 
    }
};

// front/src/helpers/signUpHelpers.ts
export const registerAuthProps = async (userData: IGoogleSession) => {
    try {
        // console.log("Sending to backend:", JSON.stringify(userData));
        const res = await fetch(`${API_URL}/auth/thirdsignup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (res.ok) {
            // Si la respuesta es exitosa, devuelve los datos
            return await res.json();
        } else {
            // Si el backend devuelve un error, intenta obtener el mensaje de error
            let errorMessage = "An error occurred during registration.";
            try {
                const errorData = await res.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // Si no es un JSON válido, usa el texto de la respuesta como mensaje de error
                errorMessage = await res.text();
            }
            
            // Mostrar el mensaje exacto del backend en Swal
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
                width: 400,
                padding: "3rem",
                customClass: {
                    popup: "custom-swal-popup",
                },
            });
            throw new Error(`Failed to register: ${errorMessage}`);
        }
    } catch (error: any) {
        // En caso de error en la petición o en el procesamiento
        console.error("Error sending data:", error.message);
        // console.log("Data that failed to send:", JSON.stringify(userData));
        
        Swal.fire({
            icon: "error",
            title: "Request Error",
            text: error.message || "Something went wrong.",
            width: 400,
            padding: "3rem",
            customClass: {
                popup: "custom-swal-popup",
            },
        });

        throw new Error(error.message || "Unknown error occurred");
    }
};

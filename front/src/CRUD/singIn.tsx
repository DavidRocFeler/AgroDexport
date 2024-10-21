// src/app/tipos/auth/sining.ts

import axios from "axios";

export interface SingIn {
    email: string;
    password: string;
}

export async function signIn(logInData: SingIn): Promise<any> {
    console.log("Sending login request with data:", logInData);

    try {
        const res = await axios.post(`http://localhost:3002/auth/signin`, logInData);
        console.log("Received response from backend:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error during sign in request:", error);
        throw error;
    }
}

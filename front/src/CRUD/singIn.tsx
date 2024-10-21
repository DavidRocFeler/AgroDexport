import { SingIn } from "@/app/tipos/auth/sining"
import axios from "axios"

export async function SignIn(logInData: SingIn): Promise<any> {
    const res = await axios.post(`http://localhost:3002/auth/signin`, logInData)
    const user:any  = await res.data
    return user
}
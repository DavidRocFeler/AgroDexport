import React, { useState, useEffect } from "react";
import { IGoogleSession, ISignUpComponentProps, ISignUpForm } from "@/interface/types";
import styles from "../styles/LogSign.module.css";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { registerProps } from "@/server/signUpHelpers";
import Swal from "sweetalert2";
import { X } from "lucide-react";
import CustomCheckbox from "./CustomCheckbox";
import { useRouter } from "next/navigation";
import { validateRegister } from "@/helpers/validateRegister";

const SignUp: React.FC<ISignUpComponentProps> = ({ onCloseSignUp, onSwitchToLogin }) => {
    const initialState: ISignUpForm = {
        user_name: "",
        user_lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        role_name: null,
        isOlder: false,
    }
    const [userData, setUserData] = useState<ISignUpForm>(initialState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isAuthButtonDisabled, setIsAuthButtonDisabled] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();


    const handleChangeRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
                
        setUserData((prevData) => {
            const updatedData = { ...prevData };
        
            if (type === "checkbox") {
                if (name === "supplier" || name === "buyer") {
                    updatedData.role_name = checked ? name : null;
                } else if (name === "isOlder") {
                    updatedData.isOlder = checked;
                }
            } else {
                (updatedData as any)[name] = value;
            }
        
            const errors = validateRegister(updatedData);
            setIsButtonDisabled(errors.length > 0);
            return updatedData;
        });
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const errors = validateRegister(userData); // Validación del formulario
        if (errors.length === 0) {
            try {
                setIsSubmitting(true); // Marca el inicio del proceso de envío
                
                await registerProps(userData); // Llamada para registrar los datos
    
                // Muestra la alerta de éxito
                await Swal.fire({
                    title: `Welcome!`,
                    text: `You have successfully registered.`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                });
    
                // Resetear formulario después del envío exitoso
                setUserData(initialState); 
                onCloseSignUp();
                router.push("/"); // Redirige después del registro exitoso
            } catch (error: any) {
                console.error("Registration error:", error.message);
    
                // Muestra la alerta de error si algo falla
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: error.message, // Muestra el mensaje de error del backend
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                });
            } finally {
                setIsSubmitting(false); // Finaliza el proceso de envío
            }
        } else {
            // Muestra la alerta de errores si no pasa la validación
            Swal.fire({
                title: "Please correct the following errors:",
                text: errors.join("\n"),
                icon: "warning",
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
        }
    };

    const handleOnSubmitAuth = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("UserData before submission:", userData);
    
        // Verifica si se seleccionó un rol
        if (!userData.role_name) {
            await Swal.fire({
                title: 'Role required',
                text: 'Please select if you are a buyer or supplier before signing up.',
                icon: 'warning',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
            return; // Detener el flujo si no hay rol seleccionado
        }
    
        // Continúa si se ha seleccionado un rol
        const newUser: IGoogleSession = {
            name: userData.user_name || "",
            email: userData.email || "",
            role_name: userData.role_name,
        };
    
        localStorage.setItem('userRole', userData.role_name);
    
        setIsSubmitting(true); // Marca el inicio de la autenticación
    
        try {
            // Mostrar el modal de carga mientras se procesa
            Swal.fire({
                title: 'Connecting to Google...',
                text: 'Please wait while we sign you up.',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
    
            // Aquí va la llamada al método de autenticación
            await signIn("google");
    
        } catch (error) {
            console.error("Authentication error:", error);
            Swal.close();
    
            await Swal.fire({
                title: 'Sign Up Error',
                text: 'An error occurred while signing you up.',
                icon: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
        } finally {
            // Finalizar el proceso y volver a habilitar el botón
            setIsSubmitting(false);
        }
    };
    
    return (
        <section className={styles.LogSign}>
            <button onClick={onCloseSignUp} className=' pr-[0.5rem] pl-[0.5rem]'>  <X size={24} color= "#5c8b1b" /> </button>
            <form className="flex flex-col" onSubmit={handleOnSubmit}>
                <h1 className={styles.Title}>Join Agro Dexports</h1>
              
                <div className="w-[40%] flex flex-col m-auto mb-[3rem] ">
                    <input className={styles.CommonInput}
                        value={userData.user_name}
                        onChange={handleChangeRegister}
                        name='user_name'
                        type="text" 
                        required
                        placeholder='Name' />

                    <input className={styles.CommonInput}
                        value={userData.user_lastname}
                        onChange={handleChangeRegister}
                        name='user_lastname'
                        type="text" 
                        required
                        placeholder='Last name' />

                    <input className={styles.CommonInput}
                        value={userData.email}
                        onChange={handleChangeRegister}
                        name='email'
                        type="email" 
                        required
                        placeholder='Email address' />

                    <input className={styles.CommonInput}
                        value={userData.password}
                        onChange={handleChangeRegister}
                        name='password'
                        type="password" 
                        required
                        placeholder='Password' />

                    <input className={styles.Password}
                        value={userData.confirm_password}
                        onChange={handleChangeRegister}
                        name='confirm_password'
                        type="password" 
                        required
                        placeholder='Repeat password' />

                    <div className="flex flex-row">
                    <label htmlFor="">
                        <CustomCheckbox
                            name="supplier"
                            checked={userData.role_name === "supplier"}
                            onChange={handleChangeRegister}
                        />{" "}
                        </label>

                        <label className="ml-auto">
                        <CustomCheckbox
                            name="buyer"
                            checked={userData.role_name === "buyer"}
                            onChange={handleChangeRegister}
                        />{" "}
                        </label>
                    </div>

                    <div className="mb-[2rem]  flex flex-col mt-[1rem] ">
                        <label className="">
                        <input
                            name="isOlder"
                            type="checkbox"
                            checked={userData.isOlder}
                            onChange={handleChangeRegister}
                            required
                        />{" "} I am of legal age,
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={styles.ButtonLogin}
                        disabled={isSubmitting} 
                    >
                        {isSubmitting ? "Submitting..." : "Continue"}
                    </button>
                </div>
                <p className={styles.OR}> ------------------- OR -------------------</p>
                <div>
                    <button
                        className={styles.ButtonGoogle}
                        onClick={async (event) => {
                            if (isSubmitting) return; // Evita ejecutar si ya está en proceso
                            await handleOnSubmitAuth(event);
                        }}
                        disabled={isSubmitting} // Deshabilitar solo si está enviando
                    >
                        <FaGoogle />
                        {isSubmitting ? 'Signing Up...' : 'Sign up with Google'}
                    </button>
                    <div className="mb-[2rem] w-[40%] m-auto flex flex-row">
                        <label htmlFor="" className="bg-red-500 w-[8rem]" >
                        <CustomCheckbox
                            name="supplier"
                            checked={userData.role_name === "supplier"}
                            onChange={handleChangeRegister}
                        />{" "}
                       
                        </label>

                        <label className="ml-auto bg-green-400 w-[8rem] h-[2.5rem] ">
                        <CustomCheckbox
                            name="buyer"
                            checked={userData.role_name === "buyer"}
                            onChange={handleChangeRegister}
                        />{" "}
                        
                        </label>
                    </div>

                    {/* <button className={styles.ButtonApple} onClick={() => signIn()} disabled={isAuthButtonDisabled}>
                        <FaApple />
                        <p className="ml-[1rem]">Sign up with Apple</p>
                    </button>

                    <button className={styles.ButtonEmail} onClick={() => signIn()} disabled={isAuthButtonDisabled}>
                        <FaEnvelope />
                        <p className="ml-[1rem]">Sign up with Email</p>
                    </button> */}
                </div>

                <div className="flex flex-row justify-center items-center mt-[2rem]">
                    <p>Already have an account?</p>
                    <button
                        onClick={onSwitchToLogin}
                        className="ml-[1rem] text-[0.9rem] font-bold text-[#5c8b1b] mt-1"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </section>
    );
};

export default SignUp;
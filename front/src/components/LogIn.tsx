"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import { ILoginComponentProps } from '@/interface/types';
import styles from "../styles/LogSign.module.css";
import { FaGoogle, FaApple, FaEnvelope } from 'react-icons/fa';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { useUserStore } from '@/store/useUserStore';
import { logginProps } from '@/server/loginHelpers';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { X } from "lucide-react";

const LogIn: React.FC<ILoginComponentProps> = ({ onCloseLogin, onSwitchToSignUp }) => {
    const setUserData = useUserStore((state) => state.setUserData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const router = useRouter();
   
    const [userData, setUserFormData] = useState<{ 
        email: string; 
        password: string 
    }>({ 
        email: "", 
        password: "" 
    });

    const handleModalClose = () => {
        onCloseLogin();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({
            ...userData,
            [name]: value
        })
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Si ya hay una solicitud en curso, no hacer nada
        if (isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            
            const response = await logginProps(userData);
            
            // Cerrar la alerta de carga
            Swal.close();
            
            // backend response
            const { user_id, token, role_name } = response;
            
            // Actualizar el estado global
            setUserData(user_id, token, role_name);
            
            await Swal.fire({
                title: `Welcome!`,
                text: `Logged in successfully`,
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
            
            router.push("/");
            onCloseLogin();
            
        } catch (error: any) {
            console.error("Login error:", error.message);
            
            // Cerrar la alerta de carga si aún está abierta
            Swal.close();
            
            await Swal.fire({
                title: 'Login Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
        } finally {
            // Restablecer el estado de envío
            setIsSubmitting(false);
        }
    };
    
    return (
        <section className={styles.LogSign}>
            <button onClick={handleModalClose} className=' pr-[0.5rem] pl-[0.5rem]'> <X size={24} color= "#5c8b1b" />  </button>
            <div className="flex flex-col">
            <h1 className={styles.Title}>Log in Agro Dexports</h1>
                <form action="" className='flex flex-col w-[40%] m-auto mb-[3rem]' onSubmit={handleOnSubmit}>
                    <input className={styles.CommonInput}
                    onChange={handleChange}
                    name='email'
                    value={userData.email} 
                    type="email"
                    required 
                    autoComplete="current-password"
                    placeholder='Email address' />

                    <input className={styles.Password}
                    onChange={handleChange}
                    name='password'
                    value={userData.password} 
                    type="password" 
                    required
                    autoComplete="current-password"
                    placeholder='Password'/>
                    <Link className={styles.ForgotPassword} href="/help"> Forgot password? </Link>
                    <button
                        type="submit"
                        className={styles.ButtonLogin}
                        disabled={isSubmitting} 
                    >
                        {isSubmitting ? "Submitting..." : "Continue"}
                    </button>
                </form>
                <p className={styles.OR}> ------------------- OR -------------------</p>
                <button 
                className={`${styles.ButtonGoogle} ${isSigningIn ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={async () => {
                if (isSigningIn) return;
                
                try {
                    setIsSigningIn(true);
                    
                    Swal.fire({
                        title: 'Connecting to Google...',
                        text: 'Please wait while we redirect you',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
                    
                    await signIn("google");
                    
                } catch (error) {
                    console.error("Google sign in error:", error);
                    Swal.close();
                    
                    await Swal.fire({
                        title: 'Login Error',
                        text: 'An error occurred while connecting to Google',
                        icon: 'error',
                        confirmButtonText: 'OK',
                        allowOutsideClick: false
                    });
                } finally {
                    setIsSigningIn(false);
                }
                    }}
                    disabled={isSigningIn}
                >
                    <FaGoogle />
                    {isSigningIn ? 'Connecting...' : 'Log in with Google'}
                </button>
                {/* <button className={styles.ButtonApple} onClick={() => signIn("apple")}>
                    <FaApple />
                    <p className="ml-[1rem]">Log in with Apple</p>
                </button>
                <button className={styles.ButtonEmail} onClick={() => signIn("email")}>
                    <FaEnvelope />
                    <p className="ml-[1rem]">Log in with Email</p>
                </button> */}
                <div className="flex flex-row justify-center items-center mt-[2rem]">
                    <p>Don&apos;t have an account available yet?</p>
                    <button
                        onClick={onSwitchToSignUp}
                        className="ml-[1rem] text-[0.9rem] font-bold text-[#5c8b1b] mt-1"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LogIn;




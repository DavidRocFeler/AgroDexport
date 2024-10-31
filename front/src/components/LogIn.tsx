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
        
        try {
            const response = await logginProps(userData);
            
            // backend response
            const { user_id, token, role_name } = response;
            
            // Actualize the global status 
            setUserData(user_id, token, role_name);
            
            await Swal.fire({
                title: `Welcome!`,
                text: `Logged in succesfully`,
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
            
            router.push("/")
            onCloseLogin();
            
        } catch (error) {
            await Swal.fire({
                title: 'Login Error',
                text: 'User not found wrong password',
                icon: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
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
                    <button className={styles.ButtonLogin}> Continue </button>
                </form>
                <p className={styles.OR}> ------------------- OR -------------------</p>
                <button className={styles.ButtonGoogle}  onClick={() => signIn("google")}>
                    <FaGoogle />
                    Log in with Google
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




"use client"
import React from 'react';
import { ILoginComponentProps } from '@/interface/types';
import styles from "../styles/LogSign.module.css";
import { FaGoogle, FaApple, FaEnvelope } from 'react-icons/fa';
import { signIn } from "next-auth/react";
import Link from 'next/link';
import { useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import userAdmin from '@/helpers/userAdmin.helpers';
import userBuyer from '@/helpers/userBuyer.herlpers';
import userSupplier from '@/helpers/userSupplier.herlpers';
import Swal from 'sweetalert2';

const LogIn: React.FC<ILoginComponentProps> = ({ onCloseLogin, onSwitchToSignUp }) => {
    const setUserType = useUserStore((state) => state.setUserType);
    // const { data: session } = useSession();
   
    const [userData, setUserData] = useState<{ email: string; password: string }>({ 
        email: "", 
        password: "" 
    });

    const handleModalClose = () => {
        onCloseLogin();
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const credentials = [
            { userType: 'admin', email: userAdmin.email, password: userAdmin.password },
            { userType: 'buyer', email: userBuyer.email, password: userBuyer.password },
            { userType: 'supplier', email: userSupplier.email, password: userSupplier.password }
        ];

       // Accede a userData para obtener email y password
       const user = credentials.find(cred => cred.email === userData.email && cred.password === userData.password);

        if (user) {
            setUserType(user.userType as "buyer" | "supplier" ); // Actualiza el estado

            // setUserType(user.userType as "buyer" | "supplier" | "admin"); // Actualiza el estado global ajuste javier
            // // Guardar cookies
            console.log('Setting cookie:', `email=${userData.email}; userType=${user.userType}; path=/;`);
            document.cookie = `email=${userData.email}; path=/;`;
            document.cookie = `userType=${user.userType}; path=/;`;

            checkCookies()

            Swal.fire({
                title: `Welcome ${user.userType}!`,
                text: `You are logged in as a ${user.userType}.`,
                icon: 'success',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
            onCloseLogin();
        } else {
            // Muestra una alerta de error si las credenciales son incorrectas
            Swal.fire({
                title: 'Invalid credentials',
                text: 'Please check your email and password.',
                icon: 'error',
                confirmButtonText: 'OK',
                allowOutsideClick: false
            });
        }
    };


    return (
        <section className={styles.LogSign}>
            <button onClick={handleModalClose} className='border-[2px] border-solid border-black pr-[0.5rem] pl-[0.5rem]'> x </button>
            <div className="flex flex-col">
            <h1 className={styles.Title}>Log in Agro Dexports</h1>
                <form action="" className='flex flex-col w-[40%] m-auto mb-[3rem]' onSubmit={handleOnSubmit}>
                    <input className={styles.CommonInput}
                    onChange={handleChange}
                    name='email'
                    value={userData.email} 
                    type="email" 
                    autoComplete="current-password"
                    placeholder='Email address' />
                    <input className={styles.Password}
                    onChange={handleChange}
                    name='password'
                    value={userData.password} 
                    type="password" 
                    autoComplete="current-password"
                    placeholder='Password'/>
                    <Link className={styles.ForgotPassword} href="/help"> Forgot password? </Link>
                    <button className={styles.ButtonLogin}> Continue </button>
                </form>
                <p className={styles.OR}> ------------------- OR -------------------</p>
                <button className={styles.ButtonGoogle}  onClick={() => signIn()}>
                    <FaGoogle />
                    <p className="ml-[1rem]">Log in with Google</p>
                </button>
                <button className={styles.ButtonApple} onClick={() => signIn("apple")}>
                    <FaApple />
                    <p className="ml-[1rem]">Log in with Apple</p>
                </button>
                <button className={styles.ButtonEmail} onClick={() => signIn("email")}>
                    <FaEnvelope />
                    <p className="ml-[1rem]">Log in with Email</p>
                </button>
                <div className="flex flex-row justify-center items-center mt-[2rem]">
                    <p>Don't have an account available yet?</p>
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
function checkCookies() {
    throw new Error('Function not implemented.');
}




import React from 'react';
import { ILoginComponentProps } from '@/interface/types';
import styles from "../styles/LogSign.module.css";
import { FaGoogle, FaApple, FaEnvelope } from 'react-icons/fa';
import { signIn } from "next-auth/react";
import Link from 'next/link';

const LogIn: React.FC<ILoginComponentProps> = ({ onCloseLogin, onSwitchToSignUp }) => {
    const handleModalClose = () => {
        onCloseLogin();
    };

    return (
        <section className={styles.LogSign}>
            <button onClick={handleModalClose} className='border-[2px] border-solid border-black pr-[0.5rem] pl-[0.5rem]'> x </button>
            <div className="flex flex-col">
            <h1 className={styles.Title}>Log in Agro Dexports</h1>
                <form action="" className='flex flex-col w-[40%] m-auto mb-[3rem] '>
                    <input className={styles.Email} type="email" placeholder='Email address' />
                    <input className={styles.Password} type="password" placeholder='Password'/>
                    <Link className={styles.ForgotPassword} href="/help"> Forgot password? </Link>
                    <button className={styles.ButtonLogin}> Continue </button>
                </form>
                <p className={styles.OR}> ------------------- OR -------------------</p>
                <button className={styles.ButtonGoogle} onClick={() => signIn("google")}>
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

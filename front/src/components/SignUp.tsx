import React, { useState } from "react";
import { ISignUpComponentProps, IUserType } from "@/interface/types";
import styles from "../styles/LogSign.module.css";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import RoleUser from "./RoleUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignUp: React.FC<ISignUpComponentProps> = ({ onCloseSignUp, onSwitchToLogin }) => {
    const [userData, setUserData] = useState<IUserType | null>(null);
    const { data: session } = useSession();
    const [showRoleModal, setShowRoleModal] = useState(false);
    console.log(session);
    
    const handleRoleSelected = (role: "supplier" | "buyer") => {
        console.log(`User selected role: ${role}`);// Cerrar el modal después de seleccionar el rol
        // Aquí puedes manejar la lógica adicional, como guardar el rol en la base de datos
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = event.target;
        setUserData({
            ...userData,
            role: name as "supplier" | "buyer",
        });
    };

    const handleModalClose = () => {
        onCloseSignUp();
    };

    return (
        <section className={styles.LogSign}>
            <button onClick={handleModalClose} className='border-[2px] border-solid border-black pr-[0.5rem] pl-[0.5rem]'> x </button>
            <form action="" className="flex flex-col">
                <h1 className={styles.Title}>Join Agro Dexports</h1>
                {/* <div className="w-[50%] m-auto mb-[2rem]">
                    <input
                        name="supplier"
                        checked={userData?.role === "supplier"}
                        onChange={handleCheckboxChange}
                        className={styles.Supplier}
                        type="checkbox"
                    />{" "}
                    I'm a supplier
                    <input
                        name="buyer"
                        checked={userData?.role === "buyer"}
                        onChange={handleCheckboxChange}
                        className="ml-[8rem]"
                        type="checkbox"
                    />{" "}
                    I'm a buyer
                </div> */}
                <div className="w-[45%] flex flex-col m-auto">
                    <input className={styles.Email}
                        name='name'
                        type="name" 
                        autoComplete="current-name"
                        placeholder='Name' />
                        <input className={styles.Email}
                        name='lastname'
                        type="lastname" 
                        autoComplete="current-lastname"
                        placeholder='Last name' />
                        <input className={styles.Email}
                        name='email'
                        type="email" 
                        autoComplete="current-email"
                        placeholder='Email address' />
                        <input className={styles.Email}
                        name='password'
                        type="password" 
                        autoComplete="current-password"
                        placeholder='Password' />
                        <input className={styles.Email}
                        name='password'
                        type="password" 
                        autoComplete="current-password"
                        placeholder='Repeat password' />
                        <input
                        name=""
                        type="checkbox"
                        />{" "} I am of legal age.
                     </div>

                <button className={styles.ButtonGoogle} onClick={() => signIn()}>
                    <FaGoogle />
                    <p className="ml-[1rem]">Sign up with Google</p>
                </button>

                <button className={styles.ButtonApple} onClick={() => signIn("apple")}>
                    <FaApple />
                    <p className="ml-[1rem]">Sign up with Apple</p>
                </button>

                <button className={styles.ButtonEmail} onClick={() => signIn("email")}>
                    <FaEnvelope />
                    <p className="ml-[1rem]">Sign up with Email</p>
                </button>

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
            {showRoleModal && (
            <RoleUser onSelectRole={handleRoleSelected} />
            )}
        </section>
    );
};

export default SignUp;
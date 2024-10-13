import React, { useState } from "react";
import { ISignUpComponentProps, IUserType } from "@/interface/types";
import styles from "../styles/LogSign.module.css";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SignUp: React.FC<ISignUpComponentProps> = ({ onCloseSignUp, onSwitchToLogin }) => {
    const [userData, setUserData] = useState<IUserType | null>(null);

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
                <div className="w-[50%] m-auto mb-[2rem]">
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
                </div>

                <button className={styles.ButtonGoogle} onClick={() => signIn("google")}>
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
        </section>
    );
};

export default SignUp;
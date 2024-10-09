"use client"
import { ISignUpComponentProps, ISignUp, ISignUpErrors } from "@/interface/types";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { validateRegister } from "@/helpers/validateRegister";
import { registerProps } from "@/helpers/signUpHelpers";
import Swal from "sweetalert2";

const SignUp: React.FC<ISignUpComponentProps> = ({onClose}) => {
   
    const initialState: ISignUp = {
        name: "",
        lastName: "",
        password: "",
        email: "",
        country: "",
        phone: 0,
    };

    const [ userData, setUserData ] = useState<ISignUp>(initialState);
    const [ errors, setErrors ] = useState<ISignUpErrors>(initialState);
    const formRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onClose();
        await registerProps(userData);
        Swal.fire({
            icon: "success",
            title: "Logged succesfully",
            width: 400,
            padding: "3rem",
            customClass: {
                popup: "custom-swual-popup"
            }
        })
        router.push("/home")
    };

    useEffect(() => {
        const error = validateRegister(userData);
        setErrors(error);
    }, [userData])     

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return(
        <section ref={formRef} className="w-[60%] m-auto p-[2rem] bg-yellow-400">
            <form action="" onSubmit={handleSubmit} className="flex flex-col" >
                <input className="text-white m-[1rem] " value={userData.name} name="name" onChange={handleOnChange} type="text" placeholder="Name" />
                <input className="text-white m-[1rem] " value={userData.lastName}  name="lastName" onChange={handleOnChange} type="text" placeholder="LastName" />
                <input className="text-white m-[1rem] " value={userData.password}  name="" onChange={handleOnChange} type="password" placeholder="Password" />
                <input className="text-white m-[1rem] " value={userData.email}  name="" onChange={handleOnChange} type="email" placeholder="Email" />
                <input className="text-white m-[1rem] " value={userData.country}  name="" onChange={handleOnChange} type="text" placeholder="Country" />
                <input className="text-white m-[1rem] " value={userData.phone}  name="" onChange={handleOnChange} type="number" placeholder="Phone"/>
                <button className="text-white font-bold bg-black"> submit </button>
            </form>
        </section>
    )
};
export default SignUp;
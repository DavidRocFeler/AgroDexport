import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ILogin, ILoginError } from '@/interface/types';
import { validateCredentials } from '@/helpers/validateCredential';
import { logginProps } from '@/helpers/loginHelpers';
import Swal from 'sweetalert2';

const LogIn: React.FC = () => {
    const initialState = {
        email: "",
        password: "",
    }

    const router = useRouter();
    const [ userData, setUserData ] = useState<ILogin>(initialState)
    const [ errors, setErrors ] = useState<ILoginError>(initialState)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value
        })
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await logginProps(userData);
        Swal.fire({
            icon: "success",
            title: "Succesfully Logged",
            width: 400,
            padding: "3rem",
            customClass: {
                popup: "custom-swal-popup"
            }
        });
        router.push("/home")
    }

    useEffect(() => {
        const error = validateCredentials(userData);
        setErrors(error);
    }, [userData])

  return (
    <section>
        
    </section>
  )
}

export default LogIn

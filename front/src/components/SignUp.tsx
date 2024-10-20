// import React, { useState, useEffect } from "react";
// import { ISignUpComponentProps, ISignUpForm, IUser } from "@/interface/types";
// import styles from "../styles/LogSign.module.css";
// import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";
// import { signIn, useSession, getSession} from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useUserStore } from "@/store/useUserStore";

// const SignUp: React.FC<ISignUpComponentProps> = ({ onCloseSignUp, onSwitchToLogin }) => {
//     const initialState: ISignUpForm = {
//         name: "",
//         lastname: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         role: null,
//         legalAge: false,
//     }
//     const [userData, setUserData] = useState<ISignUpForm>(initialState);
//     const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//     const [isAuthButtonDisabled, setIsAuthButtonDisabled] = useState(true);
//     const { data: session} = useSession();
//     const addUser = useUserStore((state) => state.addUser);
    
//     const validateForm = (data: ISignUpForm): string[] => {
//         const errors: string[] = [];
//         if (data.name.trim() === "") errors.push("Name is required");
//         if (data.lastname.trim() === "") errors.push("Last name is required");
//         if (data.email.trim() === "") errors.push("Email is required");
//         if (data.password.trim() === "") errors.push("Password is required");
//         if (data.password !== data.confirmPassword) errors.push("Passwords do not match");
//         if (data.role === null) errors.push("Please select if you are a buyer or supplier");
//         if (!data.legalAge) errors.push("You must confirm that you are of legal age");
//         return errors;
//     }

//     const handleChangeRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = event.target;
        
//         setUserData((prevData) => {
//             let updatedData = { ...prevData };

//             if (type === "checkbox") {
//                 if (name === "supplier" || name === "buyer") {
//                     updatedData.role = checked ? name : null;
//                 } else if (name === "legalAge") {
//                     updatedData.legalAge = checked;
//                 }
//             } else {
//                 (updatedData as any)[name] = value;
//             }

//             const errors = validateForm(updatedData);
//             setIsButtonDisabled(errors.length > 0);
//             return updatedData;
//         });
//     };

//     const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         const errors = validateForm(userData);
//         if (errors.length === 0) {
//             const { confirmPassword, ...newUserData } = userData;
//             const newUser: IUser = {
//                 ...newUserData,
//                 id: Date.now().toString(), // Temporary ID generation
//             };
//             addUser(newUser);
//             alert("New user added successfully!");
//             console.log("User added:", newUser);
//             setUserData(initialState); // Reset form after successful submission
//         } else {
//             alert("Please correct the following errors:\n\n" + errors.join("\n"));
//         }
//     };

//     const handleOnSubmitAuth = async (event: React.SyntheticEvent) => {
//         event.preventDefault();
//         console.log("UserData before submission:", userData);
    
//         if (!userData.role) {
//             alert("Por favor, selecciona si eres comprador o proveedor antes de continuar.");
//             return;
//         }
    
//         // Crear el objeto de usuario con los datos disponibles
//         const newUser: IUser = {
//             id: Date.now().toString(),
//             name: userData.name || "",
//             lastname: userData.lastname || "",
//             email: userData.email || "",
//             role: userData.role,
//             password: "", // No necesario para autenticación con Google
//             confirmPassword: "",
//             legalAge: userData.legalAge,
//         };
    
//         // Actualiza el estado global
//         addUser(newUser);
//         console.log("User added to global state:", newUser);
    
//         // Ahora iniciamos el proceso de autenticación
//         await signIn("google");
//     };

//     useEffect(() => {
//         const isRoleSelected = userData.role !== null;
//         setIsAuthButtonDisabled(!isRoleSelected);
//     }, [userData.role, userData.legalAge]);
    
//     return (
//         <section className={styles.LogSign}>
//             <button onClick={onCloseSignUp} className='border-[2px] border-solid border-black pr-[0.5rem] pl-[0.5rem]'> x </button>
//             <form className="flex flex-col" onSubmit={handleOnSubmit}>
//                 <h1 className={styles.Title}>Join Agro Dexports</h1>
//                 <div className="w-[50%] m-auto mb-[2rem]">
//                     <input
//                         name="supplier"
//                         checked={userData.role === "supplier"}
//                         onChange={handleChangeRegister}
//                         className={styles.Supplier}
//                         type="checkbox"
//                     />{" "}
//                     I'm a supplier
//                     <input
//                         name="buyer"
//                         checked={userData.role === "buyer"}
//                         onChange={handleChangeRegister}
//                         className="ml-[8rem]"
//                         type="checkbox"
//                     />{" "}
//                     I'm a buyer
//                 </div>
//                 <div className="w-[40%] flex flex-col m-auto mb-[3rem] ">
//                     <input className={styles.CommonInput}
//                         value={userData.name}
//                         onChange={handleChangeRegister}
//                         name='name'
//                         type="text" 
//                         autoComplete="name"
//                         placeholder='Name' />

//                     <input className={styles.CommonInput}
//                         value={userData.lastname}
//                         onChange={handleChangeRegister}
//                         name='lastname'
//                         type="text" 
//                         autoComplete="family-name"
//                         placeholder='Last name' />

//                     <input className={styles.CommonInput}
//                         value={userData.email}
//                         onChange={handleChangeRegister}
//                         name='email'
//                         type="email" 
//                         autoComplete="email"
//                         placeholder='Email address' />

//                     <input className={styles.Password}
//                         value={userData.password}
//                         onChange={handleChangeRegister}
//                         name='password'
//                         type="password" 
//                         autoComplete="new-password"
//                         placeholder='Password' />

//                     <input className={styles.Password}
//                         value={userData.confirmPassword}
//                         onChange={handleChangeRegister}
//                         name='confirmPassword'
//                         type="password" 
//                         autoComplete="new-password"
//                         placeholder='Repeat password' />

//                     <div className="mb-[2rem]">
//                         <input
//                             name="legalAge"
//                             type="checkbox"
//                             checked={userData.legalAge}
//                             onChange={handleChangeRegister}
//                         />{" "} I am of legal age.
//                     </div>

//                     <button type="submit" className={styles.ButtonLogin} disabled={isButtonDisabled}>Continue</button>
//                 </div>
//                 <p className={styles.OR}> ------------------- OR -------------------</p>
//                 <div>
//                     <button className={styles.ButtonGoogle} onClick={async (event) => { await handleOnSubmitAuth(event);}} disabled={isAuthButtonDisabled}>
//                         <FaGoogle />
//                         <p className="ml-[1rem]">Sign up with Google</p>
//                     </button>

//                     <button className={styles.ButtonApple} onClick={() => signIn()} disabled={isAuthButtonDisabled}>
//                         <FaApple />
//                         <p className="ml-[1rem]">Sign up with Apple</p>
//                     </button>

//                     <button className={styles.ButtonEmail} onClick={() => signIn()} disabled={isAuthButtonDisabled}>
//                         <FaEnvelope />
//                         <p className="ml-[1rem]">Sign up with Email</p>
//                     </button>
//                 </div>

//                 <div className="flex flex-row justify-center items-center mt-[2rem]">
//                     <p>Already have an account?</p>
//                     <button
//                         onClick={onSwitchToLogin}
//                         className="ml-[1rem] text-[0.9rem] font-bold text-[#5c8b1b] mt-1"
//                     >
//                         Log In
//                     </button>
//                 </div>
//             </form>
//         </section>
//     );
// };

// export default SignUp;





import React, { useState, useEffect } from "react";
import { ISignUpComponentProps, ISignUpForm, IUser } from "@/interface/types";
import styles from "../styles/LogSign.module.css";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";
import { signIn, useSession, getSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const SignUp: React.FC<ISignUpComponentProps> = ({ onCloseSignUp, onSwitchToLogin }) => {
    const initialState: ISignUpForm = {
        name: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: null,
        legalAge: false,
    }
    const [userData, setUserData] = useState<ISignUpForm>(initialState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isAuthButtonDisabled, setIsAuthButtonDisabled] = useState(true);
    const { data: session} = useSession();
    const addUser = useUserStore((state) => state.addUser);
    
    const validateForm = (data: ISignUpForm): string[] => {
        const errors: string[] = [];
        if (data.name.trim() === "") errors.push("Name is required");
        if (data.lastname.trim() === "") errors.push("Last name is required");
        if (data.email.trim() === "") errors.push("Email is required");
        if (data.password.trim() === "") errors.push("Password is required");
        if (data.password !== data.confirmPassword) errors.push("Passwords do not match");
        if (data.role === null) errors.push("Please select if you are a buyer or supplier");
        if (!data.legalAge) errors.push("You must confirm that you are of legal age");
        return errors;
    }

    const handleChangeRegister = (event: React.ChangeEvent<HTMLInputElement>) => {
                const { name, value, type, checked } = event.target;
                
                setUserData((prevData) => {
                    let updatedData = { ...prevData };
        
                    if (type === "checkbox") {
                        if (name === "supplier" || name === "buyer") {
                            updatedData.role = checked ? name : null;
                        } else if (name === "legalAge") {
                            updatedData.legalAge = checked;
                        }
                    } else {
                        (updatedData as any)[name] = value;
                    }
        
                    const errors = validateForm(updatedData);
                    setIsButtonDisabled(errors.length > 0);
                    return updatedData;
                });
            };

    const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateForm(userData);
        if (errors.length === 0) {
            const { confirmPassword, ...newUserData } = userData;
            const newUser: IUser = {
                ...newUserData,
                id: Date.now().toString(), // Temporary ID generation
            };
            addUser(newUser);
            alert("New user added successfully!");
            console.log("User added:", newUser);
            setUserData(initialState); // Reset form after successful submission
        } else {
            alert("Please correct the following errors:\n\n" + errors.join("\n"));
        }
    };

    const handleOnSubmitAuth = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        console.log("UserData before submission:", userData);
    
        if (!userData.role) {
            alert("Por favor, selecciona si eres comprador o proveedor antes de continuar.");
            return;
        }
    
        // Crear el objeto de usuario con los datos disponibles
        const newUser: IUser = {
            id: Date.now().toString(),
            name: userData.name || "",
            lastname: userData.lastname || "",
            email: userData.email || "",
            role: userData.role,
            password: "",
            confirmPassword: "",
            legalAge: userData.legalAge,
        };
    
        // Actualiza el estado global
        addUser(newUser);
        console.log("User added to global state:", newUser);
    
        // Guarda el rol en localStorage antes de la autenticación
        localStorage.setItem('userRole', userData.role);
    
        // Ahora iniciamos el proceso de autenticación
        await signIn("google");
    };

        useEffect(() => {
            const isRoleSelected = userData.role !== null;
            setIsAuthButtonDisabled(!isRoleSelected);
        }, [userData.role, userData.legalAge]);
    
    return (
        <section className={styles.LogSign}>
            <button onClick={onCloseSignUp} className='border-[2px] border-solid border-black pr-[0.5rem] pl-[0.5rem]'> x </button>
            <form className="flex flex-col" onSubmit={handleOnSubmit}>
                <h1 className={styles.Title}>Join Agro Dexports</h1>
                <div className="w-[50%] m-auto mb-[2rem]">
                    <input
                        name="supplier"
                        checked={userData.role === "supplier"}
                        onChange={handleChangeRegister}
                        className={styles.Supplier}
                        type="checkbox"
                    />{" "}
                    I'm a supplier
                    <input
                        name="buyer"
                        checked={userData.role === "buyer"}
                        onChange={handleChangeRegister}
                        className="ml-[8rem]"
                        type="checkbox"
                    />{" "}
                    I'm a buyer
                </div>
                <div className="w-[40%] flex flex-col m-auto mb-[3rem] ">
                    <input className={styles.CommonInput}
                        value={userData.name}
                        onChange={handleChangeRegister}
                        name='name'
                        type="text" 
                        autoComplete="name"
                        placeholder='Name' />

                    <input className={styles.CommonInput}
                        value={userData.lastname}
                        onChange={handleChangeRegister}
                        name='lastname'
                        type="text" 
                        autoComplete="family-name"
                        placeholder='Last name' />

                    <input className={styles.CommonInput}
                        value={userData.email}
                        onChange={handleChangeRegister}
                        name='email'
                        type="email" 
                        autoComplete="email"
                        placeholder='Email address' />

                    <input className={styles.Password}
                        value={userData.password}
                        onChange={handleChangeRegister}
                        name='password'
                        type="password" 
                        autoComplete="new-password"
                        placeholder='Password' />

                    <input className={styles.Password}
                        value={userData.confirmPassword}
                        onChange={handleChangeRegister}
                        name='confirmPassword'
                        type="password" 
                        autoComplete="new-password"
                        placeholder='Repeat password' />

                    <div className="mb-[2rem]">
                        <input
                            name="legalAge"
                            type="checkbox"
                            checked={userData.legalAge}
                            onChange={handleChangeRegister}
                        />{" "} I am of legal age.
                    </div>

                    <button type="submit" className={styles.ButtonLogin} disabled={isButtonDisabled}>Continue</button>
                </div>
                <p className={styles.OR}> ------------------- OR -------------------</p>
                <div>
                    <button className={styles.ButtonGoogle} onClick={async (event) => { await handleOnSubmitAuth(event);}} disabled={isAuthButtonDisabled}>
                        <FaGoogle />
                        <p className="ml-[1rem]">Sign up with Google</p>
                    </button>

                    <button className={styles.ButtonApple} onClick={() => signIn()} disabled={isAuthButtonDisabled}>
                        <FaApple />
                        <p className="ml-[1rem]">Sign up with Apple</p>
                    </button>

                    <button className={styles.ButtonEmail} onClick={() => signIn()} disabled={isAuthButtonDisabled}>
                        <FaEnvelope />
                        <p className="ml-[1rem]">Sign up with Email</p>
                    </button>
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
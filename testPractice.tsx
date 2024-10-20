import React from "react";

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contador: 0
        }

        incrementAcountent = () => {
            this.setState({contador: this.state.contador + 1})
        }
    } 


    render() {
        return(
            <div>
                <h1> Acountent </h1>
                <button> press </button>
            </div>
        )
    }
};

export default MyComponent;


// En tu componente SignUp

import { useUserStore } from "../store/userStore";

const SignUp: React.FC<ISignUpComponentProps> = ({ onCloseSignUp, onSwitchToLogin }) => {
    // ... otros estados y funciones ...

    const addUser = useUserStore((state) => state.addUser);
    const users = useUserStore((state) => state.users);

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm(userData)) {
            const newUser: IUser = {
                ...userData,
                id: Date.now().toString(), // Temporary ID generation
            };
            addUser(newUser);
            console.log("User added:", newUser);
            console.log("All users:", users);
            setUserData(initialState);
        }
    };

    const handleOnSubmitAuth = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (session && userData.role) {
            const newUser: IUser = {
                id: Date.now().toString(),
                name: session.user?.name || "",
                lastname: "",
                email: session.user?.email || "",
                role: userData.role,
                legalAge: true,
                password: ""
            };
            addUser(newUser);
            console.log("User added with auth:", newUser);
            console.log("All users:", users);
        }
    };

    // Función para mostrar usuarios (puedes llamarla en un botón o useEffect)
    const displayUsers = () => {
        console.log("Current users in store:", users);
    };

    return (
        // ... resto del JSX ...
        <button onClick={displayUsers}>Display Users</button>
        // ... resto del JSX ...
    );
};

// En tu store (userStore.ts)

export const useUserStore = create<IUserState>((set, get) => ({
    users: [],
    // ... otros estados ...
    addUser: (user: IUser) => set((state) => {
        const newUsers = [...state.users, user];
        console.log("Updated users in store:", newUsers);
        return { users: newUsers };
    }),
    // ... otros métodos ...
}));



const UserList = () => {
    const users = useUserStore((state) => state.users);

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email} - {user.role}</li>
                ))}
            </ul>
        </div>
    );
};
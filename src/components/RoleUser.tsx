import React from "react";
import styles from "../styles/RoleUser.module.css"; // Asegúrate de crear este archivo CSS para estilos específicos

interface RoleUserProps {
    onSelectRole: (role: "supplier" | "buyer") => void; // Función para manejar la selección del rol
}

const RoleUser: React.FC<RoleUserProps> = ({ onSelectRole }) => {
    // Función para manejar la selección de rol
    const handleRoleSelection = (role: "supplier" | "buyer") => {
        console.log("Selected Role:", role); // Mostrar el rol seleccionado en la consola
        onSelectRole(role); // Ejecutar la función pasada por props para manejar el rol seleccionado
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Select Your Role</h2>
                <p>Please choose whether you're signing up as a supplier or buyer.</p>
                <div className={styles.buttonsContainer}>
                    <button
                        onClick={() => handleRoleSelection("supplier")}
                        className={styles.roleButton}
                    >
                        I'm a Supplier
                    </button>
                    <button
                        onClick={() => handleRoleSelection("buyer")}
                        className={styles.roleButton}
                    >
                        I'm a Buyer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoleUser;

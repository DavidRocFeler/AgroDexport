import React from 'react';
import styles from '../styles/CustomCheckbox.module.css';

interface CustomCheckboxProps {
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name, checked, onChange }) => {
    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className={styles.hiddenCheckbox}
            />
            <div
                className={`${styles.checkboxLabel} ${checked ? styles.checkboxChecked : ''}`}
            >
                {name === 'supplier' ? "I'm a supplier" : "I'm a buyer"}
            </div>
        </div>
    );
};

export default CustomCheckbox;

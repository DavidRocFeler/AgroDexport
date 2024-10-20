export interface ISignUpForm {
  name: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role: "supplier" | "buyer" | null;
  legalAge: boolean;
}

export interface ISignUpErrors {
    name?: string;
    lastName?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    country?: string;
    phone?: number;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginError {
    email?: string;
    password?: string;
}

export interface ISignUpComponentProps {
    onCloseSignUp: () => void;
    onSwitchToLogin: () => void; 
}

export interface ILoginComponentProps {
    onCloseLogin: () => void;
    onSwitchToSignUp: () => void;  
}

export interface IAgroProduct {
    id: number;                // ID único del producto
    name: string;              // Nombre del producto
    description: string;       // Descripción detallada
    variety: string;           // Variedad (orgánico, no transgénico, etc.)
    origin: string;            // Origen del producto (región o finca)
    harvestDate: string;         // Fecha de cosecha para frescura
    pricePerUnit: number;      // Precio por unidad o peso
    unitType: string;          // Tipo de unidad (kg, caja, etc.)
    stock: string;             // Cantidad disponible
    images: string[];          // URLs de las imágenes del producto
    nutritionalInfo: {
      calories: number;        // Información nutricional
      protein: number;         // Valor nutricional de la proteína
      fat: number;             // Valor nutricional de la grasa
      carbs: number;           // Valor nutricional de carbohidratos
    };
    uses: string[];            // Usos o recetas sugeridas
    certifications: string;  // Certificaciones (orgánico, fair trade, etc.)
    shippingOptions: {
      method: string;          // Método de envío (express, refrigerado)
      deliveryTime: string;    // Tiempo de entrega estimado
      seaFreight: string;            // Costo del envío
    };
    reviews: {
      userName: string;        // Nombre del usuario que dejó la reseña
      rating: number;          // Puntuación de la reseña (1-5)
      comment: string;         // Comentario del usuario
    }[];
  }

  export interface ISupplyChainProps {
    id: number;
    title: string;
    image: string;
    description: string;
    documentA: string;
    documentB: string;
    documentC: string | null;
    documentD: string | null;
    documentE: string | null;
  }

  export interface IUserState {
    users: IUser[];
    token: string | null;
    userType: "supplier" | "buyer" | "authenticated" | null;
    addUser: (user: IUser) => void;
    setToken: (token: string) => void;
    checkToken: () => void;
    setUserType: (userType: "supplier" | "buyer" | "authenticated" | null) => void;
    removeUser: (userId: string) => void;
    clearUsers: () => void;
  }

  export interface IUser {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password?: string;
    confirmPassword?: "";
    role: "supplier" | "buyer" | "authenticated" | null;
    legalAge: boolean;
  }

import "next-auth";

 declare module "next-auth" {
  interface User {
    role?: "buyer" | "supplier";
  }

  interface Session {
    user: User; 
  }
}

import React from "react";

export interface ISignUpForm {
  user_name: string;
  user_lastname: string;
  email: string;
  password: string;
  confirm_password?: string;
  role_name: "supplier" | "buyer" | null;
  isOlder: boolean;
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

export interface ILoginAuth {
  email: string;
  name: string;
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
    user_id: string | null;
    token: string | null;
    role_name: string | null;
    isAuthenticated: boolean;
    setUserData: (id: string, token: string, role_name: string) => void;
    clearUser: () => void;
    // addUser: () => void;
    // removeUser: (email: string) => void;
  }

 export interface IAuthThirdState {
  googleSession: IGoogleSession | null;
  createGoogleSession: (session: any) => void;
  clearAllSessions: () => Promise<void>;
  isSessionSent: boolean;
  hasInitialized: boolean;
  setSessionSent: (value: boolean) => void;
  resetInitialization: () => void;
}

  export interface IGoogleSession {
      name: string | null;
      email: string | null;
      role_name: string | null;
  }

  export interface IProvidersProps {
    children: React.ReactNode;
  }

  export interface INotificationsProps {
    isVisible: boolean;
    onClose: () => void;
  }

  export interface IAuthWrapperProps {
      children: React.ReactNode; // Define la prop 'children' como ReactNode
  }
  
export interface iProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}
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

export interface IUserSession {
  token: string;
  user: {
    id: number;
    address: string;
    email: string;
    name: string;
    phone: string;
    role: string;
    orders: [];
  };
}

export interface IOrderCarWishProps {
  product: any;
}

export interface ILabelComponentProps {
  product?: IAgriProduct;
  units: number;
  viewType: "carShop" | "ordersView" | "wishListView";
  orderStatus?: { status: string; date: string };
}

export interface IPropsCards {
  company_id: string;
  company_product_name: string;
  company_product_description?: string;
  company_price_x_kg?: number | any;
  company_product_img?: string;
}

export interface IAgriProduct {
  company_id?: string;
  company_product_img?: string;
  company_product_name?: string;
  category_id: string;
  origin?: string;
  harvest_date?: string;
  company_price_x_kg?: number | any;
  minimum_order?: number;
  stock?: number;
  company_product_description?: string;
  calories?: number;
  fat?: number;
  protein?: number;
  carbs?: number;
}

export interface IOrder {
  id: number;
  status: string;
  date: Date;
  products: IAgriProduct[];
}

export interface IAgroProduct {
  id: number; // ID único del producto
  name: string; // Nombre del producto
  description: string; // Descripción detallada
  variety: string; // Variedad (orgánico, no transgénico, etc.)
  origin: string; // Origen del producto (región o finca)
  harvestDate: string; // Fecha de cosecha para frescura
  pricePerUnit: number; // Precio por unidad o peso
  unitType: string; // Tipo de unidad (kg, caja, etc.)
  stock: string; // Cantidad disponible
  images: string[]; // URLs de las imágenes del producto
  nutritionalInfo: {
    calories: number; // Información nutricional
    protein: number; // Valor nutricional de la proteína
    fat: number; // Valor nutricional de la grasa
    carbs: number; // Valor nutricional de carbohidratos
  };
  uses: string[]; // Usos o recetas sugeridas
  certifications: string; // Certificaciones (orgánico, fair trade, etc.)
  shippingOptions: {
    method: string; // Método de envío (express, refrigerado)
    deliveryTime: string; // Tiempo de entrega estimado
    seaFreight: string; // Costo del envío
  };
  reviews: {
    userName: string; // Nombre del usuario que dejó la reseña
    rating: number; // Puntuación de la reseña (1-5)
    comment: string; // Comentario del usuario
  }[];
}

export interface MyProductListProps extends IAgroProduct {
  onDelete: (name: string) => void;
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
  userId: string;  // Agrega esta línea para incluir el userId
}

export interface IAuthWrapperProps {
  children: React.ReactNode; // Define la prop 'children' como ReactNode
}

export interface iProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export interface Company {
  id: number;
  name: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive";
}

export const companiesData: Company[] = [
  {
    id: 1,
    name: "Company One",
    role: "Admin",
    status: "Active",
  },
];

export interface ISettingsUserProps {
  id: string;
  user_name?: string;
  user_lastname?: string;
  nDni?: number | any;
  birthday?: string;
  phone?: string;
  country?: string;
  updatedFields?: Partial<ISettingsUserProps>;
}

export interface ISettingsPasswordProps {
  password: string;
  confirm_password: string;
  updatedFields?: Partial<ISettingsPasswordProps>;
}

export interface ISettingsCompanyProps {
  company_name: string;
  tax_identification_number: number | null;
  address: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
  industry: string;
  website: string;
  company_description: string;
}

export interface IPublishProductProps {
  company_product_name: string;
  company_product_description: string;
  stock: number;
  minimum_order: number;
  origin: string;
  discount: number;
  company_price_x_kg: number;
  harvest_date: string;
  company_product_img: FileList;
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
}

export interface ICertificationsProps {
  phytosanitary_certificate: FileList;
  agricultural_producer_cert: FileList;
  organic_certification: FileList;
  quality_certificate: FileList;
  certificate_of_origin: FileList;
}

export interface IFilePreview {
  name: string;
  size: string;
}

export interface IPreviewState {
  [key: string]: IFilePreview | null;
}

export interface FarmerCertificationsFormProps {
  onCancel: () => void;
}

// for FileInput
export interface FileInputProps {
  name: keyof ICertificationsProps;
  label: string;
  description: string;
  register: any; // should type this correctly with the react-hook-form register type
  errors: any; //  should type this correctly with the react-hook-form errors type
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof ICertificationsProps
  ) => void;
  previews: IPreviewState;
}

export interface FormPublishProductProps {
  onUpdateClick: () => void;
}

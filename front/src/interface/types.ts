import { DateTime } from "next-auth/providers/kakao";
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

export interface ILoginAuth {
  email: string;
  name: string;
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

export interface ProductSearchProps {
  onFilterChange: (filters: any) => void;
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
  units?: number;
  viewType?: "carShop" | "ordersView" | "wishListView";
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
  company_product_id: string | any;
  company_id: string | any;
  company_product_img: string;
  company_product_name: string;
  category_id: string;
  origin: string;
  harvest_date: string;
  company_price_x_kg: number | any;
  minimum_order: number;
  stock: number;
  company_product_description: string;
  calories: number;
  fat: number;
  protein: number;
  carbs: number;
  discount: number;
  farmer_id?: string;
  isActive?: boolean;
  farmerCertification?:{
    phytosanitary_certificate?: string;
    agricultural_producer_cert?: string;
    organic_certification?:      string;
    quality_certificate?:        string;
    certificate_of_origin?:     string; 
}
  category?: {
    name_category?: string;
  };
  company?: {
    company_name?: string;
  };
  quantity?: number; 
  onDelete?: (name: string) => void;
}

// Nueva interfaz que permite `string` para ciertos campos de `IAgriProduct`
export interface IAgriProductFormValues extends Omit<IAgriProduct, 'stock' | 'minimum_order' | 'discount' | 'company_price_x_kg'> {
  stock: string;
  minimum_order: string;
  discount: string;
  company_price_x_kg: string;
}


export interface IAgriProductErrors {
  company_product_id?: string | any;
  company_id?: string | any;
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
  discount?: number;
  farmer_id?: string;
  category?: {
    name_category?: string;
  };
  company?: {
    company_name?: string;
  };
  quantity?: number; // Agrega esta línea
}

export interface ILabelComponentPropsAgri extends IAgriProduct {
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  quantity?: number;
  onQuantityChange: (quantity: number) => void;
}

export interface ILabelComponentProps {
  products: IAgriProduct[]; // Usa la interfaz aquí
}

export interface IOrder {
  order_id: string;
  order_date: Date;
  orderDetail: {
    order_status: string;
    total: number;
  };
  buyer: {
    company_name: string;
    role_name: string;
  };
  supplier: {
    company_name: string;
    role_name: string;
  };
  products: IAgriProduct[];
}

export interface ICarProps {
  order?: IOrder;
  products?: IAgriProduct[];
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

export interface MyProductListProps extends IAgriProduct {
  onDeleteSuccess: (productId: string, newActiveStatus: boolean) => void;
  onClick: () => void; // Agrega esta propiedad
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
  notifications: INotification[];
  onClose: () => void;
  userId?: string; // Agrega esta línea para incluir el userId
}

export interface IAuthWrapperProps {
  children: React.ReactNode; // Define la prop 'children' como ReactNode
}

export interface IProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export interface IShippingAddress {
  shipping_address_id?: string;
  company_id?: string;
  contact_name?: string;
  contact_lastname?: string;
  contact_phone?: string;
  contact_email?: string;
  delivery_hours?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
  isActive?: boolean | any;
  company?: {
    user?: {
      user_id?: string;
    };
  };
}

export interface ICompanyRegister {
  user_id: string;
  company_name: string;
}
export interface ISettingsUserProps {
  user_id: string;
  user_name?: string;
  user_lastname?: string;
  nDni?: number | any;
  birthday?: string;
  phone?: string;
  country?: string;
  profile_picture?: string;
  isActive?: boolean;
  role?: {
    role_name?: string;
  };
  credential?:{
    email?: string;
  }
  companies?: {
    company_id: string;
    company_name?: string;
    country?: string;
    products?: {
      company_product_name?: string;
    }[];
    orders_buyer?: {
      orderDetail?: {
        total?: number;
        order_status?: string;
      } | null;
    }[];
    orders_supplier?: {
      orderDetail?: {
        total?: number;
        order_status?: string;
      } | null;
    }[];
  }[];
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
  company_id?: string;
  category_id: string;
  company_product_name: string;
  company_product_description: string;
  stock: number;
  minimum_order: number;
  origin: string;
  discount?: number;
  company_price_x_kg: number;
  harvest_date: string;
  company_product_img?: string;
  calories?: number;
  fat?: number;
  protein?: number;
  carbs?: number;
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
  companyId: string;
  productId: string;
}

export interface FileInputProps {
  name: keyof ICertificationsProps;
  label: string;
  description: string;
  register: any; 
  errors: any; 
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof ICertificationsProps
  ) => void;
  previews: IPreviewState;
}

export interface FormPublishProductProps {
  onUpdateClick: (productId: string, companyId: string) => void;
  selectedCompany: string | null;
  categories: { category_id: string; name_category: string }[];
  productData?: IAgriProduct | null; 
}

export interface INotification {
  notification_id: string;
  user_id: string;
  message: string;
  isRead: boolean;
  notification_date: string;
  type: string;
}

export interface IUserPanel {
  title: string;
  buttonOne: string;
  buttonTwo: string;
  buttonThree: string;
  buttonFour: string;
  buttonFive: string;
  buttonSix?: string;
  buttonSeven?: string;
  buttonEight?: string;
}

export interface ICompany {
  company_id: string;
  company?: {
    company_id?: string;
  }
  user_id?: string;
  company_name: string | any;
  tax_identification_number: number | null;
  address: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
  industry: string;
  website?: string;
  account_paypal?: string;
  company_description?: string;
  company_logo?: string;
  isActive?: boolean;
  shippingAddresses?: {
    shipping_address_id?: string;
  }
  user?: {
    user_id?: string;
    user_name?: string;
    user_lastname?: string;
    nDni?: string;
    birthday?: string;
    phone?: string;
    country?: string;
    profile_picture?: string;
    isOlder?: boolean;
    isActive?: boolean;
    role?: {
      role_name: string;
    };
  };
  updatedFields?: Partial<ICompany>;
}


export interface IOrderDetail {

  company_buyer_id: string | null;
  company_supplier_id: string;
  product_one_id: string;
  quantity_product_one: number | undefined;
  subtotal: number;
  logistic_cost: number;
  tariff: number;
  tax: number;
  discount: number;
  total: number;
}

export interface IOrderHistory{

  order_id: string;
  id_company_sell: string;
  shipping_address_id: string | null;
  order_details_id: string;
  order_date: string;
  payment_id: string;
  id_company_buy: string;
  supply_chain_id: string | null;
  account_paypal:string;
  orderDetail : {
      order_details_id: string;
      subtotal: number;
      logistic_cost: number;
      tariff: number;
      tax: number;
      discount: number;
      total: number;
      order_status: string;
  }
  buyer:{
    company_name: string;
  }
  supplier:{
    company_name: string;
  }
}

interface IOrderInfo {
  company_product_id: string;
  stock: number;
}

interface IInfoProduct {
  company_product_name: string;
  company_product_description: string;
  origin: string;
  company_price_x_kg: number;
  harvest_date: string; // O Date
  company_product_img: string;
}

export interface IProductDetails {
  orderinfo: IOrderInfo;
  infoProduct: IInfoProduct;
}




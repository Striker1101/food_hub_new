export interface UserType extends Constant {
  name: string;
  code: string;
  mobile: string;
  email: string;
  googleID: string; // for Google authentication
  facebookID: string; // for Facebook authentication
  password: string;
  passwordSave: string;
  profileImage: string;
  role: UserRole;
  token: string;
  rememberToken: string;
  resetToken: string;
  resetTokenExpiry: string;
  details: AccountType;
}

interface AccountType {
  name: string;
  number: string;
  bank_name: string;
}
export interface RestaurantType extends Constant {
  userId: number;
  name: string;
  description?: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  rating: number;
  status: "open" | "closed";
  cuisineType?: string;
  deliveryTime: string;
  minimumOrder: number;
  serviceFee: number;
  isVerified: boolean;
  featuredImage: string;
  images: Img[];
  noOfDelivery: number;
  latitude?: number;
  longitude?: number;
  details: BankAccount | string;
}

export interface ProductType extends Constant {
  name: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  category: string;
  isAvailable: boolean;
  rating: number;
}

export interface GroupedProducts {
  name: string;
  items: ProductType[];
}

export interface CartItem extends Constant {
  name: string;
  price: number;
  quantity: number;
  userId?: number;
  productId?: number;
  product?: number;
}

interface Constant {
  createAt?: string;
  updatedAt?: string;
  id?: number;
}

export enum UserRole {
  RESTAURANT = "restaurant",
  CUSTOMER = "customer",
  ADMIN = "admin",
}

interface Img {
  id?: string;
  image: string;
  description: string;
}

export interface Instruction {
  id: string;
  name: string;
  iconName: string;
  desc: string;
}

export interface BankAccount {
  bank_number: string;
  bank_name: string;
  account_name: string;
}

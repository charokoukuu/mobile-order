import { Timestamp } from "firebase/firestore";
import { paymentType } from "../component/Order";

export interface System {
  isStatus: boolean;
}

export interface MenuData {
  title: string;
  description: string;
  price: number;
  id: string;
  image: string;
  category: string;
  isBigSize: boolean;
  bigSizeDiffPrice: number;
  isStatus: boolean;
  quantity: number;
}

export interface UserData {
  uid: string;
  studentName: string;
  mailAddress: string;
}
export type paymentStatus = "not_payed" | "ordered" | "cooked" | "complete";
export interface OrderData {
  id: string;
  user: UserData;
  totalPrice: number;
  menu: MenuData[];
  isStatus: paymentStatus;
  date: Timestamp;
  payment: paymentType;
  orderNumber?: number;
  checkoutId?: string;
}

export interface OrderListTypes {
  title: string;
  count: number;
  price: number;
}

export interface LocalStorageData {
  orderData: MenuData[];
  totalPrice: number;
  date: string;
}

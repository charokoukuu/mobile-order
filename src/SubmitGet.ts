import { MenuData, OrderData, UserData } from "./Interface"
import { doc, getDocs, setDoc, collection, DocumentData, query, where, getDoc, limit, orderBy } from "firebase/firestore";
import { auth, db, functions } from "./Firebase"
import { onAuthStateChanged, User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import axios from "axios";
import { paymentType } from "./component/Order";

const apiUrl = "https://pocketmansion.tk/"
// const apiUrl = "http://localhost:3001/"
// const hostUrl = "http://localhost:3000";
const hostUrl = "https://mobile-order-4d383.web.app";
export const RandomID = () => {
  var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var N = 16;
  return Array.from(crypto.getRandomValues(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join("");
};

export const CorrectEmail = (email: string) => {
  const regex = /([a-zA-Z0-9._-]+@oit.ac.jp$)|(^runticket21@gmail.com$)/;
  return regex.test(email);
};

export const GetAllData = async (collectionName: string) => {
  let data: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  return new Promise<DocumentData[]>((resolve, reject) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    resolve(data);
  });
};

interface OrderSubmitProps {
  user: UserData;
  totalPrice: number;
  menu: MenuData[];
  payment: paymentType;
}

export const OrderSubmit = async (props: OrderSubmitProps) => {
  const id = RandomID();
  const date = new Date();
  const orderData: OrderData = {
    id: id,
    user: props.user,
    totalPrice: props.totalPrice,
    menu: props.menu,
    date: date,
    isStatus: "注文済み",
    payment: props.payment
  };

  console.log(props.menu);
  await setDoc(doc(db, "order", id), orderData);
  return id;
};

export const SearchCollectionDataGet = async (
  docId: string,
  collectionId: string,
  seachId: string
) => {
  let data: DocumentData[] = [];
  const q = query(collection(db, docId), where(collectionId, "==", seachId), orderBy("date"), limit(10));
  const querySnapshot = await getDocs(q);
  return new Promise<DocumentData[]>((resolve, reject) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    resolve(data);
  });
};

export const GetSpecificData: (
  docId: string,
  collectionId: string
) => Promise<DocumentData | undefined> = async (
  docId: string,
  collectionId: string
) => {
    const docRef = doc(db, docId, collectionId);
    const docSnap = await getDoc(docRef);
    return new Promise((resolve, reject) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      resolve(docSnap.data());
    });
  };

export const GetUserInfo = (callback: (userInfo: User) => void) => {
  const pathName = "/register";
  return new Promise<any>((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (
          !CorrectEmail(user?.email || "") &&
          window.location.pathname !== pathName
        )
          window.location.href = pathName;
        callback(user);
        resolve("");
      } else {
        if (window.location.pathname !== pathName)
          window.location.href = pathName;
        resolve("");
      }
    });
  });
};

export const Payment = async (type: paymentType, orderId: String, totalPrice: number, orderData: MenuData[], callback: (e: boolean) => void) => {
  const orderDescription: String = orderData.map(menu => menu.title).join(",");
  if (type === "stripe") {
    const StripeWebhook = httpsCallable(
      functions,
      "StripeWebhook"
    );
    try {
      const resData = await StripeWebhook({
        orderData: orderData,
        orderId: orderId,
      })
      const url = resData.data;
      window.location.href = String(url);
    } catch (err) {
      alert("決済に失敗しました。申し訳ございませんが、時間を空けて再度お試しください。");
      callback(false);
    }
  } else if (type === "paypay") {
    try {
      const resData = await axios({
        method: "POST",
        url: apiUrl + "paypay",
        timeout: 10000,
        data: {
          orderId: orderId,
          redirectUrl: hostUrl,
          amount: totalPrice,
          orderDescription: orderDescription,
        }
      })
      window.location.href = resData.data.data.url;
    } catch (err) {
      alert("決済に失敗しました。申し訳ございませんが、時間を空けて再度お試しください。");
      callback(false);
    }
  }
}
export const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

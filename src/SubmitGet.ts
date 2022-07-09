import { MenuData, OrderData, UserData } from "./Interface"
import { doc, getDocs, setDoc, collection, DocumentData, query, where, getDoc } from "firebase/firestore";
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
  var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  var N = 16
  return Array.from(crypto.getRandomValues(new Uint8Array(N))).map((n) => S[n % S.length]).join('')
}

export const CorrectEmail = (email: string) => {
  const regex = /([a-zA-Z0-9._-]+@oit.ac.jp$)|(^runticket21@gmail.com$)/;
  return regex.test(email);
}


export const GetAllData = async (collectionName: string) => {
  let data: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  return new Promise<DocumentData[]>((resolve, reject) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    resolve(data);
  })
}

interface OrderSubmitProps {
  user: UserData
  totalPrice: number
  menu: MenuData[]
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
    isStatus: "注文済み"
  }

  console.log(props.menu)
  await setDoc(doc(db, "order", id), orderData);
  return id;
}

export const SearchCollectionDataGet = async (docId: string, collectionId: string, seachId: string) => {
  let data: DocumentData[] = [];
  const q = query(collection(db, docId), where(collectionId, "==", seachId));
  const querySnapshot = await getDocs(q);
  return new Promise<DocumentData[]>((resolve, reject) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    resolve(data);
  })
}

export const GetSpecificData: (docId: string, collectionId: string) => Promise<DocumentData | undefined> = async (docId: string, collectionId: string) => {
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
        if (!CorrectEmail(user?.email || "") && window.location.pathname !== pathName) window.location.href = pathName;
        callback(user);
        resolve("");
      } else {
        if (window.location.pathname !== pathName) window.location.href = pathName;
        resolve("");
      }
    })
  });
}

export const Payment = async (type: paymentType, orderId: String, totalPrice: number, orderData: MenuData[], callback: (e: boolean) => void) => {
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
    } catch (e) {
      console.log(e);
    } finally {
      callback(false);
    }
  } else if (type === "paypay") {
    try {
      const resData = await axios.post(apiUrl + "paypay?orderId=" + orderId + "&url=" + hostUrl,
        {
          amount: totalPrice,
          orderDescription: orderId
        })
      window.location.href = resData.data.data.url;
    } catch (e) {
      console.log(e)
    } finally {
      callback(false);
    }
  }
}
export const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);
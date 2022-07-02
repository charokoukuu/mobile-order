import { MenuData, OrderData, UserData } from "./Interface"
import { doc, getDocs, setDoc, collection, DocumentData, query, where, getDoc } from "firebase/firestore";
import { auth, db } from "./Firebase"
import { onAuthStateChanged, User } from "firebase/auth";
import { UserInfo } from "./UserInfo";
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
        UserInfo.user = user;
        callback(user);
        resolve("");
      } else {
        if (window.location.pathname !== pathName) window.location.href = pathName;
        resolve("");
      }
    })
  });
}
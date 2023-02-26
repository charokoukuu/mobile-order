// anyを許容するdisable,後でPayPayやStripeのAPIのデータ構造調べて型定義する
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuData, OrderData, OrderListTypes, UserData } from "../types";
import {
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  limit,
  orderBy,
  updateDoc,
  Timestamp,
  startAfter,
  DocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { auth, db, functions } from "./Firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { paymentType } from "../component/Order";
import { SetStateAction } from "react";

export const hostUrl = window.location.protocol + "//" + window.location.host;
export const RandomID = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 16;
  return Array.from(crypto.getRandomValues(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join("");
};
export const Yesterday = () => {
  return new Date(new Date(Date.now()).getTime() - 1000 * 60 * 60 * 24);
};
export const CorrectEmail = (email: string) => {
  const regex = /([a-zA-Z0-9._-]+@oit.ac.jp$)|(^runticket21@gmail.com$)/;
  return regex.test(email);
};

export const GetAllData = async (collectionName: string) => {
  const data: MenuData[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  return new Promise<MenuData[]>((resolve, reject) => {
    try {
      querySnapshot.forEach((doc) => {
        data.push(doc.data() as MenuData);
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
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
  const timeStamp = Timestamp.now();
  const orderData: OrderData = {
    id: id,
    user: props.user,
    totalPrice: props.totalPrice,
    menu: props.menu,
    date: timeStamp,
    isStatus: "not_payed",
    payment: props.payment,
  };

  await setDoc(doc(db, "order", id), orderData);
  return orderData;
};

export const SearchCollectionDataGet = async (
  data: OrderData[],
  setData: React.Dispatch<React.SetStateAction<OrderData[]>>,
  lastDoc: any,
  setLastDoc: React.Dispatch<
    SetStateAction<DocumentSnapshot<DocumentData> | null>
  >
) => {
  const baseQuery = query(
    collection(db, "order"),
    where("user.uid", "==", auth.currentUser?.uid),
    orderBy("date", "desc"),
    limit(10)
  );
  const q =
    data.length !== 0
      ? query(baseQuery, ...(lastDoc ? [startAfter(lastDoc)] : []))
      : baseQuery;
  const querySnapshot = await getDocs(q);

  setData(
    (prev) =>
      [...prev, ...querySnapshot.docs.map((doc) => doc.data())] as OrderData[]
  );
  setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
};
//当日の全ユーザのオーダーを取得
export const TodayAllOrderGet = async (docId: string, maxValue: number) => {
  const data: OrderData[] = [];
  const q = query(
    collection(db, docId),
    orderBy("date", "desc"),
    where("date", ">", Yesterday()),
    limit(maxValue)
  );
  const querySnapshot = await getDocs(q);
  return new Promise<OrderData[]>((resolve, reject) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data() as OrderData);
    });
    resolve(data);
    reject("error");
  });
};

export const isTodayUserOrderGet = async (userId: string) => {
  let isData = false;
  const q = query(
    collection(db, "order"),
    orderBy("date", "desc"),
    where("date", ">", Yesterday()),
    where("user.uid", "==", userId),
    where("isStatus", "==", "ordered"),
    limit(10)
  );
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach(() => {
    isData = true;
  });
  return isData;
};
export const GetSpecificData: (
  docId: string,
  collectionId: string
) => Promise<OrderData | null> = async (
  docId: string,
  collectionId: string
) => {
  const docRef = doc(db, docId, collectionId);
  const docSnap = await getDoc(docRef);
  return new Promise((resolve, reject) => {
    if (docSnap.exists()) {
      // truthy
    } else {
      resolve(null);
      reject("No such document!");
    }
    resolve(docSnap.data() as OrderData);
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

export const Payment = async (
  type: paymentType,
  orderId: string,
  totalPrice: number,
  orderData: MenuData[],
  callback: (e: boolean) => void
) => {
  const orderDescription: string = orderData
    .map((menu) => menu.title)
    .join(",");
  if (type === "stripe") {
    const StripeRequest = httpsCallable(functions, "StripeRequest");
    try {
      const resData = await StripeRequest({
        orderData: orderData,
        hostUrl: hostUrl,
        orderId: orderId,
        uId: auth.currentUser?.uid,
        uMail: auth.currentUser?.email,
      });
      const respons: any = resData.data;
      window.location.href = String(respons.url);
    } catch (err) {
      alert(
        "決済に失敗しました。申し訳ございませんが、時間を空けて再度お試しください。"
      );
      callback(false);
    }
  } else if (type === "paypay") {
    // NOTE: paypayに関しては`~/api/Payment`のPayPaySessionCreateに移行したため以下の処理は使用していない
    try {
      const PayPayRequest = httpsCallable(functions, "PayPayRequest");
      const data = await PayPayRequest({
        orderId: orderId,
        hostUrl: hostUrl,
        amount: totalPrice,
        orderDescription: orderDescription,
      });
      const response: any = data.data;
      window.location.href = String(response.BODY.data.url);
    } catch (err) {
      alert(
        "決済に失敗しました。申し訳ございませんが、時間を空けて再度お試しください。"
      );
      callback(false);
    }
  }
};

export const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

export const GetPaymentStatus = async (orderId: string) => {
  const washingtonRef = doc(db, "order", orderId);
  // orderDataを取得してfunctionでmenuのquantityを減らす
  const docSnap = await getDoc(washingtonRef);
  const orderData = docSnap.data() as OrderData;
  const setOrderIdQuantity = SetOrderIdQuantity(orderData.menu);
  const reduceQuantity = httpsCallable(functions, "ReduceQuantity");
  try {
    await Promise.all([
      reduceQuantity(setOrderIdQuantity),
      updateDoc(washingtonRef, {
        isStatus: "ordered",
      }),
      AssignOrderNumber(orderId),
    ]);
  } catch (error) {
    console.log(error);
  }
};

export const PaymentGetStatus = async (
  payment: paymentType,
  checkoutId: string
) => {
  const getStatusFunction = httpsCallable(
    functions,
    payment === "paypay" ? "PayPayGetStatus" : "StripeGetStatus"
  );
  try {
    const result: any = await getStatusFunction({
      orderId: checkoutId,
    });
    const orderId = payment === "paypay" ? checkoutId : result.data.id;
    if (
      payment === "paypay" ? isPayPayEnabled(result.data) : result.data.status
    ) {
      await GetPaymentStatus(orderId);
      window.location.href = `/order/${orderId}/success`;
    } else {
      window.location.href = `/order/${orderId}/failed`;
    }
  } catch (error) {
    console.log(error);
  }
};

export const isPayPayEnabled = (result: any) => {
  return result.data.status === "COMPLETED";
};

export const AssignOrderNumber = async (orderId: string) => {
  const addCount = httpsCallable(functions, "addCount");
  try {
    const result: any = await addCount();
    const docId = doc(db, "order", orderId);
    await updateDoc(docId, {
      orderNumber: result.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const CantOrderTitle = async (orderData: MenuData[]) => {
  const data = SetOrderIdQuantity(orderData);
  const cantOrderTitle = httpsCallable(functions, "cantOrderTitle");
  try {
    const title = await cantOrderTitle(data);
    return title.data;
  } catch (error) {
    console.log(error);
  }
};

export const SetOrderIdQuantity = (orderData: MenuData[]) => {
  const data = orderData.reduce((acc, cur) => {
    const isExist = acc.find((e) => e.id === cur.id);
    if (isExist) {
      isExist.quantity++;
    } else {
      acc.push({ id: cur.id, quantity: 1 });
    }
    return acc;
  }, [] as { id: string; quantity: number }[]);
  return data;
};

export const Timer = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, time);
  });
};

export const afterToPage = async (
  countDownNumber: number,
  setTimeNumber: (num: number) => void,
  toUrl: string
) => {
  let timer = countDownNumber;
  setInterval(() => {
    timer--;
    setTimeNumber(timer);
  }, 1000);
  Timer(10000).then(() => {
    window.location.href = toUrl;
  });
};

export class NewTimer {
  private countTimer: any;

  constructor(
    private readonly msSecWaitTime: number,
    private readonly setTimeNumber: (time: number) => void,
    private readonly toUrl: string
  ) {
    this.msSecWaitTime = msSecWaitTime;
    this.setTimeNumber = setTimeNumber;
    this.toUrl = toUrl;
    this.countTimer = null;
  }

  startTimer = () => {
    if (this.countTimer !== null) {
      this.clearTimer();
    }
    return new Promise((resolve) => {
      this.countTimer = setTimeout(() => {
        resolve("");
      }, this.msSecWaitTime);
    });
  };

  clearTimer = () => {
    clearTimeout(this.countTimer);
    this.countTimer = null;
  };

  afterToPage = async () => {
    let time = this.msSecWaitTime / 1000;
    setInterval(() => {
      time--;
      this.setTimeNumber(time);
    }, 1000);
    await this.startTimer();
    window.location.href = this.toUrl;
  };
}

export const convertToTitleCountFormat = (dataArray: Array<MenuData>) => {
  const uniqueSet = new Set(dataArray.map((item) => item.title));
  const priceMap = new Map(dataArray.map((item) => [item.title, item.price]));
  return Array.from(uniqueSet).map((title) => {
    const count = dataArray.filter((x) => x.title === title).length;
    return { title, count, price: priceMap.get(title) } as OrderListTypes;
  });
};

// anyを許容するdisable,後でPayPayやStripeのAPIのデータ構造調べて型定義する
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MenuData,
  OrderData,
  OrderListTypes,
  System,
  UserData,
} from "../types";
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
import { FirebaseError } from "@firebase/util";
import { AxiosError } from "axios";

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

export const RedirectToErrorPage = (errorText: string | unknown) => {
  window.location.href = `/error/${errorText}`;
};

export const generateErrorFirebaseAndAxiosErrors = (
  errorText: string,
  e: unknown
) => {
  console.error(e);
  const errorMessagePrams =
    e instanceof FirebaseError || e instanceof AxiosError
      ? `${errorText}+${e.message}+${e.name}+${e.code}`
      : `${errorText}+${e}`;
  // errorMessageをURLに入れるためにスペースをアンダーバーに変換,/はエンコードする,?はエンコードする
  return errorMessagePrams
    .replace(/ /g, "_")
    .replace(/\//g, "%2F")
    .replace(/\?/g, "%3F");
};

export const isGetSystemStatus = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "system"));
    const data: System = querySnapshot.docs.map(
      (doc) => doc.data() as System
    )[0];
    return data.isSystem;
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "システムの状態の取得に失敗しました。",
      e
    );
  }
};

export const GetAllData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: MenuData[] = querySnapshot.docs.map(
      (doc) => doc.data() as MenuData
    );
    if (data.length === 0) {
      throw "メニューデータが存在しません。";
    }
    return data;
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "メニューデータの取得に失敗しました。",
      e
    );
  }
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
  try {
    await setDoc(doc(db, "order", id), orderData);
    return orderData;
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "オーダーデータの送信に失敗しました。",
      e
    );
  }
};

export const SearchCollectionDataGet = async (
  setData: React.Dispatch<React.SetStateAction<OrderData[]>>,
  lastDoc: DocumentSnapshot<DocumentData> | null,
  isStatus: string
) => {
  const baseQuery = query(
    collection(db, "order"),
    where("user.uid", "==", auth.currentUser?.uid),
    orderBy("date", "desc"),
    limit(10)
  );

  const q = query(
    baseQuery,
    ...(isStatus !== "all" ? [where("isStatus", "==", isStatus)] : []),
    ...(lastDoc ? [startAfter(lastDoc)] : [])
  );
  try {
    const querySnapshot = await getDocs(q);
    setData(
      (prev) =>
        [...prev, ...querySnapshot.docs.map((doc) => doc.data())] as OrderData[]
    );
    lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "オーダーデータの取得に失敗しました。",
      e
    );
  }
};
//当日の全ユーザのオーダーを取得
export const TodayAllOrderGet = async (docId: string, maxValue: number) => {
  try {
    const q = query(
      collection(db, docId),
      orderBy("date", "desc"),
      where("date", ">", Yesterday()),
      limit(maxValue)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as OrderData);
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "オーダーデータの取得に失敗しました。",
      e
    );
  }
};

export const isTodayUserOrderGet = async (userId: string) => {
  try {
    const q = query(
      collection(db, "order"),
      orderBy("date", "desc"),
      where("date", ">", Yesterday()),
      where("user.uid", "==", userId),
      where("isStatus", "in", ["ordered", "cooked"]),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "オーダーデータの取得に失敗しました。",
      e
    );
  }
};

export const FetchOneOrderDocument = async (collectionId: string) => {
  try {
    const docRef = doc(db, "order", collectionId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw "オーダーデータが存在しません。";
    }
    return docSnap.data() as OrderData;
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "オーダーデータの取得に失敗しました。",
      e
    );
  }
};

export const GetUserInfo = (callback: (userInfo: User) => void) => {
  const pathName = "/register";
  const noRedirectPathNames = [pathName, "/maintenance"];
  return new Promise<void>((resolve, reject) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          if (
            !CorrectEmail(user?.email || "") &&
            !noRedirectPathNames.includes(window.location.pathname)
          ) {
            window.location.href = pathName;
            reject(new Error("Invalid email"));
          } else {
            callback(user);
            resolve();
          }
        } else {
          if (!noRedirectPathNames.includes(window.location.pathname)) {
            window.location.href = pathName;
            reject(new Error("User not logged in"));
          } else {
            resolve();
          }
        }
      });
    } catch (e) {
      throw generateErrorFirebaseAndAxiosErrors(
        "ユーザーデータの取得に失敗しました。",
        e
      );
    }
  });
};

export const Payment = async (
  type: paymentType,
  orderId: string,
  totalPrice: number,
  orderData: MenuData[]
) => {
  if (type === "stripe") {
    try {
      const StripeRequest = httpsCallable(functions, "StripeRequest");
      const resData = await StripeRequest({
        orderData: orderData,
        hostUrl: hostUrl,
        orderId: orderId,
        uId: auth.currentUser?.uid,
        uMail: auth.currentUser?.email,
      });
      const response: any = resData.data;
      window.location.href = String(response.url);
    } catch (e) {
      throw generateErrorFirebaseAndAxiosErrors(
        "決済に失敗しました。申し訳ございませんが、時間を空けて再度お試しください。",
        e
      );
    }
  } else if (type === "paypay") {
    // NOTE: paypayに関しては`~/api/Payment`のPayPaySessionCreateに移行したため以下の処理は使用していない
  }
};

export const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

export const UpdateOrderAndReduceQuantity = async (orderId: string) => {
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
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "オーダーの更新に失敗しました。",
      e
    );
  }
};

export const HandlePaymentStatus = async (
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
      await UpdateOrderAndReduceQuantity(orderId);
      window.location.href = `/order/${orderId}/success`;
    } else {
      window.location.href = `/order/${orderId}/failed`;
    }
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors("決済の確認に失敗しました。", e);
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
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors(
      "注文番号の付与に失敗しました。",
      e
    );
  }
};

export const CantOrderTitle = async (orderData: MenuData[]) => {
  const data = SetOrderIdQuantity(orderData);
  const cantOrderTitle = httpsCallable(functions, "cantOrderTitle");
  try {
    const isSystem = await isGetSystemStatus();
    if (isSystem) {
      const title = await cantOrderTitle(data);
      return title.data;
    } else {
      throw "システムメンテナンス中です。";
    }
  } catch (e) {
    throw generateErrorFirebaseAndAxiosErrors("在庫の確認に失敗しました。", e);
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

export const dateFormatter = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

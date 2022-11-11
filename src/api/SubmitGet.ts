import { MenuData, OrderData, UserData } from "../types";
import { doc, getDocs, setDoc, collection, DocumentData, query, where, getDoc, limit, orderBy, updateDoc } from "firebase/firestore";
import { auth, db, functions } from "../api/Firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { paymentType } from "../component/Order";

export const hostUrl = window.location.protocol + "//" + window.location.host;;
export const RandomID = () => {
  var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var N = 16;
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
  let data: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  return new Promise<DocumentData[]>((resolve, reject) => {
    try {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
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
  const date = new Date();
  const orderData: OrderData = {
    id: id,
    user: props.user,
    totalPrice: props.totalPrice,
    menu: props.menu,
    date: date,
    isStatus: "not_payed",
    payment: props.payment,
  };

  await setDoc(doc(db, "order", id), orderData);
  return id;
};

export const SearchCollectionDataGet = async (
  docId: string,
  collectionId: string,
  seachId: string,
  maxValue: number
) => {
  let data: DocumentData[] = [];
  const q = query(
    collection(db, docId),
    where(collectionId, "==", seachId),
    orderBy("date", "desc"),
    limit(maxValue)
  );
  const querySnapshot = await getDocs(q);
  return new Promise<DocumentData[]>((resolve, reject) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    resolve(data);
  });
};

//当日の全ユーザのオーダーを取得
export const TodayAllOrderGet = async (
  docId: string,
  maxValue: number,
) => {
  let data: DocumentData[] = [];
  const q = query(
    collection(db, docId),
    orderBy("date", "desc"),
    where("date", ">", Yesterday()),
    limit(maxValue)
  );
  const querySnapshot = await getDocs(q);
  return new Promise<DocumentData[]>((resolve, reject) => {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    resolve(data);
  });
};

export const isTodayUserOrderGet = async (userId: string) => {
  return new Promise<boolean>(async (resolve, reject) => {
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
    querySnapshot.forEach((doc) => {
      isData = true;
    });
    resolve(isData);
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
      } else {
        reject("No such document!");
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

export const Payment = async (
  type: paymentType,
  orderId: String,
  totalPrice: number,
  orderData: MenuData[],
  callback: (e: boolean) => void
) => {
  const orderDescription: String = orderData
    .map((menu) => menu.title)
    .join(",");
  if (type === "stripe") {
    const StripeWebhook = httpsCallable(functions, "StripeWebhook");
    try {
      const resData = await StripeWebhook({
        orderData: orderData,
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
    try {
      const paypay = httpsCallable(
        functions,
        "PayPayAPI"
      );
      const data: any = await paypay({
        orderId: orderId,
        redirectUrl: hostUrl,
        amount: totalPrice,
        orderDescription: orderDescription,
      });
      window.location.href = data.data.BODY.data.url;


    } catch (err) {
      alert(
        "決済に失敗しました。申し訳ございませんが、時間を空けて再度お試しください。"
      );
      callback(false);
    }
  }
};

export const isIOS = /iP(hone|(o|a)d)/.test(navigator.userAgent);

export const StripeGetStatus = async (checkoutId: string) => {

  const CheckStatusPayment = httpsCallable(functions, "CheckStripePayment");
  try {
    const result: any = await CheckStatusPayment({
      orderId: checkoutId,
    });
    const orderId = result.data.client_reference_id;
    if (result.data.status === "complete") {
      const washingtonRef = doc(db, "order", orderId);
      await updateDoc(washingtonRef, {
        isStatus: "ordered",
      });
      await AssignOrderNumber(orderId);
      window.location.href = `/order/${orderId}/success`;
    } else {
      window.location.href = `/order/${orderId}/failed`;
    }
  } catch (error) {
    console.log(error);
  }

}
export const PayPayGetStatus = async (orderId: string) => {

  const CheckStatusPayment = httpsCallable(functions, "PayPayGetStatus");
  try {
    const result: any = await CheckStatusPayment({
      orderId: orderId,
    });
    const paymentStatus = result.data.BODY.data.status;
    if (paymentStatus === "COMPLETED") {
      const washingtonRef = doc(db, "order", orderId);
      await updateDoc(washingtonRef, {
        isStatus: "ordered",
      });
      await AssignOrderNumber(orderId);
      window.location.href = `/order/${orderId}/success`;
    } else {
      window.location.href = `/order/${orderId}/failed`;
    }
  } catch (error) {
    console.log(error);
  }

}

export const AssignOrderNumber = async (orderId: string) => {
  return new Promise(async (resolve) => {
    const currentNumber = await GetSpecificData("counter", "oneDateAllOrderCount");
    console.log(currentNumber);
    const orderNumber = currentNumber?.count + 1;
    const washingtonRef = doc(db, "counter", "oneDateAllOrderCount");
    await updateDoc(washingtonRef, {
      count: orderNumber,
    });
    const washingtonRef2 = doc(db, "order", orderId);
    await updateDoc(washingtonRef2, {
      orderNumber: orderNumber,
    });
    resolve(orderNumber);
  });
}

export class CountOrder {
  private oneTodayOrder: OrderData[] = [];
  private oneOrderMenu: MenuData[] = [];
  private titleList: MenuData[] = [];
  words: any = [];
  constructor(
    private readonly setOrderCount: (count: number[]) => void,
    private readonly setOrderTitle: (titles: any[]) => void
  ) { }
  TitleCountMethod = () => {
    const titles = this.getTitle();
    const count = this.getCount();
    this.setOrderCount(count);
    this.setOrderTitle(titles);
    this.titleList = [];
  };

  oneOrderCount = () => {
    this.oneOrderMenu.map((menu: MenuData) => {
      return this.titleList.push(menu);
    });
    this.words = this.titleList;
    const titles = this.getTitle();
    const count = this.getCount();
    this.setOrderCount(count);
    this.setOrderTitle(titles);
    this.titleList = [];
  };

  menuCount = (oneOrderCount: MenuData[]) => {
    this.oneOrderMenu = oneOrderCount;
    this.oneOrderCount();
  };

  titleCount = (oneOrderCount: string) => {
    this.words.push(oneOrderCount);
    this.TitleCountMethod();
  };

  ListDefault = (oneTodayOrder: OrderData[]) => {
    this.oneTodayOrder = oneTodayOrder;
    this.TitleCountMethod();
  };

  ListAdd = (oneTodayOrder: OrderData) => {
    this.oneTodayOrder.push(oneTodayOrder);
    this.TitleCountMethod();
  };

  ListRemove = (oneTodayOrder: OrderData) => {
    this.oneTodayOrder = this.oneTodayOrder.filter(
      (order) => order.id !== oneTodayOrder.id
    );
    this.TitleCountMethod();
  };

  //重複カウンター処理
  private DuplicateReduce() {
    return this.words.filter((x: any, i: any, self: any) => {
      return self.indexOf(x) === i;
    });
  }
  private getTitle(): MenuData[] {
    return this.DuplicateReduce();
  }
  private getCount(): number[] {
    return this.DuplicateReduce().map((name: any) => {
      return this.words.filter((x: any) => x === name).length;
    });
  }
}
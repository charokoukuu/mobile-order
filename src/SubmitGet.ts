import { MenuData, OrderData, UserData } from "./Interface"
import { doc, getDocs, setDoc, collection, DocumentData, query, where } from "firebase/firestore";
import { db } from "./Firebase"
export const RandomID = () => {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var N = 16
    return Array.from(crypto.getRandomValues(new Uint8Array(N))).map((n) => S[n % S.length]).join('')
}

export const CorrectEmail = (email: string) => {
    const regex = /^e[a-zA-Z0-9._-]+@oit.ac.jp$/;
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


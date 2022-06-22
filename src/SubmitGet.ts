import { MenuData, OrderData, UserData } from "./Interface"
import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase"
const RandomID = () => {
    var S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    var N = 16
    return Array.from(crypto.getRandomValues(new Uint8Array(N))).map((n) => S[n % S.length]).join('')
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
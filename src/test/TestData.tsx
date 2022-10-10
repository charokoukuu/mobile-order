import { Button } from "@mui/material";
import IntegrationNotistack from "../component/IntegrationNotistack";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../api/Firebase";

export const TestData = () => {
    const prev = () => {
        (async () => {
            const washingtonRef = doc(db, "order", "NZsbzb6XbMQJErQY");
            await updateDoc(washingtonRef, {
                isStatus: "決済完了",
            });
        })()
    }
    const next = () => {
        (async () => {
            const washingtonRef = doc(db, "order", "NZsbzb6XbMQJErQY");
            await updateDoc(washingtonRef, {
                isStatus: "注文完了",
            });
        })()
    }
    return (
        <div>
            <h1>TestData</h1>
            <Button onClick={prev}>決済完了</Button>
            <Button onClick={next}>注文完了</Button>
            <IntegrationNotistack message={"支払い完了"} variant={"success"} />
        </div>
    );
}

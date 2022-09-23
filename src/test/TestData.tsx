import { Button } from "@mui/material";
import { httpsCallable } from "firebase/functions";
import IntegrationNotistack from "../component/IntegrationNotistack";
import { functions } from "../api/Firebase";

export const TestData = () => {
    const Pay = () => {
        const paypay = httpsCallable(
            functions,
            "test"
        );
        (async () => {
            const data: any = await paypay({ orderId: "ljnvkjdnjdfnjklsf", redirectUrl: "https://mobile-order-4d383.web.app", amount: 300, orderDescription: "test" });
            console.log(data);
        })()
    }
    return (
        <div>
            <h1>TestData</h1>
            <Button onClick={Pay}>Pay</Button>
            <IntegrationNotistack message={"支払い完了"} variant={"success"} />
        </div>
    );
}

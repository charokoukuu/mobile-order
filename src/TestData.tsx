import { Button } from "@mui/material";
import axios from "axios";
import IntegrationNotistack from "./component/IntegrationNotistack";

export const TestData = () => {
    const Pay = () => {
        axios.post("http://localhost:4242/create-checkout-session", {
            amount: 20,
            orderDescription: "Test Payment" // 場合によってはここも動的に変更すると良いかも
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            console.log(res.data);
        })
    }
    return (
        <div>
            <h1>TestData</h1>
            <Button onClick={Pay}>Pay</Button>
            <IntegrationNotistack message={"支払い完了"} variant={"success"} />
        </div>
    );
}

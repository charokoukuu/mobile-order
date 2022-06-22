import { Button } from "@mui/material";
import { MenuData } from "../Interface"
interface CartProps {
    totalPrice: number
    onClick: () => void
    orderData: MenuData[]
}
export const Cart = (props: CartProps) => {
    return (
        <div>
            <div>
                商品: {props.orderData.length}
            </div>
            <div>
                合計: {props.totalPrice}円
            </div>
            {props.orderData.map((e, i) => {
                return (
                    <div key={i}>
                        {e.title}
                    </div>
                );
            })}
            <Button onClick={props.onClick}>購入する</Button>
        </div>
    )
}
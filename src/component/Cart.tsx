import { Button } from "@mui/material"

interface CartProps {
    onClick: () => void
    totalOrderItemsCount: number,
    totalPrice: number;
}
export const Cart = (props: CartProps) => {
    return (
        <div style={{ width: "100vw", position: "fixed", bottom: "0", left: "0", backgroundColor: "#FFFFFF", boxShadow: "0px -3px 6px #00000029", margin: "auto 0", padding: "4vw 0" }}>
            <div style={{ padding: "5vw 0", position: "relative" }}>
                <div style={{ margin: "auto 3vw", textAlign: "left", color: "#707070", position: "absolute", bottom: 7, left: 0 }}>個数：{props.totalOrderItemsCount} ¥{props.totalPrice}</div>
                <div style={{ textAlign: "right", margin: "auto 3vw", position: "absolute", bottom: 0, right: 0 }}><Button style={{ backgroundColor: "#006C9B", height: "11vw", borderRadius: "2vw" }} variant="contained" onClick={() => {
                    props.onClick()
                }}>カートを見る</Button></div>
            </div>
        </div>
    )
}
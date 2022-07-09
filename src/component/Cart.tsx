import { Badge, BadgeProps, Button, IconButton, styled } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { isIOS } from "../SubmitGet";
interface CartProps {
    onClick: () => void
    totalOrderItemsCount: number,
    totalPrice: number;
}
export const Cart = (props: CartProps) => {
    const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: 3,
            top: 8,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    return (
        <div onClick={() => {
            props.onClick()
        }} style={{ width: "100vw", position: "fixed", bottom: "0", left: "0", backgroundColor: "#FFFFFF", boxShadow: "0px -3px 6px #00000029", margin: "auto 0", padding: "4vw 0" }}>
            <div style={{ padding: isIOS ? "7vw 0" : "5vw 0", position: "relative" }}>
                <div style={{ margin: "auto 3vw", textAlign: "left", color: "#707070", position: "absolute", bottom: isIOS ? "70%" : "50%", left: 0, transform: "translate(0,50%)" }}>
                    <IconButton aria-label="cart">
                        <StyledBadge badgeContent={props.totalOrderItemsCount} color={"primary"}>
                            <ShoppingCartIcon sx={{ fontSize: "11vw" }} />
                        </StyledBadge>
                    </IconButton>
                </div>
                <div className="japanese_B themeFontColor" style={{ position: "absolute", bottom: isIOS ? "70%" : "50%", right: props.totalPrice.toString().length === 3 ? "45%" : "40%", transform: "translate(0%,50%)", fontSize: "11vw" }}>¥{props.totalPrice}</div>
                <div style={{ textAlign: "right", margin: "auto 3vw", position: "absolute", bottom: isIOS ? "70%" : "50%", right: 0, transform: "translate(0%,50%)" }}><Button style={{ backgroundColor: "#006C9B", height: "11vw", borderRadius: "2vw" }} variant="contained" onClick={() => {
                    props.onClick()
                }}>カートを見る</Button></div>
            </div>
        </div >
    )
}
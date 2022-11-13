import { Badge, BadgeProps, Button, Grid, IconButton, Paper, styled } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { isIOS } from "../api/SubmitGet";

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
        },
    }));
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} style={{ boxShadow: "0px -3px 6px #00000029" }}>
            <div onClick={() => {
                props.onClick()
            }} style={{ maxWidth: "900px", margin: "auto", paddingBottom: isIOS ? "1rem" : "0" }}>
                <Grid container spacing={2}>
                    <Grid item xs={3} style={{ margin: "auto", textAlign: "start" }} >
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={props.totalOrderItemsCount} color={"primary"}>
                                <ShoppingCartIcon sx={{ fontSize: "clamp(1rem, 10vw, 4rem)" }} />
                            </StyledBadge>
                        </IconButton>
                    </Grid>
                    <Grid item xs={3} className="japanese_B themeFontColor" style={{ margin: "auto", textAlign: "end", right: props.totalPrice.toString().length >= 3 ? "45%" : "40%", fontSize: "40px" }}>¥{props.totalPrice}</Grid>
                    <Grid item xs={5} style={{ margin: "auto", textAlign: "end" }}>
                        <Button style={{ backgroundColor: "#006C9B", fontSize: "clamp(0.5rem, 4vw, 2rem)", borderRadius: "8px" }} variant="contained" onClick={() => { props.onClick() }}>
                            カートを見る
                        </Button>
                    </Grid>
                </Grid>
            </div >
        </Paper>
    )
}
import {
  Badge,
  BadgeProps,
  Button,
  Grid,
  IconButton,
  Paper,
  styled,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { isIOS } from "../api/SubmitGet";
import classnames from "classnames";

interface CartProps {
  onClick: () => void;
  totalOrderItemsCount: number;
  totalPrice: number;
}
export const Cart = (props: CartProps) => {
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 3,
      top: 8,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }));
  return (
    <Paper className="fixed bottom-0 left-0 z-10 w-full shadow-[0px_-3px_6px_#00000029]">
      <div
        onClick={() => {
          props.onClick();
        }}
        className={classnames("m-auto max-w-[900px]", {
          "pb-4": isIOS,
        })}
      >
        <Grid container spacing={2}>
          <Grid item xs={3} style={{ margin: "auto", textAlign: "start" }}>
            <IconButton aria-label="cart">
              <StyledBadge
                badgeContent={props.totalOrderItemsCount}
                color={"primary"}
              >
                <ShoppingCartIcon
                  sx={{ fontSize: "clamp(1rem, 10vw, 4rem)" }}
                />
              </StyledBadge>
            </IconButton>
          </Grid>
          <Grid
            item
            xs={3}
            className={classnames(
              "japanese_B right-[40%] m-auto text-end text-[40px] text-runticketBlue",
              {
                // props.totalPrice.toString().length >= 3 ? "45%" : "40%"
                "right-[45px]": props.totalPrice.toString().length >= 3,
              }
            )}
          >
            ¥{props.totalPrice}
          </Grid>
          <Grid item xs={5} style={{ margin: "auto", textAlign: "end" }}>
            <Button
              className="rounded-lg bg-runticketBlue text-[clamp(0.5rem_4vw_2rem)]"
              variant="contained"
              onClick={() => {
                props.onClick();
              }}
            >
              カートを見る
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

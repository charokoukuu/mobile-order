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
import { isIOS } from "../api/helper";
import classNames from "classnames";

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
        className={classNames("m-auto max-w-3xl", {
          "pb-4": isIOS,
        })}
      >
        <Grid container spacing={2}>
          <Grid item xs={5} className="flex items-center justify-start">
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
          <Grid item xs={2} className="flex items-center justify-center">
            <p
              className={classNames(
                "japanese_B  mr-4 text-center text-[40px] text-runticketBlue",
                {
                  "text-3xl": props.totalPrice.toString().length >= 5,
                }
              )}
            >
              ¥{props.totalPrice}
            </p>
          </Grid>
          <Grid
            item
            xs={5}
            className="flex items-center justify-end pr-2 text-center"
          >
            <Button
              className="rounded-lg bg-runticketBlue"
              sx={{ fontSize: "clamp(0.1rem, 3vw, 1.4rem)" }}
              variant="contained"
            >
              カートを見る
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

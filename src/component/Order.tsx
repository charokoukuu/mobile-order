import { Button } from "@mui/material";
import { MenuData } from "../Interface";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
interface OrderProps {
  open: boolean;
  totalPrice: number;
  onNext: () => void;
  onPrev: () => void;
  onDelete: (e: MenuData, i: number) => void;
  orderData: MenuData[];
}
export const Order = (props: OrderProps) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onPrev}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#006C9B" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.onPrev}
              aria-label="close"
            >
              カート内
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <div>
              {props.orderData.map((e, i) => {
                return (
                  <div key={i} style={{ textAlign: "right" }}>
                    {e.title} {e.price}円
                    <span style={{ textAlign: "right" }}>
                      {" "}
                      <Button
                        color="error"
                        onClick={() => {
                          props.onDelete(e, i);
                        }}
                      >
                        <img src="svg/close-circle-outline.svg" alt="close" />
                      </Button>
                    </span>
                  </div>
                );
              })}
            </div>
          </ListItem>
          <Divider />
          <div style={{ textAlign: "center", margin: "4vw 0" }}>
            <div>商品: {props.orderData.length}</div>
            <div>合計: {props.totalPrice}円</div>
          </div>
        </List>
        <Button onClick={props.onNext} variant="outlined">
          購入する
        </Button>
        <Button
          style={{ marginTop: "3vw" }}
          color="error"
          onClick={props.onPrev}
          variant="outlined"
        >
          戻る
        </Button>
      </Dialog>
    </div>
  );
};

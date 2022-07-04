import { Button } from "@mui/material";
import { MenuData } from "../Interface";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import VirtualizedList from "./VirtualizedList";
import ControlledRadioButtonsGroup from "./ControlledRadioButtonsGroup";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type paymentType = "" | "paypay" | "stripe";
interface OrderProps {
  open: boolean;
  totalPrice: number;
  onNext: (payment: paymentType) => void;
  onPrev: () => void;
  onDelete: (e: MenuData, i: number) => void;
  orderData: MenuData[];
}
export const Order = (props: OrderProps) => {
  const [payment, setPayment] = useState<paymentType>("");
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
              style={{
                color: "white",
              }}
              onClick={props.onPrev}
              aria-label="close"
            >
              カート
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "0 auto" }}>
          <VirtualizedList menu={props.orderData} totalPrice={props.totalPrice} onDelete={function (e: MenuData, i: number): void {
            props.onDelete(e, i);
          }} />
        </div>
        <div style={{ textAlign: "center", margin: "4vw 0" }}>
          <div style={{ fontSize: "12vw", color: "#006C9B" }}><span style={{ fontSize: "8vw" }}>{props.orderData.length}点</span> ¥{props.totalPrice}</div>
        </div>
        <Divider />
        <ControlledRadioButtonsGroup payment={payment} setPayment={setPayment} />
        <Divider />
        <div style={{ margin: "7vw auto" }}>
          <div >
            <Button
              style={{ width: "90vw", marginTop: "3vw", backgroundColor: payment === "" ? "#848484" : "#006C9B", color: "white", borderRadius: "7px", fontSize: "5vw" }}
              onClick={() => {
                props.onNext(payment);
              }}
              variant="contained"
              disabled={payment === ""}
            >
              購入する
            </Button>
          </div>
          <div >
            <Button
              style={{ width: "90vw", marginTop: "3vw", borderColor: "#006C9B", color: "#006C9B", borderRadius: "7px", fontSize: "5vw" }}
              onClick={props.onPrev}
              variant="outlined"
            >
              戻る
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

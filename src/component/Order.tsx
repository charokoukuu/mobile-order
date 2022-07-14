import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { MenuData } from "../Interface";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";
import ControlledRadioButtonsGroup from "./ControlledRadioButtonsGroup";
import { LoadingAnimation } from "./LoadingAnimation";
import { FoodCard } from "./FoodCard";
import ConfirmDialog from "./ConfirmDialog";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export type paymentType = "" | "paypay" | "stripe";
interface OrderProps {
  open: boolean;
  totalPrice: number;
  onNext: (payment: paymentType, setIsLoad: (load: boolean) => void) => void;
  onPrev: () => void;
  onDelete: (e: MenuData, i: number) => void;
  orderData: MenuData[];
}
export const Order = (props: OrderProps) => {
  const [payment, setPayment] = useState<paymentType>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [choosedMenu, setChoosedMenu] = useState<MenuData>();
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
        <Box style={{ marginTop: "3vw" }} />
        <div className="japanese_L" style={{ margin: "7vw 0", textAlign: "center" }}>選択されたメニュー</div>
        <div>
          <div className="box" style={{ display: "flex", padding: "5vw 0", marginBottom: "5vw", backgroundColor: "#EEECE4" }}>
            <Box style={{ marginLeft: (window.innerWidth / 2 - 105) + "px" }} />
            {props.orderData.map((menu, index) => {
              return (
                <div key={index} style={{ margin: "0 4vw" }}>
                  <FoodCard menu={menu} onClick={function (): void {
                    setChoosedMenu(menu);
                    setIsDelete(true);
                  }} />
                </div>
              )
            })
            }
          </div>
        </div>
        <ConfirmDialog open={isDelete} OnConfirm={function (): void {
          choosedMenu && props.onDelete(choosedMenu, props.orderData.indexOf(choosedMenu));
          setIsDelete(false);
        }} OnCancel={function (): void {
          setIsDelete(false);
        }} title={"注文を削除"} content={choosedMenu?.title + "をカートから削除しますか？" || ""} color={"error"} yesText={"削除"} noText={"いいえ"} />
        <div style={{ textAlign: "center", margin: "4vw 0" }}>
          <div style={{ fontSize: "12vw", color: "#006C9B" }}><span style={{ fontSize: "8vw" }}>{props.orderData.length}点</span> ¥{props.totalPrice}</div>
        </div>
        <Divider />
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          テストモードのため決済フローはスキップされます
        </Alert>
        <ControlledRadioButtonsGroup payment={payment} setPayment={setPayment} />
        <Divider />
        <div style={{ margin: "7vw auto" }}>
          <div >
            {!isLoad && <Button
              style={{ width: "90vw", marginTop: "3vw", backgroundColor: payment === "" ? "#848484" : "#006C9B", color: "white", borderRadius: "7px", fontSize: "5vw" }}
              onClick={() => {
                setIsLoad(true);
                props.onNext(payment, setIsLoad);
              }}
              variant="contained"
              disabled={payment === ""}
            >
              購入する
            </Button>
            }
            {isLoad && <LoadingAnimation type={"orbit"} />}
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

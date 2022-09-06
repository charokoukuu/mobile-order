import { Box, Button } from "@mui/material";
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
import { DetailDialog } from "./DetailDialog";

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
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
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
        <Box style={{ maxWidth: "900px", margin: "0 auto" }} />
        <div>
          <div className="box" style={{ display: "flex", padding: "5% 0", marginBottom: "5%", backgroundColor: "#EEECE4", justifyContent: props.orderData.length === 1 ? "center" : "left" }}>
            <Box />
            {props.orderData.map((menu, index) => {
              return (
                <div key={index} style={{ margin: "0 4%" }}>
                  <FoodCard menu={menu} deleteButton={true} onClick={function (): void {
                    setChoosedMenu(menu);
                    setDetailDialogOpen(true);
                  }} onDelete={function (): void {
                    setChoosedMenu(menu);
                    setIsDelete(true);
                  }} />
                  <DetailDialog open={detailDialogOpen} menu={choosedMenu} onDelete={() => {
                    setDetailDialogOpen(false);
                    choosedMenu && props.onDelete(choosedMenu, props.orderData.indexOf(choosedMenu));
                  }} onPrev={() => {
                    setDetailDialogOpen(false);
                  }} isAddCart={false} />
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
        <div style={{ textAlign: "center", margin: "4% 0" }}>
          <div style={{ fontSize: "3rem", color: "#006C9B" }}><span style={{ fontSize: "2rem" }}>{props.orderData.length}点</span> ¥{props.totalPrice}</div>
        </div>
        <Divider />
        <ControlledRadioButtonsGroup payment={payment} setPayment={setPayment} />
        <Divider />
        <div style={{ margin: "3% 10%" }}>
          <div >
            {!isLoad && <Button
              style={{ width: "100%", marginTop: "3%", backgroundColor: payment === "" ? "#848484" : "#006C9B", color: "white", borderRadius: "7px", fontSize: "1rem" }}
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
              style={{ width: "100%", marginTop: "3%", borderColor: "#006C9B", color: "#006C9B", borderRadius: "7px", fontSize: "1rem" }}
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

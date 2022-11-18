import { Box, Button } from "@mui/material";
import { MenuData } from "../types";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useRef, useState } from "react";
import ControlledRadioButtonsGroup from "./ControlledRadioButtonsGroup";
import { LoadingAnimation } from "./LoadingAnimation";
import { FoodCard } from "./FoodCard";
import ConfirmDialog from "./ConfirmDialog";
import { DetailDialog } from "./DetailDialog";
import { afterToPage, CountOrder } from "../api/SubmitGet";
import { RedirectModal } from "./RedirectModal";

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
  const [orderCount, setOrderCount] = useState<number[]>([]);
  const [orderTitle, setOrderTitle] = useState<MenuData[]>();
  const [isModal, setIsModal] = useState<boolean>(false);
  const [countTimer, setCountTimer] = useState<number>(10);
  const CountOrderData = useRef<CountOrder>(
    new CountOrder(setOrderCount, setOrderTitle)
  );
  const [initialValue, setInitialValue] = useState<number>();
  useEffect(() => {
    CountOrderData.current.menuCount(props.orderData);
  }, [props]);
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
          <div
            className="box"
            style={{
              display: "flex",
              padding: "5% 0",
              marginBottom: "5%",
              backgroundColor: "#EEECE4",
              justifyContent: props.orderData.length === 1 ? "center" : "left",
            }}
          >
            <Box />
            {orderTitle?.map((menu, index) => {
              return (
                <div key={index} style={{ margin: "0 4%" }}>
                  <FoodCard
                    count={orderCount[index]}
                    menu={menu}
                    deleteButton={true}
                    onClick={function (): void {
                      setInitialValue(orderCount[index]);
                      setChoosedMenu(menu);
                      setDetailDialogOpen(true);
                    }}
                    onDelete={function (): void {
                      setChoosedMenu(menu);
                      setIsDelete(true);
                    }}
                  />
                  <DetailDialog
                    initialPurchaseCount={initialValue}
                    open={detailDialogOpen}
                    menu={choosedMenu}
                    onDelete={() => {
                      setDetailDialogOpen(false);
                      choosedMenu &&
                        props.onDelete(
                          choosedMenu,
                          props.orderData.indexOf(choosedMenu)
                        );
                    }}
                    onPrev={() => {
                      setDetailDialogOpen(false);
                    }}
                    isAddCart={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <ConfirmDialog
          open={isDelete}
          OnConfirm={function (): void {
            choosedMenu &&
              props.onDelete(choosedMenu, props.orderData.indexOf(choosedMenu));
            setIsDelete(false);
          }}
          OnCancel={function (): void {
            setIsDelete(false);
          }}
          title={"注文を削除"}
          content={choosedMenu?.title + "をカートから削除しますか？" || ""}
          color={"error"}
          yesText={"削除"}
          noText={"いいえ"}
        />
        <div style={{ textAlign: "center", margin: "4% 0" }}>
          <div style={{ fontSize: "3rem", color: "#006C9B" }}>
            <span style={{ fontSize: "2rem" }}>{props.orderData.length}点</span>{" "}
            ¥{props.totalPrice}
          </div>
        </div>
        <Divider />
        <ControlledRadioButtonsGroup
          payment={payment}
          setPayment={setPayment}
        />
        <Divider />
        <div style={{ margin: "3% 10%" }}>
          <div>
            {!isLoad && (
              <Button
                style={{
                  width: "100%",
                  marginTop: "3%",
                  backgroundColor: payment === "" ? "#848484" : "#006C9B",
                  color: "white",
                  borderRadius: "7px",
                  fontSize: "22px",
                }}
                onClick={() => {
                  setIsLoad(true);
                  // props.onNext(payment, setIsLoad);
                  setIsModal(true);
                  (async () => {
                    afterToPage(setCountTimer);
                  })();
                }}
                variant="contained"
                disabled={payment === ""}
              >
                購入する
              </Button>
            )}
            {isLoad && <LoadingAnimation type={"orbit"} />}
          </div>
          <div>
            <Button
              disabled={isLoad}
              style={{
                width: "100%",
                marginTop: "3%",
                borderColor: isLoad ? "#707070" : "#006C9B",
                color: isLoad ? "#707070" : "#006C9B",
                borderRadius: "7px",
                fontSize: "22px",
                opacity: isLoad ? "0.5" : "1",
              }}
              onClick={props.onPrev}
              variant="outlined"
            >
              戻る
            </Button>
          </div>
        </div>
      </Dialog>
      <RedirectModal isModal={isModal} countTimer={countTimer} />
    </div>
  );
};

import { Box, Button } from "@mui/material";
import { MenuData, OrderListTypes } from "../types";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { LoadingAnimation } from "./LoadingAnimation";
import { FoodCard } from "./FoodCard";
import { DetailDialog } from "./DetailDialog";
import { convertToTitleCountFormat } from "../api/helper";
import { PaymentSelectButton } from "./PaymentSelectButton";
import classNames from "classnames";
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
  const [choosedMenu, setChoosedMenu] = useState<MenuData>({} as MenuData);
  const [detailDialogOpen, setDetailDialogOpen] = useState<boolean>(false);
  const [orderList, setOrderList] = useState<OrderListTypes[]>(
    [] as OrderListTypes[]
  );
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const [initialValue, setInitialValue] = useState<number>();
  useEffect(() => {
    setOrderList(convertToTitleCountFormat(props.orderData));
  }, [props]);
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.onPrev}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: "#F2F2F2",
          },
        }}
      >
        <AppBar className="relative bg-runticketBlue">
          <Toolbar>
            <IconButton
              edge="start"
              className="text-white"
              onClick={props.onPrev}
              aria-label="close"
            >
              カート
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box />
        <div className="w-full bg-[#eeece4]">
          <div
            className={classNames("box mx-auto flex overflow-x-auto py-3", {
              "max-w-4xl": orderList.length <= 4,
            })}
          >
            <Box />
            {orderList?.map((menu, index) => {
              const menuData = props.orderData.find(
                (e) => e.title === menu.title
              );
              if (!menuData) return <div key={index}></div>;
              return (
                <div key={index} className="mx-auto px-4">
                  <FoodCard
                    count={menu.count}
                    menu={menuData}
                    deleteButton={true}
                    onClick={() => {
                      setInitialValue(menu.count);
                      setChoosedMenu(menuData);
                      setDetailDialogOpen(true);
                    }}
                    onDelete={() => {
                      menuData &&
                        props.onDelete(
                          menuData,
                          props.orderData.indexOf(menuData)
                        );
                    }}
                    className="h-[180px] w-[180px]"
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
        <div className="text-center">
          <div className="japanese_B text-[3rem] text-runticketBlue">
            <span className="text-[2rem]">{props.orderData.length}点</span> ¥
            {props.totalPrice}
          </div>
        </div>
        <div className="mx-auto w-[90%]">
          <h2 className="text-runticketBlue">決済方法</h2>
          <Divider />
          <p className="text-xs text-runticketGrayText">
            お支払い方法を選択してください。なお、RunTicketは現金決済に対応しておりません。ご了承ください。
          </p>
        </div>
        <PaymentSelectButton payment={payment} setPayment={setPayment} />
        <div className="my-[3%] mx-[10%]">
          <div>
            {!isLoad && (
              <Button
                className={classNames(
                  "mt-[3%] w-full rounded-[7px] text-[22px] text-white",
                  {
                    "bg-[#848484]": payment === "",
                    "bg-runticketBlue": payment !== "",
                  }
                )}
                onClick={() => {
                  setIsLoad(true);
                  props.onNext(payment, setIsLoad);
                }}
                variant="contained"
                disabled={payment === ""}
              >
                購入する
              </Button>
            )}
            {isLoad && <LoadingAnimation type="orbit" />}
          </div>
          <div>
            <Button
              disabled={isLoad}
              className={classNames(
                "mt-[3%] w-full rounded-[7px] border-runticketBlue bg-white text-[22px] text-runticketBlue"
              )}
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

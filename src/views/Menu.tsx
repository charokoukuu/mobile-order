import { useEffect, useState } from "react";
import { Order } from "../component/Order";
import { DetailDialog } from "../component/DetailDialog";
import { LocalStorageData, MenuData } from "../types";
import {
  GetAllData,
  OrderSubmit,
  Payment,
  isTodayUserOrderGet,
  CantOrderTitle,
  RedirectToErrorPage,
  IsGetSystemStatus,
  dateFormatter,
} from "../api/helper";
import { Cart } from "../component/Cart";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { auth } from "../api/Firebase";
import SwipeTabs from "../component/SwipeTabs";
import IntegrationNotistack from "../component/IntegrationNotistack";
import { RedirectModal } from "../component/RedirectModal";
import { PayPaySessionCreate } from "../api/Payment";

export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
const menuCategoryArray: CategoryProp[] = ["メイン", "ドリンク", "トッピング"];
interface Props {
  appBarHeight: number;
}

export const Menu = ({ appBarHeight }: Props) => {
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [menu, setMenu] = useState<MenuData[]>([]);
  const [chosenMenu, setChosenMenu] = useState<MenuData>({} as MenuData);
  const [orderData, setOrderData] = useState<MenuData[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [orderDialog, setOrderDialog] = useState<boolean>(false);
  const [isGetMenu, setIsGetMenu] = useState<boolean>(false);
  const [isTodayNotReceived, setIsTodayNotReceived] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [noPaymentTitle, setNoPaymentTitle] = useState<string[]>([]);

  useEffect(() => {
    const localStorageOrderData = JSON.parse(
      localStorage.getItem("order") || "[]"
    ) as LocalStorageData;
    if (
      localStorageOrderData.orderData &&
      localStorageOrderData.date === dateFormatter(new Date())
    ) {
      setOrderData(localStorageOrderData.orderData);
      setTotalPrice(localStorageOrderData.totalPrice);
    }
    (async () => {
      try {
        const isSystem = await IsGetSystemStatus();
        if (!isSystem) {
          window.location.href = "/maintenance";
        }
        setMenu(await GetAllData("menu"));
        setIsTodayNotReceived(
          await isTodayUserOrderGet(auth.currentUser?.uid || "")
        );
        setIsGetMenu(true);
      } catch (e) {
        setIsGetMenu(false);
        RedirectToErrorPage(e);
      }
    })();
  }, []);

  useEffect(() => {
    if (orderData.length === 0) {
      setChosenMenu({} as MenuData);
      setOrderDialog(false);
    }
  }, [orderData.length]);

  return (
    <div className="relative mx-auto max-w-3xl">
      {isGetMenu ? (
        <div>
          {isTodayNotReceived && (
            <IntegrationNotistack
              message="未受け取りの注文があります"
              variant="warning"
              onClick={() => {
                window.location.href = "/history";
              }}
            />
          )}
          <SwipeTabs
            category={menuCategoryArray}
            menu={menu}
            setChosenMenu={setChosenMenu}
            setDetailDialogOpen={setDetailDialogOpen}
            appBarHeight={appBarHeight}
          />
          <div className="mb-3">
            <Order
              open={orderDialog}
              onDelete={(e) => {
                let priceTimesCount = 0;
                const deleteOrder = orderData.filter((menu) => {
                  if (menu.title === e.title) priceTimesCount++;
                  return menu.title !== e.title;
                });
                const newTotalPrice = totalPrice - e.price * priceTimesCount;
                setOrderData(deleteOrder);
                setTotalPrice(newTotalPrice);
                const localSave: LocalStorageData = {
                  orderData: deleteOrder,
                  totalPrice: newTotalPrice,
                  date: dateFormatter(new Date()),
                };
                localStorage.setItem("order", JSON.stringify(localSave));
              }}
              orderData={orderData}
              totalPrice={totalPrice}
              onPrev={() => {
                setChosenMenu({} as MenuData);
                setOrderDialog(false);
              }}
              onNext={async (payment, setIsLoad) => {
                try {
                  const order = await OrderSubmit({
                    user: {
                      uid: auth.currentUser?.uid || "",
                      studentName: auth.currentUser?.displayName || "",
                      mailAddress: auth.currentUser?.email || "",
                    },
                    totalPrice: totalPrice,
                    menu: orderData,
                    payment: payment,
                  });
                  const cantOrderTitle = (await CantOrderTitle(
                    orderData
                  )) as string[];
                  if (cantOrderTitle.length === 0) {
                    payment === "paypay" && (await PayPaySessionCreate(order));
                    payment === "stripe" &&
                      (await Payment(payment, order.id, totalPrice, orderData));
                  } else {
                    setNoPaymentTitle(cantOrderTitle);
                    setIsModal(true);
                  }
                } catch (e) {
                  RedirectToErrorPage(e);
                } finally {
                  setIsLoad(false);
                }
                const localSave: LocalStorageData = {
                  orderData: [],
                  totalPrice: 0,
                  date: dateFormatter(new Date()),
                };
                localStorage.setItem("order", JSON.stringify(localSave));
              }}
            />
          </div>
          <DetailDialog
            open={detailDialogOpen}
            menu={chosenMenu}
            onNext={(order, count) => {
              if (!order) return;
              const currentOrderData = orderData;
              [...Array(count)].forEach(() => {
                currentOrderData.push(order);
              });

              setOrderData(currentOrderData);
              setTotalPrice(totalPrice + order.price * count);
              const localSave: LocalStorageData = {
                orderData: currentOrderData,
                totalPrice: totalPrice + order.price * count,
                date: dateFormatter(new Date()),
              };
              localStorage.setItem("order", JSON.stringify(localSave));
              setDetailDialogOpen(false);
            }}
            onPrev={() => {
              setDetailDialogOpen(false);
            }}
            isAddCart={true}
          />
          {orderData.length !== 0 && (
            <Cart
              onClick={() => {
                setOrderDialog(true);
              }}
              totalOrderItemsCount={orderData.length}
              totalPrice={totalPrice}
            />
          )}
          <RedirectModal
            isModal={isModal}
            countTimer={150000}
            toURL="/"
            buttonText="メニュー画面に戻る"
            noPaymentTitle={noPaymentTitle}
          />
        </div>
      ) : (
        <LoadingAnimation type="jelly" />
      )}
    </div>
  );
};

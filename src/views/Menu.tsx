import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Order } from "../component/Order";
import { DetailDialog } from "../component/DetailDialog";
import { MenuData } from "../types";
import { GetAllData, OrderSubmit, Payment, isTodayUserOrderGet } from "../api/SubmitGet";
import { Cart } from "../component/Cart";
import { LoadingAnimation } from "../component/LoadingAnimation";
import { auth } from "../api/Firebase";
import SwipeTabs from "../component/SwipeTabs";
import IntegrationNotistack from "../component/IntegrationNotistack";


export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
const menuCategoryArray: CategoryProp[] = ["メイン", "ドリンク", "トッピング"];

// type Mode = "menu" | "complete";
export const Menu = () => {
    // const [mode, setMode] = useState<Mode>("menu");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const [chosenMenu, setChosenMenu] = useState<MenuData | undefined>();
    const [orderData, setOrderData] = useState<MenuData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderDialog, setOrderDialog] = useState<boolean>(false);
    const [isGetMenu, setIsGetMenu] = useState<boolean>(false);
    const [isTodayNotReceived, setIsTodayNotReceived] = useState<boolean>(false);
    useEffect(() => {
        (async () => {
            try {
                setMenu(await GetAllData("menu"));
                setIsTodayNotReceived(await isTodayUserOrderGet(auth.currentUser?.uid || ""));
                setIsGetMenu(true);
            } catch (e) {
                alert("メニューの取得に失敗しました。申し訳ございませんが、再度お試しください。");
                window.location.href = "/";
            }
        })();

    }, []);

    useEffect(() => {
        orderData.length === 0 && setOrderDialog(false);
    }, [orderData.length]);

    return (
        <div style={{ position: "relative" }}>
            {isGetMenu ? <div>
                {
                    isTodayNotReceived && <IntegrationNotistack message="未受け取りの注文があります" variant="warning" onClick={() => {
                        window.location.href = "/history";
                    }} />
                }
                <SwipeTabs category={menuCategoryArray} menu={menu} setChosenMenu={setChosenMenu} setDetailDialogOpen={setDetailDialogOpen} />

                <div style={{ marginBottom: "13vw" }}>
                    <Order open={orderDialog} onDelete={(e, i) => {
                        let priceTimesCount = 0;
                        setOrderData(orderData.filter((menu, index) => {
                            if (menu.title === e.title) priceTimesCount++;
                            return menu.title !== e.title
                        }));
                        setTotalPrice(totalPrice - e.price * priceTimesCount)
                    }} orderData={orderData} totalPrice={totalPrice} onPrev={() => {
                        setOrderDialog(false);
                    }} onNext={async (payment, setIsLoad) => {
                        const orderId = await OrderSubmit({
                            user: {
                                uid: auth.currentUser?.uid || "",
                                studentName: auth.currentUser?.displayName || "",
                                mailAddress: auth.currentUser?.email || "",
                            },
                            totalPrice: totalPrice,
                            menu: orderData,
                            payment: payment,
                        })
                        Payment(payment, orderId, totalPrice, orderData, (e) => {
                            setIsLoad(e)
                        });

                    }}

                    />
                </div>
                <DetailDialog open={detailDialogOpen} menu={chosenMenu} onNext={(order, count) => {
                    const currentOrderData = orderData;
                    [...Array(count)].forEach(() => {
                        order && currentOrderData.push(order);
                    });

                    (order !== undefined) && setOrderData(currentOrderData);
                    (order !== undefined) && setTotalPrice(totalPrice + order.price * count);
                    setDetailDialogOpen(false);
                }} onPrev={() => {
                    setDetailDialogOpen(false);
                }} isAddCart={true} />
                {orderData.length !== 0 && <Cart onClick={() => {
                    setOrderDialog(true);
                }} totalOrderItemsCount={orderData.length} totalPrice={totalPrice} />
                }
            </div> :
                <LoadingAnimation type={"jelly"} />
            }
        </div>
    );
};
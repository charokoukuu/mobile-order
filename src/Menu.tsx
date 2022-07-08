import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Order } from "./component/Order";
import { DetailDialog } from "./component/DetailDialog";
import { MenuData } from "./Interface";
import { GetAllData, OrderSubmit } from "./SubmitGet";
import { Cart } from "./component/Cart";
import { LoadingAnimation } from "./component/LoadingAnimation";
import axios from "axios";
import { auth } from "./Firebase";
import SwipeTabs from "./component/SwipeTabs";
import IntegrationNotistack from "./component/IntegrationNotistack";
const apiUrl = "https://pocketmansion.tk/"
// const apiUrl = "http://localhost:3001/"
// const hostUrl = "http://localhost:3000";
const hostUrl = "https://mobile-order-4d383.web.app";
export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
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
    useEffect(() => {
        // window.location.href = "/register";
        (async () => {
            setMenu(await GetAllData("menu"));
            setIsGetMenu(true);
        })();
        console.log(navigator.userAgent);
    }, []);

    useEffect(() => {
        orderData.length === 0 && setOrderDialog(false);
    }, [orderData.length]);

    return (
        <div style={{ position: "relative" }}>
            {isGetMenu ? <div>
                <IntegrationNotistack message="未受け取りの注文があります" variant="warning" />
                <SwipeTabs menu={menu} setChosenMenu={setChosenMenu} setDetailDialogOpen={setDetailDialogOpen} />

                <div style={{ marginBottom: "13vw" }}>
                    <Order open={orderDialog} onDelete={(e, i) => {
                        setOrderData(orderData.filter((_, index) => index !== i))
                        setTotalPrice(totalPrice - e.price)
                    }} orderData={orderData} totalPrice={totalPrice} onPrev={() => {
                        setOrderDialog(false);
                    }} onNext={async (payment) => {
                        const orderId = await OrderSubmit({
                            user: {
                                uid: auth.currentUser?.uid || "",
                                studentName: auth.currentUser?.displayName || "",
                                mailAddress: auth.currentUser?.email || "",
                            },
                            totalPrice: totalPrice,
                            menu: orderData
                        })
                        if (payment === "paypay") {
                            const resData = await axios.post(apiUrl + "paypay?orderId=" + orderId + "&url=" + hostUrl,
                                {
                                    amount: totalPrice,
                                    orderDescription: "Test Payment" // 場合によってはここも動的に変更すると良いかも
                                })
                            window.location.href = resData.data.data.url;
                        } else if (payment === "stripe") {
                            console.log(payment);
                            const resData = await axios.post(apiUrl + "stripe?url=" + hostUrl,
                                {
                                    orderData: orderData,
                                    orderId: orderId,
                                }
                            )
                            window.location.href = resData.data;
                        }
                    }}

                    />
                </div>
                <DetailDialog open={detailDialogOpen} menu={chosenMenu} onNext={(e) => {
                    (e !== undefined) && setOrderData([...orderData, e]);
                    (e !== undefined) && setTotalPrice(totalPrice + e.price);
                    setDetailDialogOpen(false);
                }} onPrev={() => {
                    setDetailDialogOpen(false);
                }} />
                {orderData.length !== 0 && <Cart onClick={() => {
                    setOrderDialog(true);
                }} totalOrderItemsCount={orderData.length} totalPrice={totalPrice} />
                }
            </div> :
                <LoadingAnimation />
            }
        </div>
    );
};
import { Alert, Grid } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Order } from "./component/Order";
import { CategoryBar } from "./component/CategoryBar";
import { DetailDialog } from "./component/DetailDialog";
import { FoodCard } from "./component/FoodCard";
import { MenuData } from "./Interface";
import { GetAllData, OrderSubmit } from "./SubmitGet";
import { Cart } from "./component/Cart";
import { UserInfo } from "./UserInfo";
import { LoadingAnimation } from "./component/LoadingAnimation";
import axios from "axios";
const apiUrl = "https://pocketmansion.tk/"
// const hostUrl = "http://localhost:3000";
const hostUrl = "https://mobile-order-4d383.web.app";
export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
// type Mode = "menu" | "complete";
export const Menu = () => {
    const [categoryMode, setCategoryMode] = useState<CategoryProp>("メイン");
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
        })()
        console.log(navigator.userAgent);
    }, []);


    useEffect(() => {
        orderData.length === 0 && setOrderDialog(false)
    }, [orderData.length]);

    return (
        <div style={{ position: "relative" }}>
            {isGetMenu ? <div>
                <Alert severity="error" onClick={() => {
                    window.location.href = "/history";
                }}><div className="japanese_R">未受け取りの注文があります (詳細)</div></Alert>
                <CategoryBar category={["メイン", "ドリンク", "トッピング"]} onClick={function (category: CategoryProp): void {
                    setCategoryMode(category)
                }} />
                <Grid container >
                    {menu.filter((item: any) => item.category === categoryMode && item.isStatus).map((menu: any, index: number) => {
                        return (
                            <Grid item key={index} style={{
                                margin: "3vw auto"
                            }}>
                                <FoodCard menu={menu} onClick={function (): void {
                                    menu.isBigSize !== undefined && setChosenMenu({
                                        title: menu.title,
                                        description: menu.description,
                                        price: menu.price,
                                        id: menu.id,
                                        image: menu.image,
                                        category: menu.category,
                                        isBigSize: menu.isBigSize,
                                        bigSizeDiffPrice: menu.bigSizeDiffPrice,
                                        isStatus: menu.isStatus
                                    });
                                    menu.isBigSize === undefined && setChosenMenu(menu);
                                    setDetailDialogOpen(true);
                                }} />

                            </Grid>
                        )
                    }
                    )}
                </Grid>
                <div style={{ marginBottom: "13vw" }}>
                    <Order open={orderDialog} onDelete={(e, i) => {
                        setOrderData(orderData.filter((_, index) => index !== i))
                        setTotalPrice(totalPrice - e.price)
                    }} orderData={orderData} totalPrice={totalPrice} onPrev={() => {
                        setOrderDialog(false);
                    }} onNext={async () => {
                        const orderId = await OrderSubmit({
                            user: {
                                uid: UserInfo.user.uid,
                                studentName: UserInfo.user.displayName || "",
                                mailAddress: UserInfo.user.email || "",
                            },
                            totalPrice: totalPrice,
                            menu: orderData
                        })
                        const Pay = () => {
                            axios.post(apiUrl + "paypay?orderId=" + orderId + "&url=" + hostUrl, {
                                amount: totalPrice,
                                orderDescription: "Test Payment" // 場合によってはここも動的に変更すると良いかも
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                }
                            }).then((res) => {
                                console.log(res.data);
                                window.location.href = res.data.data.url;
                            })
                        }
                        Pay();
                        // window.location.href = "/order/" + orderId;
                    }} />
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
}
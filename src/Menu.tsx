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
import { LoadingAnimation } from "./component/LoadingAnimation";
import axios from "axios";
import { auth } from "./Firebase";
import SwipeTabs from "./component/SwipeTabs";
const apiUrl = "https://pocketmansion.tk/"
// const apiUrl = "http://localhost:3001/"
const hostUrl = "http://localhost:3000";
// const hostUrl = "https://mobile-order-4d383.web.app";
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
        })();
        console.log(navigator.userAgent);
    }, []);

    useEffect(() => {
        orderData.length === 0 && setOrderDialog(false);
    }, [orderData.length]);

    return (
        <div style={{ position: "relative" }}>
            {isGetMenu ? <div>
                <Alert severity="error" onClick={() => {
                    window.location.href = "/history";
                }}><div className="japanese_R">未受け取りの注文があります (詳細)</div></Alert>
                <SwipeTabs menu={menu} setChosenMenu={setChosenMenu} setDetailDialogOpen={setDetailDialogOpen} />
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
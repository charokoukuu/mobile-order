import { Grid } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Order } from "./component/Order";
import { CategoryBar } from "./component/CategoryBar";
import { DetailDialog } from "./component/DetailDialog";
import { FoodCard } from "./component/FoodCard";
import { MenuData } from "./Interface";
import { GetAllData, OrderSubmit } from "./SubmitGet";
import { Cart } from "./component/Cart";
export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
// type Mode = "menu" | "complete";
export const Menu = () => {
    const [categoryMode, setCategoryMode] = useState<any>("main");
    // const [mode, setMode] = useState<Mode>("menu");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const [chosenMenu, setChosenMenu] = useState<MenuData | undefined>();
    const [orderData, setOrderData] = useState<MenuData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [orderDialog, setOrderDialog] = useState<boolean>(false);


    useEffect(() => {
        (async () => {
            setMenu(await GetAllData("menu"));
        })()
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <CategoryBar category={["メイン", "ドリンク", "トッピング"]} onClick={function (category: string): void {
                setCategoryMode(category === "メイン" ? "main" : category === "ドリンク" ? "drink" : "topping")
            }} />
            <Grid container spacing={3} alignItems="center" justifyItems={"center"}>
                {menu.filter((item: any) => item.category === categoryMode && item.isStatus).map((menu: any, index: number) => {
                    return (
                        <Grid item key={index} style={{
                            margin: "0 auto",
                            textAlign: "center",
                        }}>
                            <FoodCard menu={menu} onClick={function (): void {
                                setChosenMenu({
                                    title: menu.title,
                                    description: menu.description,
                                    price: menu.price,
                                    id: menu.id,
                                    image: menu.image,
                                    category: menu.category,
                                    isBigSize: menu.isBigSize || false,
                                    isStatus: menu.isStatus
                                });
                                setDetailDialogOpen(true);
                            }} />
                            <DetailDialog open={detailDialogOpen} menu={chosenMenu} onNext={(e) => {
                                (e !== undefined) && setOrderData([...orderData, e]);
                                (e !== undefined) && setTotalPrice(totalPrice + e.price);
                                setDetailDialogOpen(false);
                            }} onPrev={() => {
                                setDetailDialogOpen(false);
                            }} />
                        </Grid>
                    )
                }
                )}
            </Grid>
            <div style={{ marginBottom: "13vw" }}>
                <Order open={orderDialog} onDelete={(e) => {
                    setOrderData(orderData.filter((value) => value.id !== e.id))
                    setTotalPrice(totalPrice - e.price)
                }} orderData={orderData} totalPrice={totalPrice} onPrev={() => {
                    setOrderDialog(false);
                }} onNext={async () => {
                    await OrderSubmit({
                        user: {
                            uuid: "kfsldkfnldskgn:d",
                            studentName: "Hinata Saito",
                            mailAddress: "e1920038@oit.ac.jp",
                            isMailAddressConfirmed: true
                        },
                        totalPrice: totalPrice,
                        menu: orderData
                    })
                    window.location.reload();
                }} />
            </div>
            {orderData.length !== 0 && <Cart onClick={() => {
                setOrderDialog(true);
            }} totalOrderItemsCount={orderData.length} totalPrice={totalPrice} />
            }
        </div>
    );
}
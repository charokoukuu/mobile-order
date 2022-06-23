import { Checkbox, Grid } from "@mui/material";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Order } from "./component/Order";
import { CategoryBar } from "./component/CategoryBar";
import { DetailDialog } from "./component/DetailDialog";
import { FoodCard } from "./component/FoodCard";
import Header from "./Header";
import { MenuData } from "./Interface";
import { GetAllData, OrderSubmit } from "./SubmitGet";
export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
// type Mode = "menu" | "complete";
export const Menu = () => {
    const [categoryMode, setCategoryMode] = useState<any>("main");
    // const [mode, setMode] = useState<Mode>("menu");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const [checked, setChecked] = useState(true);
    const [chosenMenu, setChosenMenu] = useState<MenuData | undefined>();
    const [orderData, setOrderData] = useState<MenuData[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        (async () => {
            setMenu(await GetAllData("menu"));
        })()
    }, []);


    useEffect(() => {
        let data: DocumentData[] = [];
        menu.forEach((element: any) => {
            data = [...data, {
                title: element.title,
                price: element.price,
                image: element.image,
                category: element.category,
                id: element.id,
                isStatus: checked,

            }];
        });
        setMenu(data);

        //eslint-disable-next-line
    }, [checked]);


    return (
        <div>
            <Header />
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
            <Checkbox
                checked={checked}
                onChange={handleChange}
            />
            <div style={{ marginBottom: "13vw" }}>
                <Order orderData={orderData} totalPrice={totalPrice} onClick={() => {
                    OrderSubmit({
                        user: {
                            uuid: "kfsldkfnldskgn:d",
                            studentName: "Hinata Saito",
                            mailAddress: "e1920038@oit.ac.jp",
                            isMailAddressConfirmed: true
                        },
                        totalPrice: totalPrice,
                        menu: orderData
                    })
                }} />
            </div>
        </div>
    );
}
import { Checkbox, Grid } from "@mui/material";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { CategoryBar } from "./component/CategoryBar";
import { DetailDialog } from "./component/DetailDialog";
import { FoodCard } from "./component/FoodCard";
import { db } from "./Firebase";
import Header from "./Header";
import { MenuData } from "./Interface";
export type CategoryProp = "メイン" | "ドリンク" | "トッピング";
type Mode = "menu" | "cart" | "complete";
export const Menu = () => {
    const [categoryMode, setCategoryMode] = useState<any>("main");
    const [mode, setMode] = useState<Mode>("menu");
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const [checked, setChecked] = useState(true);
    const [chosenMenu, setChosenMenu] = useState<MenuData>({
        title: "",
        description: "",
        price: 0,
        id: "",
        image: "",
        category: "",
        isBigSize: false,
        isStatus: true
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const GetMenuData = async () => {

        const querySnapshot = await getDocs(collection(db, "menu"));
        querySnapshot.forEach((doc) => {
            setMenu(menu => [...menu, doc.data()]);
        });
    }
    useEffect(() => {
        GetMenuData();
    }, []);
    useEffect(() => {
        let data: DocumentData[] = [];
        menu.forEach(element => {
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
        console.log(data);

        //eslint-disable-next-line
    }, [checked]);



    return (
        <div>
            <Header />
            {
                mode === "menu" ? <div>
                    <CategoryBar category={["メイン", "ドリンク", "トッピング"]} onClick={function (category: string): void {
                        setCategoryMode(category === "メイン" ? "main" : category === "ドリンク" ? "drink" : "topping")
                    }} />
                    <Grid container spacing={3} alignItems="center" justifyItems={"center"}>
                        {menu.filter(item => item.category === categoryMode && item.isStatus).map((menu, index) => {
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
                                            isBigSize: menu.isBigSize,
                                            isStatus: menu.isStatus
                                        });
                                        setDetailDialogOpen(true);
                                        console.log(menu);
                                    }} />
                                    <DetailDialog open={detailDialogOpen} menu={chosenMenu} onNext={() => {
                                        setMode("cart");
                                        console.log(menu);
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
                </div> :
                    <div>カート情報</div>
            }
        </div>
    );
}
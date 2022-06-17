import { Button, Grid } from "@mui/material";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FoodCard } from "./component/FoodCard";
import { db } from "./Firebase";
import Header from "./Header";

type CategoryProp = "main" | "drink" | "topping";

export const Menu = () => {
    const [mode, setMode] = useState<CategoryProp>("main");
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const GetMenuData = async () => {

        const querySnapshot = await getDocs(collection(db, "menu"));
        querySnapshot.forEach((doc) => {
            setMenu(menu => [...menu, doc.data()]);
        });
    }
    useEffect(() => {
        GetMenuData();
    }, []);


    return (
        <div>
            <Header />
            <Grid container>
                <Grid item xs={4}>
                    <Button fullWidth variant="outlined" onClick={() => {
                        setMode("main");
                    }}>メイン</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth variant="outlined" onClick={() => {
                        setMode("drink");
                    }}>ドリンク</Button>
                </Grid>

                <Grid item xs={4}>
                    <Button fullWidth variant="outlined" onClick={() => {
                        setMode("topping");
                    }}>トッピング</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} justifyContent="center" justifyItems={"center"}>
                <Grid item xs={11}>
                    {menu.filter(item => item.category === mode).map((menu, index) => {
                        return (
                            <FoodCard key={index} menu={menu} onClick={function (): void {
                                console.log(menu);
                            }} />
                        )
                    }
                    )}
                </Grid>
            </Grid>
        </div>
    );
}
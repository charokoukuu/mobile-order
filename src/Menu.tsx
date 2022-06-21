import { Button, Checkbox, Grid } from "@mui/material";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FoodCard } from "./component/FoodCard";
import { db } from "./Firebase";
import Header from "./Header";
import "./Menu.css";

type CategoryProp = "main" | "drink" | "topping";

export const Menu = () => {
    const [mode, setMode] = useState<CategoryProp>("main");
    const [menu, setMenu] = useState<DocumentData[]>([]);
    const [checked, setChecked] = useState(true);

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
            <Grid container>
                <Grid item xs={4}>
                    <Button fullWidth onClick={() => {
                        setMode("main");
                    }}>メイン</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button fullWidth onClick={() => {
                        setMode("drink");
                    }}>ドリンク</Button>
                </Grid>

                <Grid item xs={4}>
                    <Button fullWidth onClick={() => {
                        setMode("topping");
                    }}>トッピング</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems="center" justifyItems={"center"}>
                {menu.filter(item => item.category === mode && item.isStatus).map((menu, index) => {
                    return (
                        <Grid item key={index} style={{
                            margin: "0 auto",
                            textAlign: "center",
                        }}>
                            <FoodCard menu={menu} onClick={function (): void {
                                console.log(menu);
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

        </div>
    );
}
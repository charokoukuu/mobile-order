import { Button, Dialog, Grid } from "@mui/material";
import { MenuData } from "../Interface";
import "../App.css"
import { createContext, useContext, useEffect, useState } from "react";
const menuData = createContext<any>(null);
let baseMenuData: any;
interface DetailDialogProps {
    open: boolean;
    menu: MenuData | undefined;
    topping?: MenuData[];
    onNext: (menu: MenuData | undefined) => void;
    onPrev: () => void;
}


export const DetailDialog = (props: DetailDialogProps) => {
    const [menu, setMenu] = useState<MenuData | undefined>(props.menu);
    const value = { menu, setMenu }
    useEffect(() => {
        setMenu(props.menu);
        baseMenuData = { ...props.menu };
    }, [props.menu])
    return (
        <div>
            <menuData.Provider value={value}>
                <Dialog
                    open={props.open}
                    onClose={props.onPrev}
                    PaperProps={{
                        style: {
                            backgroundColor: '#EFEFEF',
                            borderRadius: '13px',
                            width: '90%',
                        },
                    }}
                >
                    <div>
                        <MaterialMenuCard />
                        {props.menu?.isBigSize && <MaterialSizeSelectCard />}
                        <div className="center themeFontColor" style={{ margin: "1% 0", fontSize: "2rem" }}>{value.menu?.price}<span style={{ fontSize: "7%" }}> 円</span></div>
                        <div className="center">  <Button style={{ width: "70%", backgroundColor: "#006C9B", height: "10%", borderRadius: "11px" }} variant="contained" onClick={() => {
                            props.onNext(value.menu);
                        }} >
                            カートに追加
                        </Button></div>
                        <div className="center" style={{ textDecoration: "underline #006C9B", margin: "2% 0" }}><Button style={{ color: "#006C9B" }} onClick={props.onPrev}>閉じる</Button></div>
                    </div>
                </Dialog>

            </menuData.Provider>

        </div>
    );
}

const MaterialMenuCard = () => {
    const { menu } = useContext(menuData);

    return (
        <div style={{ backgroundColor: "#ffffff", margin: "3% 3%", boxShadow: "0px 3px 6px #00000029", borderRadius: "13px" }}>
            <div style={{ textAlign: "center", margin: "2% 0", fontSize: "2rem" }}>
                <div className="japanese_R" style={{ padding: "5% 0" }}>{menu?.title}</div>
                <div><img style={{ width: "80%",maxWidth:"500px", borderRadius: "13px", margin: "1% 0" }} src={menu?.image || ""} alt="menu" /></div>
                <div className="japanese_L" style={{ textAlign: "center", fontSize: "0.8rem", width: "50%", margin: "auto", paddingBottom: "7%" }}>{menu?.description}</div>

            </div>
        </div>
    )
}
const MaterialSizeSelectCard = () => {
    const { menu } = useContext(menuData);

    return (
        <div style={{ backgroundColor: "#ffffff", margin: "0% 3%", boxShadow: "0px 3px 6px #00000029", borderRadius: "13px" }}>
            <div style={{ textAlign: "center", margin: "0% 0", fontSize: "2rem" }}>
                <div style={{ padding: "5% 0" }}>
                    {menu !== undefined && <SelectedCard price={menu.price} />}
                </div>
            </div>
        </div>
    )
}

const SelectedCard = (props: { price: number }) => {
    const [isChecked, setIsChecked] = useState(false);
    const { setMenu } = useContext(menuData);
    useEffect(() => {
        setMenu((prevState: any) => ({
            ...prevState, price: isChecked ? baseMenuData.price + baseMenuData.bigSizeDiffPrice : baseMenuData.price,
            title: isChecked ? baseMenuData.title + " (大)" : baseMenuData.title
        }));
    }, [isChecked, setMenu])
    const defaultButton = {
        background: "#006C9B 0% 0% no-repeat padding-box",
        boxShadow: "inset 5px 5px 5px #00000029",
        color: "#ffffff",
        width: "85%",
        height: "100%",
        borderRadius: "17px",
        border: "none",
        fontSize: "1rem",
    }
    const selectedButton = {
        ...defaultButton,
        background: "#848484 0% 0% no-repeat padding-box",
        boxShadow: "none",
    }


    return (
        <Grid container >
            <Grid item xs={6}>
                <Button onClick={() => {
                    setIsChecked(false)
                }} style={!isChecked ? { ...defaultButton } : { ...selectedButton }} variant="contained">
                    <div className="japanese_R" style={{ color: "#ffffff" }}>並</div>
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => {
                    setIsChecked(true)
                }} style={isChecked ? { ...defaultButton } : { ...selectedButton }} variant="contained">
                    <div className="japanese_R" style={{  color: "#ffffff" }}>大 +{baseMenuData.bigSizeDiffPrice}円</div>
                </Button>
            </Grid>
        </Grid>
    )
} 
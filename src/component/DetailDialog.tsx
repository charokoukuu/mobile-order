import { Button, Dialog, Grid } from "@mui/material";
import { MenuData } from "../Interface";
import "../App.css"
import { useEffect, useState } from "react";
import React from "react";

interface DetailDialogProps {
    open: boolean;
    menu: MenuData | undefined;
    topping?: MenuData[];
    onNext: (menu: MenuData | undefined) => void;
    onPrev: () => void;
}


export const DetailDialog = (props: DetailDialogProps) => {

    const [menu, setMenu] = useState<MenuData | undefined>(props.menu);
    const menuData = React.createContext<any>(menu);
    return (
        <div >
            <menuData.Provider value={{ menu, setMenu }}>
                <Dialog
                    open={props.open}
                    onClose={props.onPrev}
                    PaperProps={{
                        style: {
                            backgroundColor: '#EFEFEF',
                            borderRadius: '13px',
                        },
                    }}

                >
                    <div style={{ width: "80vw" }}>
                        <MaterialMenuCard menu={props.menu} />
                        <MaterialSizeSelectCard menu={props.menu} />
                        <div className="center themaFontColor" style={{ margin: "1vw 0", fontSize: "15vw" }}>{props.menu?.price}<span style={{ fontSize: "7vw" }}> 円</span></div>
                        <div className="center">  <Button style={{ width: "70vw", backgroundColor: "#006C9B", height: "10vw", borderRadius: "11px" }} variant="contained" onClick={() => {
                            props.onNext(props.menu)
                        }} >
                            カートに追加
                        </Button></div>
                        <div className="center" style={{ textDecoration: "underline #006C9B", margin: "2vw 0" }}><Button style={{ color: "#006C9B" }} onClick={props.onPrev}>閉じる</Button></div>
                    </div>
                </Dialog>
            </menuData.Provider>
        </div>
    );
}

interface MaterialCardProps {
    menu: MenuData | undefined;
}
const MaterialMenuCard = (props: MaterialCardProps) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <div style={{ backgroundColor: "#ffffff", margin: "3vw 3vw", boxShadow: "0px 3px 6px #00000029", borderRadius: "13px" }}>
            <div style={{ textAlign: "center", margin: "2vw 0", fontSize: "7vw" }}>
                <div className="japanese_R" style={{ padding: "3vw 0" }}>{props.menu?.title}</div>
                <div><img style={{ width: "50vw", borderRadius: "13px", margin: "1vw 0" }} src={props.menu?.image || ""} alt="menu" /></div>
                <div className="japanese_L" style={{ textAlign: "center", fontSize: "3vw", width: "50vw", margin: "auto", paddingBottom: "7vw" }}>{props.menu?.description}</div>

            </div>
        </div>
    )
}
const MaterialSizeSelectCard = (props: MaterialCardProps) => {
    return (
        <div style={{ backgroundColor: "#ffffff", margin: "0vw 3vw", boxShadow: "0px 3px 6px #00000029", borderRadius: "13px" }}>
            <div style={{ textAlign: "center", margin: "0vw 0", fontSize: "7vw" }}>
                <div style={{ padding: "5vw 0" }}><SelectedCard menu={props.menu} /></div>
            </div>
        </div>
    )
}

const SelectedCard = (props: MaterialCardProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const defaultButton = {
        background: "#006C9B 0% 0% no-repeat padding-box",
        width: "31vw",
        height: "14vw",
        boxShadow: "inset 5px 5px 5px #00000029",
        color: "#ffffff",
        borderRadius: "17px",
        border: "none"
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
                }} style={!isChecked ? { ...defaultButton, marginLeft: "3vw" } : { ...selectedButton, marginLeft: "3vw" }} variant="contained">
                    <div className="japanese_R" style={{ fontSize: "5vw", color: "#ffffff" }}>並</div>
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button onClick={() => {
                    setIsChecked(true)
                }} style={isChecked ? { ...defaultButton, marginRight: "3vw" } : { ...selectedButton, marginRight: "3vw" }} variant="contained">
                    <div className="japanese_R" style={{ fontSize: "4vw", color: "#ffffff" }}>大 (+100円)</div>
                </Button>
            </Grid>
        </Grid>
    )
} 
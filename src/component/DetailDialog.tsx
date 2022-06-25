import { Button, Dialog } from "@mui/material";
import { MenuData } from "../Interface";
import "../App.css"

interface DetailDialogProps {
    open: boolean;
    menu: MenuData | undefined;
    topping?: MenuData[];
    onNext: (menu: MenuData | undefined) => void;
    onPrev: () => void;
}


export const DetailDialog = (props: DetailDialogProps) => {
    return (
        <div >
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
                    <div className="center themaFontColor" style={{ margin: "1vw 0", fontSize: "15vw" }}>¥{props.menu?.price}</div>
                    <div className="center">  <Button style={{ width: "70vw", backgroundColor: "#006C9B", height: "10vw", borderRadius: "11px" }} variant="contained" onClick={() => {
                        props.onNext(props.menu)
                    }} >
                        カートに追加
                    </Button></div>
                    <div className="center" style={{ textDecoration: "underline", margin: "2vw 0" }}><Button onClick={props.onPrev}>閉じる</Button></div>
                </div>
            </Dialog>
        </div>
    );
}

interface MaterialCardProps {
    menu: MenuData | undefined;
}
const MaterialMenuCard = (props: MaterialCardProps) => {
    return (
        <div style={{ backgroundColor: "#ffffff", margin: "3vw 3vw", boxShadow: "0px 3px 6px #00000029", borderRadius: "13px" }}>
            <div style={{ textAlign: "center", margin: "5vw 0", fontSize: "7vw" }}>
                <div className="japanese_R" style={{ paddingTop: "5vw" }}>{props.menu?.title}</div>
                <div><img style={{ width: "50vw", borderRadius: "13px", margin: "3vw 0" }} src={props.menu?.image || ""} alt="menu" /></div>
                <div className="japanese_L" style={{ textAlign: "center", fontSize: "3vw", width: "50vw", margin: "auto", paddingBottom: "7vw" }}>{props.menu?.description}</div>

            </div>
        </div>
    )
}
const MaterialSizeSelectCard = (props: MaterialCardProps) => {
    return (
        <div style={{ backgroundColor: "#ffffff", margin: "3vw 3vw", boxShadow: "0px 3px 6px #00000029", borderRadius: "13px" }}>
            <div style={{ textAlign: "center", margin: "5vw 0", fontSize: "7vw" }}>
                {/* <div style={{ backgroundColor: "#006C9B", width: "10vw" }}>MODE</div> */}
                MODE
            </div>
        </div>
    )
}


import { Button, Dialog } from "@mui/material";
import { MenuData } from "../Interface";

interface DetailDialogProps {
    open: boolean;
    menu: MenuData | undefined;
    topping?: MenuData[];
    onNext: (menu: MenuData | undefined) => void;
    onPrev: () => void;
}


export const DetailDialog = (props: DetailDialogProps) => {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onPrev}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ textAlign: "center", margin: "5vw 0", fontSize: "7vw" }}>
                    {props.menu?.title}
                </div>
                <div>
                    <img style={{ width: "80vw" }} src={props.menu?.image} alt="menu" />
                </div>
                <div style={{ textAlign: "center", margin: "5vw 0" }}>{props.menu?.description}</div>
                <Button onClick={() => {
                    props.onNext(props.menu)
                }} >
                    カートに追加
                </Button>
                <Button onClick={props.onPrev}>戻る</Button>
            </Dialog>
        </div>
    );
}
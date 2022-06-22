import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { MenuData } from "../Interface";

interface DetailDialogProps {
    open: boolean;
    menu: MenuData;
    topping?: MenuData[];
    onNext: () => void;
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

                <DialogContent>
                    <DialogContentText >
                        {props.menu.title}
                        <img src={props.menu.image} alt="menu" />
                        <span>{props.menu.description}
                            conso
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onPrev}>戻る</Button>
                    <Button onClick={props.onNext} >
                        カートに追加
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
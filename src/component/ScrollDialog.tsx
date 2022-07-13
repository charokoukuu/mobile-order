import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Terms } from '../Terms';

interface ScrollDialogProps {
    open: boolean;
    onClick: () => void;
    setIsClose: (isClose: boolean) => void;
}


export default function ScrollDialog(props: ScrollDialogProps) {
    const [open, setOpen] = React.useState(false);


    const handleClose = () => {
        props.setIsClose(false);
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                scroll={"paper"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">利用規約</DialogTitle>
                <DialogContent dividers={true}>

                    <Terms width='90%' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >同意しない</Button>
                    <Button onClick={props.onClick} variant="contained">同意する</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

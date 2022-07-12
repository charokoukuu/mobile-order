import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
    open: boolean;
    OnConfirm: () => void;
    OnCancel: () => void;
    title: string;
    content: string;
}
export default function AlertDialog(props: AlertDialogProps) {
    return (
        <div>

            <Dialog
                open={props.open}
                onClose={props.OnCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.OnCancel}>いいえ</Button>
                    <Button onClick={props.OnConfirm}>
                        はい
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

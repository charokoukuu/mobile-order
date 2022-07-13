import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
    open: boolean;
    color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    OnConfirm: () => void;
    OnCancel: () => void;
    yesText: string;
    noText: string;
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
                    <Button onClick={props.OnCancel}>{props.noText}</Button>
                    <Button onClick={props.OnConfirm} variant="contained" color={props.color}>
                        {props.yesText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

import React, { ReactNode } from "react";
import {
    Button, Dialog,
    DialogActions, DialogContent, DialogTitle,
} from '@mui/material';


interface ConfirmDialogProps {
    title: string
    children?: ReactNode
    open: boolean
    setOpen: (state: boolean) => void
    onConfirm: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, children, open, setOpen, onConfirm }) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={() => setOpen(false)}
                >
                    No
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
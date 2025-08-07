import {Button, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Slide} from "@mui/material";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ErrorDialog({title= "Sorry Error", message="", action=()=>{}}) {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        action();
        setOpen(false);
    };
    return <div>
        <Dialog
            open={open}
            slots={{
                transition: Transition,
            }}
            keepMounted
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    </div>;
}
import React from "react";
import Icon from "../../../components/uielements/icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import currencyIcon from "./../../../images/won-currency-symbol.png";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";

export default function BuyCoinPopupModal() {
    const [open, setOpen] = React.useState(false);
    const [currentRate, setCurrentRate] = React.useState(100);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Icon onClick={handleClickOpen}>
                <img
                    style={{ height: "inherit", width: "inherit" }}
                    src={currencyIcon}
                    alt=""
                ></img>
            </Icon>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Buy Coins</DialogTitle>
                <DialogContent>
                    <DialogContentText>Current Rate: 1 Coin = {currentRate} Won</DialogContentText>
                    <br/>
                    <br/>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Buy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

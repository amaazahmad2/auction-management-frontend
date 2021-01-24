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
import InputAdornment from "@material-ui/core/InputAdornment";
import { buyCoinsService } from "./../../../services/coinsServices";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function BuyCoinPopupModal() {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("");
    const currentRate=100;
    const [amountInWon, setAmountInWon] = React.useState(0);
    const [numberOfCoins, setNumberOfCoins] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAmountChange = (event) => {
        setAmountInWon(event.target.value);
        setNumberOfCoins(event.target.value / currentRate);
    };

    const handleCoinChange = (event) => {
        setNumberOfCoins(event.target.value);
        setAmountInWon(event.target.value * currentRate);
    };

    const handlePurchase = async (event) => {
        if (numberOfCoins < 1) {
            setAlertMessage("Please enter a valid amount or number of coins");
            setAlertOpen(true);
            setAlertSeverity("warning");
            return;
        }
        const response = await buyCoinsService(numberOfCoins);

        if (response.status === 200) {
            if (numberOfCoins === 1)
                setAlertMessage(
                    numberOfCoins + " coin purchased successfully!"
                );
            else
                setAlertMessage(
                    numberOfCoins + " coins purchased successfully!"
                );
            setAlertOpen(true);
            setAlertSeverity("success");
            return;
        } else {
            setAlertMessage("Error in Purchasing Coins");
            setAlertOpen(true);
            setAlertSeverity("error");
            return;
        }
    };

    const handleAlertClose = (event) => {
        setAlertOpen(false);
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
                    <DialogContentText>
                        {currentRate} ₩ = 1 Coin
                    </DialogContentText>
                    <br />
                    <br />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "end",
                        }}
                    >
                        <TextField
                            style={{ width: "6rem" }}
                            size="small"
                            label="Amount"
                            id="standard-start-adornment"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        ₩
                                    </InputAdornment>
                                ),
                            }}
                            onChange={handleAmountChange}
                            value={amountInWon}
                            type="number"
                        />

                        <div
                            style={{ marginLeft: "10px", marginRight: "10px" }}
                        >
                            {" "}
                            ={" "}
                        </div>

                        <TextField
                            style={{ width: "6rem" }}
                            size="small"
                            label="Coins"
                            id="standard-start-adornment"
                            onChange={handleCoinChange}
                            value={numberOfCoins}
                        />
                    </div>
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlePurchase} color="primary">
                        Buy
                    </Button>
                </DialogActions>
                <div>
                    <Snackbar
                        open={alertOpen}
                        autoHideDuration={6000}
                        onClose={handleAlertClose}
                    >
                        <Alert
                            elevation={6}
                            variant="filled"
                            onClose={handleAlertClose}
                            severity={alertSeverity}
                        >
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </div>
            </Dialog>
        </div>
    );
}

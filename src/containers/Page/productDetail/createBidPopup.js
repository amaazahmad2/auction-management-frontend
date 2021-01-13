import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import currencyIcon from "./../../../images/won-currency-symbol.png";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { buyCoinsService } from "./../../../services/coinsServices";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function CreateBidPopup(){

    function handlePlaceBid(post){
        
    }

    return(
        <div>
            <Button
                onClick={() => {
                    //handlePlaceBid(post);
                }}
                variant={"contained"}
                color={"primary"}
            >
                {"Place Bid"}
            </Button>
            <Dialog>

            </Dialog>
        </div>
    )
}
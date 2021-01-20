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
import {store} from './../../../redux/store';
import {placeBidService} from './../../../services/bidServices'

export default function CreateBidPopup(props) {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
        //console.log(props.post);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handlePlaceBid(post) {
        //console.log("PLACE BID CLICKED");
        let coinsInNewBid = parseFloat(document.getElementById("coins").value);
        //console.log("coins: ",coins);
        //console.log("coins in profile: ",store.getState().user.coins);

        if(coinsInNewBid <= post.get_highest_bid){
            setAlertMessage("Your bid is lower than the highest bid!");
            setAlertOpen(true);
            setAlertSeverity("error");
            return;
        } 
        else if(coinsInNewBid > post.coins){
            setAlertMessage("You do not have enough coins");
            setAlertOpen(true);
            setAlertSeverity("error");
            return;
        }
        else{
            //console.log("POST: ",post);
            let response = await placeBidService(post.product_uuid, coinsInNewBid);
            console.log("RESPONSE: ",response);

            if(response.data.status === "failure"){
                setAlertMessage("Your bid is lower than the highest bid!");
                setAlertOpen(true);
                setAlertSeverity("error");
                return;
            }
            else if(response.data.status === "Success"){
                setAlertMessage("Bid Placed!");
                setAlertOpen(true);
                setAlertSeverity("success");
    
                setOpen(false);
                return;
            }
            else{
                setAlertMessage("Unknown error occurred");
                setAlertOpen(true);
                setAlertSeverity("error");
                return;
            }

            
        }
    }

    function handleQuantityChange(post) {
        let coins = parseFloat(document.getElementById("coins").value);
        if (isNaN(coins)) {
          document.getElementById("coins").value = 0;
         }
         // else if (coins < post.get_highest_bid) document.getElementById("coins").value = post.get_highest_bid;
        
    }

    const handleAlertClose = (event) => {
        setAlertOpen(false);
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                variant={"contained"}
                color={"primary"}
            >
                {"Place Bid"}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">{props.post.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Starting Bid: {props.post.price}
                    </DialogContentText>
                    <DialogContentText>
                        Highest Bid: {props.post.get_highest_bid}
                    </DialogContentText>
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
                            label="Bid"
                            id="coins"
                            onChange={() => {
                                handleQuantityChange(props.post);
                              }}
                            type="number"
                            defaultValue={props.post.get_highest_bid}
                        />
                    </div>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={()=>{handlePlaceBid(props.post)}} color="primary">
                        Place Bid
                    </Button>
                </DialogActions>
                
                </DialogContent>
                
            </Dialog>
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
        </div>
    );
}

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {placeBidService} from './../../../services/bidServices'

export default function CreateBidPopup(props) {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function handlePlaceBid(post) {
        let coinsInNewBid = parseFloat(document.getElementById("coins").value);

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
            let response = await placeBidService(post.product_uuid, coinsInNewBid);

            if(response.data.status === "failure"){
                setAlertMessage("Failure");
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
                        Latest Bid: {props.post.get_highest_bid}
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

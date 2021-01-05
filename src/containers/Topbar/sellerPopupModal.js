import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './topbarSellerButton.css';

export default function SellerPopupModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" className="topbarSellerButton" onClick={handleClickOpen}>
        Become a Seller
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Become a Seller</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To successfuly signup as a seller, kindly fill and submit the following details.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="bankAccount"
            label="Bank Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="accountNumber"
            label="Bank Account Number"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

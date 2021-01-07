import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import "./sellerPopupModal.css";
// import worldMapData from 'city-state-country';
import csc from "country-state-city";

export default function SellerPopupModal() {
    // const listOfCountries = csc.getAllCountries();
    // const KoreaObj = csc.getCountryByCode('KR');

    const [open, setOpen] = React.useState(false);

    const [bank, setBank] = React.useState("");


    const [city, setCity] = React.useState("");
    const [addressState, setAddressState] = React.useState("");
    const [countryCode, setCountryCode] = React.useState("KR");

    const [listOfCities, setListOfCities] = React.useState([]);

    const listOfStates = csc.getStatesOfCountry("KR");
    

   

    const listOfBanks = [
        "Bank of Korea",
        "Korea Development Bank",
        "Industrial Bank of Korea",
        "Korea Eximbank",
        "National Federation of Fisheries Cooperatives",
        "Nonghyup Bank",
        "Citibank Korea",
        "KEB Hana Bank",
        "KB Kookmin Bank",
        "Standard Chartered Korea",
        "Shinhan Bank",
        "Woori Bank",
        "Daegu Bank",
        "Busan Bank",
        "Kyongnam Bank",
        "Kwangju Bank",
        "Jeonbuk Bank",
        "Jeju Bank",
        "K Bank",
        "KakaoBank",
    ];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleBankChange = (event) => {
        console.log(event.target.value);
        setBank(event.target.value);
    };

    const handleCountryChange = (event) => {
        //country code is being stored as a string.
        setCountryCode(event.target.value);

        
        //console.log(event.target.value)
        //console.log(listOfStates);
    };

    const handleAddressStateChange = (event) => {
        setAddressState(event.target.value);
        // console.log(event.target.value)
        const tempArr = csc.getCitiesOfState(countryCode, event.target.value);
        setListOfCities(tempArr);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        // const tempArr = csc.getCitiesOfState(country, event.target.value);
        // setListOfCities(tempArr);
    };

    return (
        <div>
            <Button
                variant="contained"
                className="topbarSellerButton"
                onClick={handleClickOpen}
            >
                Become a Seller
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Become a Seller
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To successfuly signup as a seller, kindly fill and
                        submit the following details.
                    </DialogContentText>
                    <br />

                    <InputLabel htmlFor="bankNameLabel" fullWidth>
                        Bank Name
                    </InputLabel>
                    <Select
                        fullWidth
                        native
                        input={<Input id="bankNameLabel" />}
                        value={bank}
                        onChange={handleBankChange}
                    >
                        <option aria-label="None" value="" />
                        {listOfBanks.map((bankName) => {
                            return <option value={bankName}>{bankName}</option>;
                        })}
                    </Select>

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
                    <br/>
                    <br/>
                    <InputLabel htmlFor="countryDropdownLabel">
                        Country
                    </InputLabel>
                    <Select
                        fullWidth
                        input={<Input id="countryDropdownLabel" />}
                        value={countryCode}
                        onChange={handleCountryChange}
                        displayEmpty
                        renderValue={()=>{return "South Korea"}}
                    >
                        <MenuItem value="KR">South Korea</MenuItem>
                        
                    </Select>
                    <br/>
                    <br/>
                    <InputLabel htmlFor="stateDropdownLabel">State</InputLabel>
                    <Select
                        fullWidth
                        input={<Input id="stateDropdownLabel" />}
                        value={addressState}
                        onChange={handleAddressStateChange}
                    >
                        {listOfStates.map((stateObj) => {
                            return (
                                <MenuItem value={stateObj.isoCode}>
                                    {stateObj.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <br/>
                    <br/>
                    <InputLabel htmlFor="cityDropdownLabel">City</InputLabel>
                    <Select
                        fullWidth
                        input={<Input id="cityDropdownLabel" />}
                        value={city}
                        onChange={handleCityChange}
                    >
                        {listOfCities.map((cityObj) => {
                            return (
                                <MenuItem value={cityObj.name}>
                                    {cityObj.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <TextField
                        margin="dense"
                        id="address"
                        label="Home Address"
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

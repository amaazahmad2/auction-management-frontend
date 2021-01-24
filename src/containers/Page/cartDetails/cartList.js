import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { store } from "../../../redux/store";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { addToCartAction, removeFromCartAction, updateCartAction } from "../../../redux/actions/cartAction";
import { useHistory } from 'react-router';





const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1),
    },
}));

export default function Orders() {
    const classes = useStyles();
    let cartFromRedux= store.getState().cart;
    const [cart,setCart] = React.useState(cartFromRedux);
    let history = useHistory();
    

    function handleQuantityChange(row) {
        let qty = parseInt(
            document.getElementById("quantity" + row.uuid).value
        );

        if (isNaN(qty)) {
            document.getElementById("quantity" + row.uuid).value = 0;
        } else if (qty < 1)
            document.getElementById("quantity" + row.uuid).value = 0;
        else if (qty >= row.quantity_in_stock) {
            document.getElementById("quantity" + row.uuid).value =
                row.quantity_in_stock;
        }
        row.quantity_ordered = qty;
        document.getElementById("totalAmount" + row.uuid).value =
            qty * row.price;
        //save the quanitty ordwered in the cart

        store.dispatch(addToCartAction(row));
    }

    function handleRemoveItem(uuid){
      store.dispatch(removeFromCartAction(uuid));
      cartFromRedux= store.getState().cart;
      setCart(cartFromRedux);
    }

    function handleCheckoutButtonClick(){
      history.push('checkout');
    }

    return (
        <React.Fragment>
            <Table
                stickyHeader
                aria-label="sticky table"
                size="small"
                className={classes.table}
                aria-label="spanning table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell colSpan={1}>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.map((row) => (
                        <TableRow key={row.uuid}>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<DeleteIcon />}
                                    onClick={()=>{handleRemoveItem(row.uuid)}}
                                >
                                    Remove Item
                                </Button>
                            </TableCell>
                            <TableCell>{row.product_name}</TableCell>

                            <TableCell>{row.price}</TableCell>
                            <TableCell>
                                {
                                    <TextField
                                        style={{ marginBottom: "15px" }}
                                        size="small"
                                        label="Quantity"
                                        defaultValue={row.quantity_ordered}
                                        id={"quantity" + row.uuid}
                                        onChange={() => {
                                            handleQuantityChange(row);
                                        }}
                                        type="number"
                                    />
                                }
                            </TableCell>
                            <TableCell>
                                <Typography id={"totalAmount" + row.uuid}>
                                    {row.price * row.quantity_ordered}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box display="flex" flexDirection="row-reverse" marginTop="10px">
                <Button variant="contained" color="primary" onClick={handleCheckoutButtonClick}>
                    Checkout Cart
                </Button>
            </Box>
        </React.Fragment>
    );
}

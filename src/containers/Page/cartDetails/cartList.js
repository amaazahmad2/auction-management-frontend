import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { store } from "../../../redux/store";
import { CardText } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

/*<TextField
          style={{ marginBottom: "15px" }}
          size="small"
          label="Quantity"
          defaultValue={1}
          id="quantity"
          onChange={() => {
            handleQuantityChange(row.quantity_in_stock);
          }}
          type="number"
        />
        
        
        function handleQuantityChange(quantity_in_stock) {
  let qty = parseInt(document.getElementById("quantity").value);
  if (isNaN(qty)) {
    document.getElementById("quantity").value = 0;
  } else if (qty < 1) document.getElementById("quantity").value = 0;
  else if (qty >= quantity_in_stock) {
    document.getElementById("quantity").value = quantity_in_stock;
  }
}
        */

// const rows = [
//   createData(
//     0,
//     "Elvis Presley ojfldsk jfldks jfiidjfsk jfoijf oidjfioidsj flkdaj foijsda fjdisj foiasjfoidsj fkls jf fjewe a  ",
//     "Tupelo, MS",
//     "VISA ⠀•••• 3719",
//     312.44
//   ),
//   createData(1, "Paul McCartney", "London, UK", "VISA ⠀•••• 2574", 866.99),
//   createData(2, "Tom Scholz", "Boston, MA", "MC ⠀•••• 1253", 100.81),
//   createData(3, "Michael Jackson", "Gary, IN", "AMEX ⠀•••• 2000", 654.39),
//   createData(
//     4,
//     "Bruce Springsteen",
//     "Long Branch, NJ",
//     "VISA ⠀•••• 5919",
//     212.79
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const cart = store.getState().cart;
  console.log("cart: ", cart);
  if (cart.length === 0) {
    cart.push({
      price: 100,
      product_name: "tesing9000",
      quantity_ordered: 1,
      quantity_in_stock: 69,
      uuid: "626ed2a9-009f-495d-a6be-f1c98a24a8f4",
    });
    cart.push({
      price: 120,
      product_name: "tesing9100",
      quantity_ordered: 6,
      quantity_in_stock: 420,
      uuid: "69696ed2a9-009f-495d-a6be-f1c98a24a8f4",
    });
  }

  function handleQuantityChange(row) {
    let qty = parseInt(document.getElementById("quantity" + row.uuid).value);

    if (isNaN(qty)) {
      document.getElementById("quantity" + row.uuid).value = 0;
    } else if (qty < 1)
      document.getElementById("quantity" + row.uuid).value = 0;
    else if (qty >= row.quantity_in_stock) {
      document.getElementById("quantity" + row.uuid).value =
        row.quantity_in_stock;
    }
    row.quantity_ordered = qty;
    console.log("quantity ordered: ", row.quantity_ordered);
    document.getElementById("totalAmount" + row.uuid).value = qty * row.price;
    //save the quanitty ordwered in the cart
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
              <TableCell></TableCell>
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
        <Button variant="contained" color="primary">
          Checkout Cart
        </Button>
      </Box>
    </React.Fragment>
  );
}

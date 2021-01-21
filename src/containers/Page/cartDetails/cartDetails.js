import React from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";
import Orders from "./cartList";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Row, Col, Container } from "reactstrap";
import { SentimentSatisfied } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import FirebaseHelper from "../../../helpers/firebase/index";
import { useHistory } from "react-router";
import cart from "../../../redux/reducers/cart";
import { store } from "../../../redux/store";
import firebase from "firebase";

class CartDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };

    const listRef = firebase.database().ref("products");
    let tempList = [];
    listRef.on("value", (snapshot) => {
      const prods = snapshot.val();
      tempList = [];
      console.log("snapshot: ", prods);
      for (let key in prods) {
        let obj = prods[key];
        obj.key = key;
        tempList.push(obj);
      }
      this.setState({
        list: tempList,
      });
      console.log("List:", this.state.list);
    });
  }

  render() {
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title="Cart">
            <Orders />
          </Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
  }
}

export default CartDetails;

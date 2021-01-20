import React from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";

import { Row, Col, Container } from "reactstrap";

import { SentimentSatisfied } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";

import FirebaseHelper from "../../../helpers/firebase/index";

import { useHistory } from "react-router";

import cart from "../../../redux/reducers/cart";
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
          <Papersheet title="Cart"></Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
  }
}

export default CartDetails;

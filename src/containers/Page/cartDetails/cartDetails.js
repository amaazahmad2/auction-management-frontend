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
import { useHistory } from "react-router";

class CartDetails extends React.Component {
  constructor(props) {
    super(props);
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

import React, { Component } from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { FullColumn } from "../../../components/utility/rowColumn";
import firebase from "firebase";
import FirebaseHelper from "../../../helpers/firebase/index";
import ShowDetails from "./showDetails.js";

export default class ProductDetail extends Component {
  constructor(props, context) {
    super();
    this.state = {
      product: {
      },
    };

    this.state.product = null;
  }


  componentDidMount(){
    const listRef = firebase.database().ref("products/"+this.props.match.params.firebaseKey);
    listRef.on("value", (snapshot) => {
      this.setState({ product: snapshot.val() });
    });
  }

  render() {
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet>
            <ShowDetails props={this.state.product} />
          </Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
  }
}

import React, { Component } from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";
import firebase from "firebase";
import FirebaseHelper from "../../../helpers/firebase/index";
import Main from "./showDetails.js"

export default class ProductDetail extends Component {

    constructor(props, context) {
        super();
        this.state = {
            product: null,
        };

        this.state.product = null;
        const listRef = firebase.database().ref("data/product/0");
        listRef.on("value", (snapshot) => {
            this.setState({product: snapshot.val()});
            //console.log("snapshot: ", this.state.product);
        });
    }

    render() {

        return (
            <LayoutWrapper>
                <FullColumn>
                    <Papersheet title="Check amuz dummdumm">
                        <Main props = {this.state.product}/>
                    </Papersheet>
                </FullColumn>
            </LayoutWrapper>
        );
    }
}



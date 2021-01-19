import React, { Component } from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";
import firebase from "firebase";
import FirebaseHelper from "../../../helpers/firebase/index";
import ShowDetails from "./showDetails.js";

export default class ProductDetail extends Component {
  constructor(props, context) {
    super();
    this.state = {
      product: {
        // "seller": "674f03dd-89ee-4997-ac1a-1d4033ba36e3",
        //         "tags": [
        //             "latest",
        //             "popular"
        //         ],
        //         "title": "laptop",
        //         "detail": "laptop ppp",
        //         "price": 10.0,
        //         "close_time": "2018-03-29T13:34:00Z",
        //         "open_time": "2018-05-29T13:34:00Z",
        //         "link_video": "http://google.com",
        //         "images": [
        //             {
        //                 "is_featured": false,
        //                 "image": "/media/product_images/image.jpeg"
        //             }
        //         ],
        //         "status": "active",
        //         "type": "limited",
        //         "stock": 14,
        //         "get_highest_bid": 0
      },
    };

    this.state.product = null;
    const listRef = firebase.database().ref("products/-MQsKe5-2kd3s7KXZUer");
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

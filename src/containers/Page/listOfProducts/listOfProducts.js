import React from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";
import Hit from "./products";
import { Row, Col, Container } from "reactstrap";
import Album from "./productData.js";
import { getListOfProducts } from "../../../services/productsServices";
import { SentimentSatisfied } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";

import FirebaseHelper from "../../../helpers/firebase/index";
import firebase from "firebase";
let dummy = [
  {
    name: "Quarks",
    type: "limited",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 6,
    rating: 3,
    quantityInStock: 0,
    //need to get from API call
    timeLeft: 10,
  },
  {
    name: "Legons",
    type: "auction",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 4,
    rating: 3,
    quantityInStock: 1,
    currentBid: 1200,
    //need to get from API call
    timeLeft: 0,
  },
  {
    name: "Neutrinos",
    type: "auction",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 20,
    rating: 4,
    quantityInStock: 1,
    currentBid: 6900,
    //need to get from API call
    timeLeft: 10,
  },
  {
    name: "Blackhole",
    type: "limited",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 9,
    rating: 5,
    quantityInStock: 42,
    //need to get from API call
    timeLeft: 10,
  },
];

class ListOfProducts extends React.Component {
  constructor(props, context) {
    super();
    this.state = {
      list: [],
      pageList: [],
      currentPage: 1,
    };
    this.productsPerPage = props.productsPerpage ? this.productsPerPage : 6; //set custom default value=10 if not given in props
    // firebase.initializeApp({ firebaseConfig });
    var tempList = [];
    const listRef = firebase.database().ref("products");
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

      // prods.map((product) => {
      //   this.setState({
      //     list: this.list.push(product),
      //   });
      // });
      // tempList = [];
      // prods.product.map((product) => {
      //   var customObj = {
      //     name: product.title,
      //     type: product.type,
      //     quantityInStock: product.stock,
      //     price: product.price,
      //     image: product.images
      //       ? product.images.forEach((img) => {
      //           if (img.is_featured === true) {
      //             return img;
      //           }
      //         })
      //       : null,
      //     openTime: product.open_time,
      //     closeTime: product.close_time,
      //     latestBid: product.get_highest_bid,
      //   };
      //   tempList.push(customObj);
      // });
      // this.setState({
      //   list: tempList,
      // });
      this.setState({
        pageList: this.state.list.slice(
          (this.state.currentPage - 1) * this.productsPerPage,
          this.productsPerPage * (1 + (this.state.currentPage - 1))
        ),
      });
      //console.log("list: ", this.state.list);
      //console.log("page list: ", this.state.pageList);
    });
  }

  render() {
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title="List of Products">
            <div className="row">
              <Album props={this.state.pageList} />
              <Pagination
                count={Math.ceil(this.state.list.length / this.productsPerPage)}
                variant="outlined"
                color="primary"
                onChange={async (event, value) => {
                  this.setState({
                    pageList: [],
                  });

                  this.setState({
                    pageList: this.state.list.slice(
                      (value - 1) * this.productsPerPage,
                      this.productsPerPage * (1 + (value - 1))
                    ),
                  });
                  this.setState({
                    currentPage: value,
                  });
                }}
              />
            </div>
          </Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
  }
}

export default ListOfProducts;

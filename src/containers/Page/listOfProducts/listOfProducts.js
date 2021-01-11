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
      totalPages: 0,
    };
    // firebase.initializeApp({ firebaseConfig });
  }

  async componentDidMount() {
    var tempList = [];
    const listRef = firebase.database().ref("data");
    listRef.on("value", (snapshot) => {
      const prods = snapshot.val();
      console.log(prods);
      prods.product.map((product) => {
        var customObj = {
          name: product.title,
          type: product.type,
          quantityInStock: product.stock,
          price: product.price,
          image: product.images
            ? product.images.forEach((img) => {
                if (img.is_featured === true) {
                  return img;
                }
              })
            : null,
          openTime: product.open_time,
          closeTime: product.close_time,
          latestBid: product.get_highest_bid,
        };
        tempList.push(customObj);

        console.log("templist: \n", tempList);
      });
      this.setState({
        list: tempList,
      });
    });
  }

  // async componentDidMount() {
  //   this.setState({
  //     list: await this.getListWrapper(1),
  //     totalPages: await this.getTotalNumberOfPages(),
  //   });
  // }

  // async getListWrapper(pageNum) {
  //   let nlist = await getListOfProducts(pageNum);
  //   console.log(nlist);
  //   nlist = nlist.data.data.product;

  //   let customList = [];

  //   nlist.forEach((product) => {
  //     var customObj = {
  //       name: product.title,
  //       type: product.type,
  //       quantityInStock: product.stock,
  //       price: product.price,
  //       image: product.images.forEach((img) => {
  //         if (img.is_featured === true) {
  //           return img;
  //         }
  //       }),
  //       openTime: product.open_time,
  //       closeTime: product.close_time,
  //       latestBid: product.get_highest_bid,
  //     };
  //     customList.push(customObj);
  //   });
  //   console.log("customlist: \n", customList);
  //   console.log(customList);
  //   return customList;
  // }

  // async getTotalNumberOfPages() {
  //   var i = 1;
  //   var count = 0;
  //   do {
  //     var x = (i++);
  //     count++;
  //   } while (x.length != 0);
  //   console.log("Get pages called");
  //   return count - 1;
  // }

  render() {
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title="List of Products">
            <div className="row">
              <Album props={this.state.list} />
              <Pagination
                count={this.state.totalPages}
                variant="outlined"
                color="primary"
                onChange={async (event, value) => {
                  this.setState({
                    list: [],
                  });
                  // this.setState({
                  //   list: await this.getListWrapper(value),
                  // });
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

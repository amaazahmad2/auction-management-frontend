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
import { useEffect } from "react";

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

async function getListWrapper(pageNum) {
  let nlist = await getListOfProducts(pageNum);
  console.log(nlist);
  nlist = nlist.data.data.product;

  let customList = [];

  nlist.forEach((product) => {
    var customObj = {
      name: product.title,
      type: product.type,
      quantityInStock: product.stock,
      price: product.price,
      image: product.images.forEach((img) => {
        if (img.is_featured === true) {
          return img;
        }
      }),
      openTime: product.open_time,
      closeTime: product.close_time,
      latestBid: product.get_highest_bid,
    };
    customList.push(customObj);
  });
  console.log("customlist: \n", customList);
  console.log(customList);
  return customList;
}

async function getTotalNumberOfPages() {
  var i = 1;
  var count = 0;
  do {
    var x = await getListWrapper(i++);
    count++;
  } while (x.length != 0);
  return count - 1;
}
class ListOfProducts extends React.Component {
  constructor(props, context) {
    super();
    this.state = {
      list: [],
      totalPages: 0,
    };
  }

  async componentDidMount() {
    this.setState({
      list: await getListWrapper(1),
      totalPages: await getTotalNumberOfPages(),
    });
  }

  render() {
    console.log("call from render");
    console.log(this.state.list);
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title="List of Products">
            <div className="row" ref={this.myRef}>
              <Album props={this.state.list} />
              <Pagination
                count={this.state.totalPages}
                variant="outlined"
                color="primary"
                onChange={async (event, value) => {
                  this.setState({
                    list: [],
                  });
                  this.setState({
                    list: await getListWrapper(value),
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

import React from "react";
import Typography from "@material-ui/core/Typography";
import Papersheet from "../../../components/utility/papersheet";
import Card from "@material-ui/core/Card";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import { Column, FullColumn } from "../../../components/utility/rowColumn";
import { useHistory } from "react-router";
import DisplayProducts from "../listOfProducts/displayProducts";
//import Album from "../listOfProducts/productData";

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

class MyProducts extends React.Component {
  handleProductClick(key, uuid) {
    let history = this.props.history;
    history.push("product-detail/" + key);
  }
  render() {
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title={"My Products"}>
            <div className="row">
              <DisplayProducts
                cardProps={dummy}
                handleProductClick={this.handleProductClick.bind(this)}
              />
            </div>
          </Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
    // return <ListOfProducts myProdsList={dummy}></ListOfProducts>;
  }
}

export default MyProducts;

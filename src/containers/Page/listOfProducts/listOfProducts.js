import React from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";
import Hit from "./products";
import { Row, Col, Container } from "reactstrap";
import Album from "./productData.js";

let dummy = [
  {
    name: "Quarks",
    type: "limited",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 6,
    rating: 3,
    quantityInStock: 0,
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
  },
  {
    name: "Blackhole",
    type: "limited",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 9,
    rating: 5,
    quantityInStock: 42,
  },
];

export default () => (
  <LayoutWrapper>
    <FullColumn>
      <Papersheet title="List of Products">
        <div className="row">
          {/* <div className="col-md-12">{dummy.map(arrFun)}</div> */}
          <Album props={dummy} />
        </div>
      </Papersheet>
    </FullColumn>
  </LayoutWrapper>
);

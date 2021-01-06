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
    type: "solid",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 6,
    rating: 3,
  },
  {
    name: "Legons",
    type: "liquid",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 4,
    rating: 3,
  },
  {
    name: "Neutrinos",
    type: "gas",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 20,
    rating: 4,
  },
  {
    name: "Blackhole",
    type: "plasma",
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 9,
    rating: 5,
  },
];


export default () => (
  <LayoutWrapper>
    <FullColumn>
      <Papersheet title="List of Products">
        <div className="row">
          {/* <div className="col-md-12">{dummy.map(arrFun)}</div> */}
          <Album props = {dummy} />
        </div>
      </Papersheet>
    </FullColumn>
  </LayoutWrapper>
);
import React from "react";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Papersheet from "../../../components/utility/papersheet";
import { Column, FullColumn } from "../../../components/utility/rowColumn";
import Hit from "./products";
import { Row, Col, Container } from "reactstrap";

let dummy = [
  {
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 6969,
  },
  {
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 69,
  },
  {
    image:
      "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg",
    price: 69420,
  },
];

let arrFun = (element) => {
  return <Hit hit={element}></Hit>;
};

export default () => (
  <LayoutWrapper>
    <FullColumn>
      <Papersheet title="List of Products">
        <div className="row">
          <div className="col-md-12">{dummy.map(arrFun)}</div>
        </div>
      </Papersheet>
    </FullColumn>
  </LayoutWrapper>
);

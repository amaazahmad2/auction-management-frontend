import React from "react";
import Papersheet from "../../../components/utility/papersheet";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import { FullColumn } from "../../../components/utility/rowColumn";
import DisplayProducts from "../listOfProducts/displayProducts";
import { getProductsBySeller } from "../../../services/productsServices";
import { Pagination } from "@material-ui/lab";
import { CircularProgress } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { Alert, AlertTitle } from "@material-ui/lab";

class MyProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      currentPage: 1,
      responseStatus: false,
      totalPages: 0,
    };
  }

  async setList(pageNum) {
    const response = await getProductsBySeller(pageNum);
    if (response.data.status === "success") {
      this.setState({
        responseStatus: true,
        list: response.data.data.products,
        totalPages: response.data.data.pages,
        currentPage: pageNum,
      });
    }
  }

  async componentDidMount() {
    await this.setList(1);
  }

  handleProductClick(key, uuid) {
    let history = this.props.history;
    history.push("product-detail/" + key);
  }
  render() {
    return (
      <LayoutWrapper>
        <FullColumn>
          <Papersheet title={"My Products"}>
            {this.state.list.length === 0 ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress></CircularProgress>
              </Box>
            ) : this.state.responseStatus === true ? (
              <div className="row">
                <DisplayProducts
                  cardProps={this.state.list}
                  handleProductClick={this.handleProductClick.bind(this)}
                />
              </div>
            ) : (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Oops! Somebody messed up! —{" "}
                <strong>We'll fire the dev whose fault this is ASAP</strong>
              </Alert>
            )}
            <Pagination
              count={this.state.totalPages}
              variant="outlined"
              color="primary"
              onChange={async (event, value) => {
                this.setState({
                  list: [],
                });
                await this.setList(value);
              }}
            />
          </Papersheet>
        </FullColumn>
      </LayoutWrapper>
    );
  }
}

export default MyProducts;

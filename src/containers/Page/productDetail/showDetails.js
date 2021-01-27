import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ImageGrid from "./imageGrid";
import { CircularProgress } from "@material-ui/core";
import Countdown from "../listOfProducts/countdown";
import { CircularProgressbar } from "react-circular-progressbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { addToCartAction } from "../../../redux/actions/cartAction";
import { store } from "../../../redux/store";
import TextField from "@material-ui/core/TextField";
import CreateBidPopup from "./createBidPopup";
import Container from "@material-ui/core/Container";
import "./showDetails.css";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

function handleAddToCart(post) {
  const cardObj = {
    uuid: post.product_uuid,
    name: post.title,
    quantity_ordered: parseInt(document.getElementById("quantity").value),
    price: post.price,
    quantity_in_stock: post.stock,
  };

  store.dispatch(addToCartAction(cardObj));
}

function handleQuantityChange(post) {
  let qty = parseInt(document.getElementById("quantity").value);
  if (isNaN(qty)) {
    document.getElementById("quantity").value = 0;
  } else if (qty < 1) document.getElementById("quantity").value = 0;
  else if (qty >= post.stock) {
    document.getElementById("quantity").value = post.stock;
  }
}

const setBgImg = (p) => {
  if (p && p.images) {
    if (p.images) {
      return p.images.map((i) => {
        if (i && i.is_featured) return i.image;
        return null;
      })[0];
    }

    return "";
  }
  return "";
};
var bg = "";

export default function ShowDetails(props) {
  const classes = useStyles();
  const post = props.productProps;
  // const currentDate = new Date();
  // const year =
  //   currentDate.getMonth() === 11 && currentDate.getDate() > 23
  //     ? currentDate.getFullYear() + 1
  //     : currentDate.getFullYear();

  if (post) {
    bg = setBgImg(post);
  }
  return (
    <Container className={classes.cardGrid} style={{ padding: "0" }} maxWidth="lg">
      <Grid style={{ width: "100%", margin: "0" }} container spacing={4} className="productDetail_container">
        {/* <Grid item xs={12}></Grid> */}
        <Grid className="productDetail_col_left" item md={7} sm={12} xs={12}>
          <Paper
            className={'prodDetail_feat_img_wrap ' + classes.mainFeaturedPost}
            style={{
              backgroundImage: `url(${bg})`,
            }}
          >
            <div className={classes.overlay} />
            <div className={'prodDetail_feat_img_txt ' + classes.mainFeaturedPostContent}>
              {/* <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {post ? post.title : <CircularProgress></CircularProgress>}
              </Typography> */}
              {/* <Typography variant="h5" color="inherit" paragraph>
                {post ? post.detail : <CircularProgress></CircularProgress>}
              </Typography> */}
              {/* <Typography>
                {post
                  ? new Date(post.open_time) > Date.now()
                    ? post.type === "auction"
                      ? "Bidding starts in: "
                      : "Product goes on sale in: "
                    : post.type === "auction"
                      ? "Bidding ends in: "
                      : "Product sale ends in: "
                  : ""}
              </Typography> */}
              {/* {post ? (
                <Countdown
                  date={
                    new Date(post.open_time) > Date.now()
                      ? post.open_time
                      : post.close_time
                  }
                />
              ) : (
                  ""
                )} */}
            </div>
          </Paper>
          {ImageGrid(post && post.images ? post.images : [])}
        </Grid>
        <Grid className="productDetail_col_right" item md={5} sm={12} xs={12}>
          <Paper className={'productDetail_content_right ' + classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              className="productDetail_title"
            >
              {post ? post.title : <CircularProgress></CircularProgress>}
            </Typography>
            <Typography className="productDetail_desc_txt" variant="h5" color="inherit" paragraph>
              {post ? post.detail : <CircularProgress></CircularProgress>}
            </Typography>
            <Typography>
              {post
                ? new Date(post.open_time) > Date.now()
                  ? post.type === "auction"
                    ? "Bidding starts in: "
                    : "Product goes on sale in: "
                  : post.type === "auction"
                    ? "Bidding ends in: "
                    : "Product sale ends in: "
                : ""}
            </Typography>
            {post ? (
              <Countdown
                date={
                  new Date(post.open_time) > Date.now()
                    ? post.open_time
                    : post.close_time
                }
              />
            ) : (
                ""
              )}
            {post ? (
              getRemainingProductDetails(post, props.isSeller)
            ) : (
                <CircularProgressbar></CircularProgressbar>
              )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const getRemainingProductDetails = (post, isSeller) => {
  const productData = {
    priceLabel: post.type === "auction" ? "Latest Bid: " : "Price: ",
    price: post.type === "auction" ? post.get_highest_bid : post.price,
    stockLabel:
      post.type === "auction"
        ? ""
        : post.stock > 0
          ? "Items in Stock: "
          : "Item Out of Stock!",
    stock: post.type === "auction" ? "" : post.stock > 0 ? post.stock : "",
    tagsLabel: "Tags: ",
    tags: post.tags && post.tags.toString(),
  };
  return (
    <Box container>
      {returnGrid(post, productData.priceLabel, productData.price, isSeller)}
      {returnGrid(post, productData.stockLabel, productData.stock, isSeller)}
    </Box>
  );
};

function returnGrid(post, label, data, isSeller) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <Typography className="prodDetail_stock_title" variant={"h6"}>{label}</Typography>
        <Typography className="prodDetail_stock_count" style={{ marginLeft: "5px" }}>
          {data}
        </Typography>
      </div>
      {isSeller === false ? getButton(post, label, isSeller) : null}
    </div>
  );
}

function getButton(post, label) {
  if (label === "Price: ") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <div style={{
          display: "flex",
          flexDirection: "column",
        }}>
          <span className="prodDetail_inc_btn">+</span>
          <TextField
            // style={{ marginBottom: "15px" }}
            size="small"
            // label="Quantity"
            defaultValue={1}
            id="quantity"
            onChange={() => {
              handleQuantityChange(post);
            }}
            type="number"
            className="prodDetail_inc_input"
          />
          <span className="prodDetail_inc_btn">-</span>
        </div>
        {/* <br /> */}
        <Button
          onClick={() => {
            handleAddToCart(post);
          }}
          variant={"contained"}
          color="primary"
          className="prodDetail_add_cart_btn"
        >
          {"Add to Cart"}
        </Button>
      </div>
    );
  } else if (label === "Latest Bid: ") {
    return <CreateBidPopup post={post} />;
  } else {
    return null;
  }
}

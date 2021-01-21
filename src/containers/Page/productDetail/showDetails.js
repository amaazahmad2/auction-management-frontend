import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import ImageGrid from "./imageGrid";
import { CircularProgress, LinearProgress } from "@material-ui/core";
import Countdown from "../listOfProducts/countdown";
import { CircularProgressbar } from "react-circular-progressbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { addToCartAction } from "../../../redux/actions/cartAction";
import { store } from "../../../redux/store";
import TextField from "@material-ui/core/TextField";
import CreateBidPopup from './createBidPopup';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    // backgroundImage: "url(https://source.unsplash.com/random)",
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

  //console.log("POSTyyy: ",post)
  const cardObj = {
    uuid: post.product_uuid,
    name: post.title,
    quantityOrdered: parseInt(document.getElementById("quantity").value),
    price: post.price,
    quantityInStock:post.stock
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
      })[0];
    }

    return "";
  }
}; //"https://cqgplus.files.wordpress.com/2016/08/gargantua1.png";
var bg = "";

export default function ShowDetails({ props }) {
  const classes = useStyles();
  const post = props;
  const currentDate = new Date();
  const year =
    currentDate.getMonth() === 11 && currentDate.getDate() > 23
      ? currentDate.getFullYear() + 1
      : currentDate.getFullYear();

  if (post) {
    bg = setBgImg(post);
  }
  return (
    <div>
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {post ? post.title : <CircularProgress></CircularProgress>}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
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
            </div>
          </Grid>
        </Grid>
      </Paper>

      {ImageGrid(post && post.images)}
      <Paper className={classes.mainFeaturedPostContent}>
        {post ? (
          getRemainingProductDetails(post)
        ) : (
          <CircularProgressbar></CircularProgressbar>
        )}
      </Paper>
    </div>
  );
}

const getRemainingProductDetails = (post) => {
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
    tags: post.tags.toString(),
    // seller: post.seller,
  };
  return (
    <Box container>
      {returnGrid(post, productData.priceLabel, productData.price)}
      {returnGrid(post, productData.stockLabel, productData.stock)}
      {/* {returnGrid(post, "Seller: ", productData.seller)} */}
    </Box>
  );
};

function returnGrid(post, label, data) {
  return (
    <div>
      {getButton(post, label)}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant={"h6"}>{label}</Typography>
        <Typography style={{ marginLeft: "5px", marginTop: "3px" }}>
          {data}
        </Typography>
      </div>
    </div>
  );
}

function getButton(post, label) {
  if (label === "Price: ") {
    return (
      <div>
        <TextField
          style={{ marginBottom: "15px" }}
          size="small"
          label="Quantity"
          defaultValue={1}
          id="quantity"
          onChange={() => {
            handleQuantityChange(post);
          }}
          type="number"
        />
        <br />
        <Button
          onClick={() => {
            handleAddToCart(post);
          }}
          variant={"contained"}
          color="primary"
        >
          {"Add to Cart"}
        </Button>
      </div>
    );
  } else if (label === "Latest Bid: ") {
    return (
      <CreateBidPopup post={post}/>
    );
  } else {
    return null;
  }
}

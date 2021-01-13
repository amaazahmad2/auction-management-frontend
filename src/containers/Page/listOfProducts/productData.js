import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Fab from "@material-ui/core/Fab";
import { Row, Col } from "reactstrap";
import { CircularProgress } from "@material-ui/core";
import { CardText } from "reactstrap";
import { store } from "./../../../redux/store";

// import ecommerceActions from '../../../redux/ecommerce/actions';
import {
  GridListViewWrapper,
  CartIcon,
  Rate,
} from "../../../components/algolia/algoliaComponent.style";
// import Button from '@material-ui/core/Button';
import Countdown from "./countdown";
import { addToCartAction } from "../../../redux/actions/cartAction";
import { stringify } from "uuid";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// close_time: "2023-01-08T22:41:00.000"
// detail: "this is testing"
// get_highest_bid: 100
// images: (2) [{…}, {…}]
// key: "-MQsKXaUKB0hiM55jbfC"
// link_video: "http://google.com"
// open_time: "2022-01-08T22:40:00.000"
// price: 100
// product_uuid: "dcb4fe26-9063-45b7-85bc-11f4ade81680"
// status: "active"
// stock: 14
// tags: (3) ["latest", "popular", "newww"]
// title: "tesing9000"
// type: "limited"

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function getFirstLabelText(card) {
  console.log("getFirstlabelText called");
  return card.type == "auction" ? " For Auction" : " Limited";
}

function getSecondLabelText(card) {
  if (card.type == "auction") {
    //needs to be implemented through an API call?
    if (/*timeRemaining==0 */ new Date(card.open_time) > Date.now()) {
      console.log("date greater");
      return "Bidding not started";
    } else if (
      new Date(card.open_time) <= Date.now() &&
      new Date(card.close_time) > Date.now()
    ) {
      return "Ready to Bid!";
    } else if (new Date(card.close_time) < Date.now()) {
      return "Time's Up!";
    }
  } else {
    if (card.stock == 0) {
      return "Item out of stock ";
    } else {
      return "Items in Stock: " + card.stock;
    }
  }
}

function returnColoredLabel(color, card) {
  if (card.type == "auction" && new Date(card.close_time < Date.now())) {
    color = "red";
  }
  if (card.type === "limited" && card.stock <= 0) {
    color = "red";
  }
  return (
    <Box
      component="div"
      fontSize={12}
      style={{
        color: "white",
        backgroundColor: color,
        borderRadius: "7px",
        width: "fit-content",
        padding: "6px",
        maxHeight: "20px",
      }}
    >
      {
        /* {" "}
      {card.type == "auction" ? "Current Bid: $" : "Items in Stock: "}
      {card.type == "auction" ? card.currentBid : card.stock} */
        getSecondLabelText(card)
      }
    </Box>
  );
}

export default function Album({ props }) {
  const classes = useStyles();

  let cards = props;
  const currentDate = new Date();
  const year =
    currentDate.getMonth() === 11 && currentDate.getDate() > 23
      ? currentDate.getFullYear() + 1
      : currentDate.getFullYear();
  // const handleAddToCart = (card) => {

  //   const cardObj = {
  //           uuid: "sample uuid",
  //           name: card.name,
  //           quantity: 10,
  //           price:card.price,
  //   }

  //   store.dispatch(addToCartAction(cardObj));

  //   //console.log("COUNT ",store.getState().cart.length);
  // };

  return cards.length == 0 ? (
    <Box
      display="flex"
      justifyContent="center"
      m={1}
      p={1}
      bgcolor="background.paper"
    >
      <CircularProgress />
    </Box>
  ) : (
    <React.Fragment>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid
                item
                key={card}
                xs={12}
                sm={6}
                md={4}
                justifyContent="center"
              >
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      card.images != null || card.images
                        ? card.images.map((i) => {
                            if (i.is_featured) {
                              return i;
                            }
                          })
                        : "https://img.freepik.com/free-vector/shining-circle-purple-lighting-isolated-dark-background_1441-2396.jpg?size=626&ext=jpg"
                    }
                    z-index="1"
                  >
                    <Grid
                      container
                      spacing={1}
                      style={{
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        component="div"
                        fontSize={12}
                        style={{
                          color: "white",
                          backgroundColor: "darkblue",
                          borderRadius: "7px",
                          width: "max-content",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        {getFirstLabelText(card)}
                      </Box>
                      {card.stock > 0
                        ? /*|| time is NOT up*/
                          returnColoredLabel("green", card)
                        : returnColoredLabel("red", card)}
                    </Grid>
                  </CardMedia>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {" "}
                      <span>{card.title}</span>
                    </Typography>
                    <span>
                      {" "}
                      {card.type == "auction"
                        ? "\nHighest Bid: " + card.get_highest_bid + " coins\n"
                        : "\nPrice: " + card.price + " coins\n"}{" "}
                    </span>
                    <br />
                    <span>
                      {
                        (console.log(
                          card.open_time + "now: " + Date.now().toString()
                        ),
                        card.type === "auction"
                          ? new Date(card.open_time) > Date.now()
                            ? "Bidding starts in: "
                            : "Time left to place bid: "
                          : "")
                      }
                    </span>
                    <Countdown
                      date={
                        new Date(card.open_time) > Date.now()
                          ? card.open_time
                          : card.close_time
                      }
                    />
                  </CardContent>
                </Card>
                <Button
                  color="primary"
                  // onClick={() => handleAddToCart(card)}
                >
                  Add to Cart
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";

import Countdown from "./countdown";

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
  return card.type === "auction" ? " For Auction" : " Limited";
}

function getSecondLabelText(card) {
  if (card.type === "auction") {
    //needs to be implemented through an API call?
    if (/*timeRemaining==0 */ new Date(card.open_time) > Date.now()) {
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
    if (card.stock === 0) {
      return "Item out of stock ";
    } else {
      return "Items in Stock: " + card.stock;
    }
  }
}

function returnColoredLabel(color, card) {
  if (card.type === "auction" && new Date(card.close_time < Date.now())) {
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
        getSecondLabelText(card)
      }
    </Box>
  );
}

export default function DisplayProducts(props) {
  const classes = useStyles();

  let cards = props.cardProps;
  // const currentDate = new Date();
  // const year =
  //   currentDate.getMonth() === 11 && currentDate.getDate() > 23
  //     ? currentDate.getFullYear() + 1
  //     : currentDate.getFullYear();

  return cards.length === 0 ? (
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
                            return null;
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
                      <span
                        onClick={() => {
                          props.handleProductClick(card.key, card.product_uuid);
                        }}
                      >
                        {card.title}
                      </span>
                    </Typography>

                    {card.type === "auction" ? (
                      <span> {"Starting Bid: " + card.price + " coins"}</span>
                    ) : (
                      ""
                    )}

                    {card.type === "auction" ? (
                      <div>
                        <span>
                          {"\nHighest Bid: " +
                            card.get_highest_bid +
                            " coins\n"}{" "}
                        </span>
                      </div>
                    ) : (
                      <span>
                        {"\nPrice: " + card.price + " coins\n  "}
                        <br />
                      </span>
                    )}
                    <span>
                      {new Date(card.open_time) > Date.now()
                        ? card.type === "auction"
                          ? "Bidding starts in: "
                          : "Product goes on sale in: "
                        : card.type === "auction"
                        ? "Bidding ends in: "
                        : "Product sale ends in: "}
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
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

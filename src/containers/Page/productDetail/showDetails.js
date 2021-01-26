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
import "./showDetails.css";
import {deleteProduct} from '../../../services/productsServices';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from 'react-router';

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
    let history = useHistory();
    // const currentDate = new Date();
    // const year =
    //   currentDate.getMonth() === 11 && currentDate.getDate() > 23
    //     ? currentDate.getFullYear() + 1
    //     : currentDate.getFullYear();

    const [alertOpen, setAlertOpen] = React.useState(false);
    const [alertSeverity, setAlertSeverity] = React.useState('');
    const [alertMessage, setAlertMessage] = React.useState("");

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    async function handleDelete(post, history){
        let response = await deleteProduct(post.uuid);
      
        if(response.status === 200){
          setAlertMessage("Product Deleted");
          setAlertSeverity("success");
          setAlertOpen(true);
          setTimeout(() => {  history.push("/dashboard/my-products") }, 800);
        }else if(response.status === 401){
            setAlertMessage("You are unauthorized to perform this action");
            setAlertSeverity("error");
            setAlertOpen(true);
        }
        else{
            setAlertMessage("Unknown Error");
            setAlertSeverity("error");
            setAlertOpen(true);
        }
        
      }

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
                                {post ? (
                                    post.title
                                ) : (
                                    <CircularProgress></CircularProgress>
                                )}
                            </Typography>
                            <Typography variant="h5" color="inherit" paragraph>
                                {post ? (
                                    post.detail
                                ) : (
                                    <CircularProgress></CircularProgress>
                                )}
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
                <Snackbar
                            open={alertOpen}
                            autoHideDuration={6000}
                            onClose={handleAlertClose}
                        >
                            <Alert
                                elevation={6}
                                variant="filled"
                                onClose={handleAlertClose}
                                severity={alertSeverity}
                            >
                                {alertMessage}
                            </Alert>
                        </Snackbar>
            </Paper>

            {ImageGrid(post && post.images ? post.images : [])}
            <Paper className={classes.mainFeaturedPostContent}>
                {post ? (
                    getRemainingProductDetails(post, props.isSeller, history, handleDelete)
                ) : (
                    <CircularProgressbar></CircularProgressbar>
                )}
            </Paper>
        </div>
    );
}

const getRemainingProductDetails = (post, isSeller, history, handleDelete) => {
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
            {returnGrid(
                post,
                productData.priceLabel,
                productData.price,
                isSeller
            )}
            {returnGrid(
                post,
                productData.stockLabel,
                productData.stock,
                isSeller
            )}
            {isSeller === true ? (
                <Button
                    onClick={() => {
                      handleDelete(post, history);
                    }}
                    variant={"contained"}
                    color="secondary"
                >
                    Delete Product
                </Button>
            ) : null}
        </Box>
    );
};

function returnGrid(post, label, data, isSeller) {
    return (
        <div>
            {getButton(post, label, isSeller)}
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

function getButton(post, label, isSeller) {
    if (isSeller === false) {
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
            return <CreateBidPopup post={post} />;
        } else {
            return null;
        }
    }
}

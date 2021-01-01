import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import signinImg from "../../../images/signin.svg";
// import fbBtnSvg from "../../../images/facebook-app-symbol.svg";
// import gpBtnSvg from "../../../images/google-plus.svg";
// import authBtnSvg from "../../../images/auth0.svg";
import TextField from "../../../components/uielements/textfield";
import Scrollbars from "../../../components/utility/customScrollBar";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
// import IntlMessages from "../../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
// import Auth0 from "../../../helpers/auth0/index";
// import Firebase from "../../../helpers/firebase";
// import FirebaseLogin from "../../../components/firebase";
// import { Checkbox } from "./signup.style";
import { API_URL } from "./../../../services/config";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// import PropTypes from "prop-types";
// import { signUp } from "../../../redux/actions/singnUpAction";

const { login } = authAction;

class SignUp extends Component {
    // componentWillReceiveProps(nextProps) {
    //   if (
    //     this.props.isLoggedIn !== nextProps.isLoggedIn &&
    //     nextProps.isLoggedIn === true
    //   ) {
    //     this.setState({ redirectToReferrer: true });
    //   }
    // }
    // handleLogin = (e) => {
    //   const { login } = this.props;
    //   login();
    //   this.props.history.push('/dashboard');
    // };

    handleSignUp = () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
            username: this.state.username,
            gender: this.state.gender,
            phone_number: this.state.phone_number,
            birthday: this.state.birthday,
        };
        const config = {
            headers: {
                "content-type": "application/json",
            },
        };
        const body = JSON.stringify(user);
        console.log(API_URL.concat("/users/signup/"));
        axios
            .post(API_URL.concat("/users/signup/"), body, config)
            .then((response) => {
                if (response.status === 201) {
                    this.setState({ class: "success" });
                    this.setState({ message: "User registered SuccessFully" });
                }
                if (response.status === 200) {
                    this.setState({ message: response.data.message });
                    this.setState({ class: "error" });
                }
                this.setState({ open: true });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: "",
            name: "",
            phone_number: "",
            password: "",
            confirm_password: "",
            gender: "",
            birthday: "",
            username: "",
            message: "",
            open: false,
            class: "",
        };
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
    };
    render() {
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

        return (
            <SignUpStyleWrapper className="mateSignUpPage">
                <div className="mateSignInPageImgPart">
                    <div className="mateSignInPageImg">
                        <img src={signinImg} alt="Kiwi standing on oval" />
                    </div>
                </div>

                <div className="mateSignInPageContent">
                    <div className="mateSignInPageLink">
                        <Link to="#">
                            <button
                                className="mateSignInPageLinkBtn active"
                                type="button"
                            >
                                Register
                            </button>
                        </Link>
                        <Link to="/signin">
                            <button
                                className="mateSignInPageLinkBtn "
                                type="button"
                            >
                                Login
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Snackbar
                            open={this.state.open}
                            autoHideDuration={6000}
                        >
                            <Alert
                                onClose={this.handleClose}
                                severity={this.state.class}
                            >
                                {this.state.message}
                            </Alert>
                        </Snackbar>
                    </div>
                    <Scrollbars style={{ height: "100%" }}>
                        {/* <div className="mateSignInPageGreet">
              <h1>Its Free, Join Us</h1>
              <p>
                Welcome to Mate Admin, Please SignUp with your personal account
                information.
              </p>
            </div> */}

                        <div className="mateSignInPageForm">
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Name"
                                    placeholder="Name"
                                    name="name"
                                    margin="normal"
                                    onChange={(event) => this.onChange(event)}
                                    required
                                />
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Username"
                                    placeholder="Username"
                                    name="username"
                                    margin="normal"
                                    onChange={(event) => this.onChange(event)}
                                    required
                                />
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    margin="normal"
                                    onChange={(event) => this.onChange(event)}
                                    type="Email"
                                    required
                                />
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Phone no"
                                    placeholder="Phone no"
                                    name="phone_number"
                                    onChange={(event) => this.onChange(event)}
                                    margin="normal"
                                    required
                                />
                            </div>
                            <div className="mateInputWrapper">
                                {/* <TextField
                  label="Gender"
                  placeholder="Gender"
                  name='gender'
                  onChange={event => this.onChange(event)}
                  margin="normal"
                  type = 'select'
                  required
                /> */}
                                <div margin="normal" label="Gender" style={{marginTop:"2rem", color:"rgb(118, 118, 118)"}} required>Gender: <br/>
                                    <input
                                      label="Gender"
                                        type="radio"
                                        value="MALE"
                                        name="gender"
                                        margin="normal"
                                        style={{marginLeft:"5rem"}}
                                    />{" "}
                                    Male
                                    <input
                                        type="radio"
                                        value="FEMALE"
                                        name="gender"
                                        margin="normal"
                                        style={{marginLeft:"2rem"}}
                                    />{" "}
                                    Female
                                </div>
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="DOB"
                                    placeholder="DOB"
                                    name="birthday"
                                    onChange={(event) => this.onChange(event)}
                                    margin="normal"
                                    type="Date"
                                    required
                                />
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(event) => this.onChange(event)}
                                    margin="normal"
                                    type="Password"
                                    required
                                />
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Confirm Password"
                                    placeholder="Confirm Password"
                                    name="confirm_password"
                                    onChange={(event) => this.onChange(event)}
                                    margin="normal"
                                    type="Password"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mateAgreement">
                            {/* <div className="mateLoginSubmitCheck">
                <Checkbox color="primary" className="mateTermsCheck" />
                <span className="mateTermsText">
                  <IntlMessages id="page.signUpTermsConditions" />
                </span>
              </div> */}
                            <div className="mateLoginSubmit">
                                <Button
                                    type="button"
                                    onClick={this.handleSignUp}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </div>
                        {/* <div className="mateLoginSubmitText">
                            <span>or Sign Up with </span>
                        </div>
                        <div className="mateLoginOtherBtn">
                            <div className="mateLoginOtherBtnWrap">
                                <Button
                                    // onClick={this.handleLogin}
                                    type="button"
                                    className="btnFacebook"
                                >
                                    <div className="mateLoginOtherIcon">
                                        <img
                                            src={fbBtnSvg}
                                            alt="facebook Btn"
                                        />
                                    </div>
                                    <IntlMessages id="page.signUpFacebook" />
                                </Button>
                            </div>
                            <div className="mateLoginOtherBtnWrap">
                                <Button
                                    onClick={this.handleLogin}
                                    type="button"
                                    className="btnGooglePlus"
                                >
                                    <div className="mateLoginOtherIcon">
                                        <img
                                            src={gpBtnSvg}
                                            alt="Google Plus Btn"
                                        />
                                    </div>
                                    <IntlMessages id="page.signUpGooglePlus" />
                                </Button>
                            </div>
                            <div className="mateLoginOtherBtnWrap">
                                {Auth0.isValid ? (
                                    <Button
                                        type="button"
                                        className="btnAuthZero"
                                        onClick={() => {
                                            Auth0.login(this.handleLogin);
                                        }}
                                    >
                                        <div className="mateLoginOtherIcon">
                                            <img
                                                src={authBtnSvg}
                                                alt="Authentication Btn"
                                            />
                                        </div>
                                        <IntlMessages id="page.signUpAuth0" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        className="btnAuthZero"
                                        onClick={this.handleLogin}
                                    >
                                        <div className="mateLoginOtherIcon">
                                            <img
                                                src={authBtnSvg}
                                                alt="Authentication Btn"
                                            />
                                        </div>
                                        <IntlMessages id="page.signUpAuth0" />
                                    </Button>
                                )}
                            </div>
                            <div className="mateLoginOtherBtnWrap">
                                {Firebase.isValid && (
                                    <FirebaseLogin
                                        signup={true}
                                        login={this.handleLogin}
                                    />
                                )}
                            </div>
                        </div> */}
                    </Scrollbars>
                </div>
            </SignUpStyleWrapper>
        );
    }
}

// const mapStateToProps = (state) => ({
//   // isAuthenticated: state.auth.isAuthenticated,
//   // error: state.error,
// });

export default SignUp;

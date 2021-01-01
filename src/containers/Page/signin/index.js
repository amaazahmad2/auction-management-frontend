import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import signinImg from "../../../images/signup.svg";
import fbBtnSvg from "../../../images/facebook-app-symbol.svg";
import gpBtnSvg from "../../../images/google-plus.svg";
import authBtnSvg from "../../../images/auth0.svg";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import TextField from "../../../components/uielements/textfield";
import IntlMessages from "../../../components/utility/intlMessages";
import Scrollbars from "../../../components/utility/customScrollBar";
import SignInStyleWrapper from "./signin.style";
import Auth0 from "../../../helpers/auth0";
import Firebase from "../../../helpers/firebase";
import FirebaseLogin from "../../../components/firebase";
import {
    loginUserService,
    googleLoginService,
    facebookLoginService
} from "../../../services/loginServices";
import { store, history } from "./../../../redux/store.js";
import { loginUserAction } from "../../../redux/actions/loginAction";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const { login } = authAction;
const googleClientID =
    "61733361845-j03c3vnkmcutgehstvfhkpa842tamaej.apps.googleusercontent.com";
class SignIn extends Component {
    state = {
        // redirectToReferrer: false,
        username: "hamza",
        password: "123",
        alertOpen: false,
        alertMessage: "",
        alertSeverity: "info",
    };
    // componentWillReceiveProps(nextProps) {
    //   if (
    //     this.props.isLoggedIn !== nextProps.isLoggedIn &&
    //     nextProps.isLoggedIn === true
    //   ) {
    //     this.setState({ redirectToReferrer: true });
    //   }
    // }
    handleLogin = async () => {
        const loginServiceResponse = await loginUserService(
            this.state.username,
            this.state.password
        );
        if (loginServiceResponse.status === 200) {
            this.setState({
                alertMessage: "Logged-In Successfully",
                alertSeverity: "success",
                alertOpen: true,
            });
            localStorage.setItem("token", loginServiceResponse.data.token);
            store.dispatch(loginUserAction(loginServiceResponse.data));
            this.props.history.push("/dashboard");
        } else if (loginServiceResponse.status === 401) {
            this.setState({
                alertMessage: "Invalid Username or Password",
                alertSeverity: "error",
                alertOpen: true,
            });
        } else {
            this.setState({
                alertMessage: "Unexpected Error Occurred",
                alertSeverity: "error",
                alertOpen: true,
            });
        }
    };

    handleAlertClose = () => {
        this.setState({ alertOpen: false });
    };

    handleGoogleLogin = async (response) => {
        if (!response.error) {
            console.log(response);

            const loginServiceResponse = await googleLoginService(response.profileObj.givenName, response.profileObj.familyName, response.profileObj.email, response.googleId);
            console.log("STATUS: ",loginServiceResponse.status);

            if(loginServiceResponse.status === 200){    
                this.setState({
                    alertMessage: "Logged-In Successfully",
                    alertSeverity: "success",
                    alertOpen: true,
                });
                localStorage.setItem("token", loginServiceResponse.data.data.token);
                store.dispatch(loginUserAction(loginServiceResponse.data.data));
                this.props.history.push("/dashboard");
            } else if (loginServiceResponse.status === 401) {
                this.setState({
                    alertMessage: "Invalid Username or Password",
                    alertSeverity: "error",
                    alertOpen: true,
                });
            } else {
                this.setState({
                    alertMessage: "Unexpected Error Occurred",
                    alertSeverity: "error",
                    alertOpen: true,
                });
            }
        }else {
            this.setState({
                alertMessage: "Unexpected Error Occurred",
                alertSeverity: "error",
                alertOpen: true,
            });
        }
    };

    handleFacebookLogin = async (response) => {
        if (!response.error) {
            console.log("FACEBOOK API RESPINSE: ",response);

            //make the API call
            const loginServiceResponse = await facebookLoginService(response.first_name, response.last_name, response.email, response.id);
            console.log("APNI API FACEBOOK RESPONSE: ",loginServiceResponse);

            if(loginServiceResponse.status === 200){    
                this.setState({
                    alertMessage: "Logged-In Successfully",
                    alertSeverity: "success",
                    alertOpen: true,
                });
                localStorage.setItem("token", loginServiceResponse.data.data.token);
                store.dispatch(loginUserAction(loginServiceResponse.data.data));
                this.props.history.push("/dashboard");
            } else if (loginServiceResponse.status === 401) {
                this.setState({
                    alertMessage: "Invalid Username or Password",
                    alertSeverity: "error",
                    alertOpen: true,
                });
            } else {
                this.setState({
                    alertMessage: "Unexpected Error Occurred",
                    alertSeverity: "error",
                    alertOpen: true,
                });
            }
        }else {
            this.setState({
                alertMessage: "Unexpected Error Occurred",
                alertSeverity: "error",
                alertOpen: true,
            });
        }
    };

    onChangeUsername = (event) =>
        this.setState({ username: event.target.value });
    onChangePassword = (event) =>
        this.setState({ password: event.target.value });
    render() {
        const from = { pathname: "/dashboard" };
        const { redirectToReferrer, username, password } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }
        return (
            <SignInStyleWrapper className="mateSignInPage">
                <div className="mateSignInPageImgPart">
                    <div className="mateSignInPageImg">
                        <img src={signinImg} alt="Kiwi standing on oval" />
                    </div>
                </div>

                <div className="mateSignInPageContent">
                    <div className="mateSignInPageLink">
                        <Link to="/signup">
                            <button
                                className="mateSignInPageLinkBtn"
                                type="button"
                            >
                                Register
                            </button>
                        </Link>
                        <Link to="#">
                            <button
                                className="mateSignInPageLinkBtn active"
                                type="button"
                            >
                                Login
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Snackbar
                            open={this.state.alertOpen}
                            autoHideDuration={6000}
                            onClose={this.handleAlertClose}
                        >
                            <Alert
                                elevation={6}
                                variant="filled"
                                onClose={this.handleAlertClose}
                                severity={this.state.alertSeverity}
                            >
                                {this.state.alertMessage}
                            </Alert>
                        </Snackbar>
                    </div>
                    <Scrollbars style={{ height: "100%" }}>
                        <div className="mateSignInPageGreet">
                            <h1>Hello User,</h1>
                            <p>
                                Welcome to Mate Admin, Please Login with your
                                personal account information.
                            </p>
                        </div>
                        <div className="mateSignInPageForm">
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Username"
                                    placeholder="Username"
                                    margin="normal"
                                    value={username}
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <div className="mateInputWrapper">
                                <TextField
                                    label="Password"
                                    placeholder="Password"
                                    margin="normal"
                                    type="Password"
                                    value={password}
                                    onChange={this.onChangePassword}
                                />
                            </div>
                            <div className="mateLoginSubmit">
                                <Button
                                    type="button"
                                    onClick={this.handleLogin}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                        <div className="mateLoginSubmitText">
                            <span>
                                * Username: demo@gmail.com , Password: demodemo
                                or click on any button.
                            </span>
                        </div>
                        <div className="mateLoginOtherBtn">
                            <div className="mateLoginOtherBtnWrap">
                                <FacebookLogin
                                    appId="448728193170790"
                                    //autoLoad
                                    fields="first_name,last_name,email"
                                    // scope="public_profile,user_friends,user_actions.books"
                                    callback={this.handleFacebookLogin}
                                    render={renderProps => (
                                        // <button onClick={renderProps.onClick}>This is my custom FB button</button>
                                        <Button
                                            onClick={renderProps.onClick}
                                            type="button"
                                            variant="contained"
                                            className="btnFacebook"
                                        >
                                            <div className="mateLoginOtherIcon">
                                                <img
                                                    src={fbBtnSvg}
                                                    alt="facebook Btn"
                                                />
                                            </div>
                                            <IntlMessages id="page.signInFacebook" />
                                        </Button>
                                    )}
                                />
                            </div>
                            <div className="mateLoginOtherBtnWrap">
                                <GoogleLogin
                                    clientId={googleClientID}
                                    //
                                    render={(renderProps) => (
                                        // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
                                        <Button
                                            onClick={renderProps.onClick}
                                            type="button"
                                            className="btnGooglePlus"
                                        >
                                            <div className="mateLoginOtherIcon">
                                                <img
                                                    src={gpBtnSvg}
                                                    alt="Google Plus Btn"
                                                />
                                            </div>
                                            <IntlMessages id="page.signInGooglePlus" />
                                        </Button>
                                    )}
                                    onSuccess={this.handleGoogleLogin}
                                    onFailure={this.handleGoogleLogin}
                                    // cookiePolicy={'single_host_origin'}
                                ></GoogleLogin>
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
                                        <IntlMessages id="page.signInAuth0" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        className="primary btnAuthZero"
                                        onClick={this.handleLogin}
                                    >
                                        <div className="mateLoginOtherIcon">
                                            <img
                                                src={authBtnSvg}
                                                alt="Authentication Btn"
                                            />
                                        </div>
                                        <IntlMessages id="page.signInAuth0" />
                                    </Button>
                                )}
                            </div>
                            <div className="mateLoginOtherBtnWrap">
                                {Firebase.isValid && (
                                    <FirebaseLogin login={this.handleLogin} />
                                )}
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            </SignInStyleWrapper>
        );
    }
}
export default connect(
    (state) => ({
        isLoggedIn: state.Auth.idToken !== null ? true : false,
    }),
    { login }
)(SignIn);

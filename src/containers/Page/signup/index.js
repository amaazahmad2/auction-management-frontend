import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import signinImg from '../../../images/signin.svg';
import TextField from '../../../components/uielements/textfield';
import Scrollbars from '../../../components/utility/customScrollBar';
import Button from '../../../components/uielements/button';
import authAction from '../../../redux/auth/actions';
import IntlMessages from '../../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import { Checkbox } from './signup.style';
import { YearPicker, MonthPicker, DayPicker } from 'react-dropdown-date';
import { ValidatorComponent } from 'react-form-validator-core';
const { login } = authAction;

class SignUp extends ValidatorComponent {
  state = {
    redirectToReferrer: false,
    username: "", email: "", password: "", confirmPassword: "",
    gender: ''  ,
    dob: { day: "", year: "", month: "" }
  };
 
  errorText() {
    const { isValid } = this.state;

    if (isValid) {
        return null;
    }

    return (
        <div style={{ color: 'red' }}>
            {this.getErrorMessage()}
        </div>
    );
}

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }

  handleLogin = () => {
  const { login } = this.props;
  login();
  console.log(this.state.username)
  console.log(this.state.email)
  this.validate({
    username: {minlength:3, required: true},
    email: {email: true},
    confirmPassword : {equalPassword : this.state.password}
  });
  console.log(this.state.gender)
  //  this.props.history.push('/signin');
  };

  Changegender = (e) => {  
    this.setState({  
            gender: e.target.value  
    })  
}

  render() {
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
              <button className="mateSignInPageLinkBtn active" type="button">
                Register
              </button>
            </Link>
            <Link to="/signin">
              <button className="mateSignInPageLinkBtn " type="button">
                Login
              </button>
            </Link>
          </div>
          <Scrollbars style={{ height: '100%' }}>
            <div className="mateSignInPageGreet">
              <h1>Its Free, Join Us</h1>
              <p>
                Welcome to Mate Admin, Please SignUp with your personal account
                information.
              </p>
            </div>
            <div className="mateSignInPageForm">
            <div>
            {this.errorText()}
          </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={(username) => this.setState({ username: username})} 
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  type="Email"
                  value={this.state.email}
                  validators={['required', 'isEmail']}
                  ref="email" onChange={(email) => this.setState({email :email})} 
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  ref="password" onChange={(password) => this.setState({password})} 
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  margin="normal"
                  type="Password"
                  ref="confirmPassword" onChange={(confirmPassword) => this.setState({confirmPassword})}
                />
              </div>
              <div>  
                              <input type="radio" value="Male" checked={this.state.gender == "Male"} onChange={this.Changegender} />Male  
                             <input type="radio" value="Female" checked={this.state.gender == "Female"} onChange={this.Changegender} />Female  
                              </div>
            </div>
            <div className="row">
      <div className="col pr-1 px-0 col-xs-6">
         <YearPicker
          defaultValue={'select year'}
          start={2010}                // default is 1900
          end={2020}                  // default is current year
          reverse                     // default is ASCENDING
          value={this.state.dob.year}     // mandatory
          onChange={(year) => {       // mandatory
            this.setState({ dob : {year : year}});
            console.log(year);
          }}
          id={'year'}
          name={'year'}
          classes={'classes'}
          optionClasses={'option classes'}
        />
       
      
      </div>
      <div className="col pr-1 px-0 col-xs-6">
      <MonthPicker
          defaultValue={'select month'}
          numeric                   // to get months as numbers
          short                     // default is full name
          caps                      // default is Titlecase
          endYearGiven              // mandatory if end={} is given in YearPicker
          year={this.state.dob.year}    // mandatory
          required={true}           // default is false
                // default is false
          value={this.state.dob.month}  // mandatory
          onChange={(month) => {    // mandatory
            this.setState({ dob : {month : month} });
            console.log(month);
          }}
          id={'month'}
          name={'month'}
          classes={'classes'}
          optionClasses={'option classes'}
        />
      </div>
      <div className="col px-0 col-xs-6">
      <DayPicker
          defaultValue={'select day'}
          year={this.state.dob.year}    // mandatory
          month={this.state.dob.month}  // mandatory
          endYearGiven              // mandatory if end={} is given in YearPicker
          required={true}           // default is false
              // default is false
          value={this.state.dob.day}    // mandatory
          onChange={(day) => {      // mandatory
            this.setState({ dob: { day: day} });
            console.log(day);
          }}
          id={'day'}
          name={'day'}
          classes={'classes'}
          optionClasses={'option classes'}
        />
      </div>
    </div>
            <div className="mateAgreement">
              <div className="mateLoginSubmitCheck">
                <Checkbox color="primary" className="mateTermsCheck" />
                <span className="mateTermsText">
                  <IntlMessages id="page.signUpTermsConditions" />
                </span>
              </div>
              <div className="mateLoginSubmit">
                <Button type="button" onClick={this.handleLogin}>
                  Sign Up
                </Button>
              </div>
            </div>
          
          </Scrollbars>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
  }),
  { login }
)(SignUp);

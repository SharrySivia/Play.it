import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import {
  selectIsSigningUp,
  selectSignUpError,
} from "../../redux/user/user.selectors";
import { signUpStart } from "../../redux/user/user.actions";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import Spinner from "../loading-spinner/loading-spinner.component";

import "./sign-up.styles.scss";

const SignUp = ({ signUpStart, isSigningUp, signUpError }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    } else if (password.length < 8) {
      alert("Password length must be equal to or greater than 8");
      return;
    }

    signUpStart({ email, password, displayName });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">Signup</h2>
      <span>Create a new account with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          placeholder="Display Name"
          onChange={handleChange}
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <span className="error">{signUpError}</span>

        <CustomButton type="submit" disabled={isSigningUp}>
          {isSigningUp ? <Spinner /> : "Signup"}
        </CustomButton>
      </form>

      <span className="footer">
        I already have an account? <Link to="/signin">Signin</Link>
      </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSigningUp: selectIsSigningUp,
  signUpError: selectSignUpError,
});

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userInfo) => dispatch(signUpStart(userInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

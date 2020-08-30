import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import Spinner from "../loading-spinner/loading-spinner.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  selectIsSigningIn,
  selectSignInError,
} from "../../redux/user/user.selectors";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({
  googleSignInStart,
  emailSignInStart,
  isSigningIn,
  signInError,
}) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">Sign in</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          required
          handleChange={handleChange}
          placeholder="Enter email"
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          required
          handleChange={handleChange}
          placeholder="Enter password"
        />
        <span className="error">{signInError}</span>

        <CustomButton type="submit" disabled={isSigningIn}>
          {isSigningIn ? <Spinner /> : "Sign in"}
        </CustomButton>
      </form>
      <span>OR</span>
      <CustomButton onClick={googleSignInStart} disabled={isSigningIn}>
        Continue with Google
      </CustomButton>
      <span className="footer">
        I don't have an account? <Link to="/signup">Signup</Link>
      </span>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isSigningIn: selectIsSigningIn,
  signInError: selectSignInError,
});

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

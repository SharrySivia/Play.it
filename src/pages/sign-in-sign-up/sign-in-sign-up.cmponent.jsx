import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-sign-up.styles.scss";

const SignInSignUpPage = ({ match: { params } }) => (
  <div className="sign-in-sign-up-page">
    <div className="wrapper">
      {params.type === "signin" ? <SignIn /> : <SignUp />}
    </div>
  </div>
);

export default SignInSignUpPage;

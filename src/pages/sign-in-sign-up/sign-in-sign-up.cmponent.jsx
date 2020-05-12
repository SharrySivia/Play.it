import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-sign-up.styles.scss";

const SignInSignUpPage = ({ match: { params } }) => (
  <div className="sign-in-sign-up-page">
    <TransitionGroup>
      <CSSTransition key={params.authType} timeout={500} classNames="card">
        {params.authType === "signin" ? <SignIn /> : <SignUp />}
      </CSSTransition>
    </TransitionGroup>
  </div>
);

export default SignInSignUpPage;

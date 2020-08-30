import React from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-sign-up.styles.scss";

const SignInSignUpPage = ({ location }) => (
  <div className="sign-in-sign-up-page">
    <CSSTransition key={location.key} timeout={500} classNames="card">
      <Switch>
        <Route exact path="/signin">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </CSSTransition>
  </div>
);

export default SignInSignUpPage;

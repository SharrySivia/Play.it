import React from "react";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

import "./sign-in-sign-up.styles.scss";

const SignInSignUpPage = ({ location }) => (
  <div className="sign-in-sign-up-page">
    <div className="wrapper">
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="fade">
          <Switch>
            <Route exact path="/signin">
              <SignIn />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  </div>
);

export default SignInSignUpPage;

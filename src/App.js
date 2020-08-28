import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.css";

import { checkUserSession } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
const HomePage = lazy(() => import("./pages/homePage/homePage.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-sign-up/sign-in-sign-up.component")
);

const App = ({ checkUserSession, history, currentUser }) => {
  useEffect(() => {
    checkUserSession(history);
  }, [checkUserSession, history]);
  return (
    <div className="App">
      <Suspense fallback={<div>Loading.....</div>}>
        <Switch>
          <Route
            path="/(signin|signup)"
            render={(params) =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage {...params} />
              )
            }
          />
          <Route path="/*" component={HomePage} />
        </Switch>
      </Suspense>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: (history) => dispatch(checkUserSession(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

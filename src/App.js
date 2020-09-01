import React, { lazy, Suspense, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import "./App.css";

import { checkUserSession } from "./redux/user/user.actions";
import {
  selectCurrentUser,
  selectIsUserFetching,
} from "./redux/user/user.selectors";

import Spinner from "./components/spinner/spinner.component";

const HomePage = lazy(() => import("./pages/homePage/homePage.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-sign-up/sign-in-sign-up.component")
);

const App = ({ checkUserSession, history, currentUser, isLoading }) => {
  useEffect(() => {
    checkUserSession(history);
  }, [checkUserSession, history]);
  return (
    <div className="App">
      {isLoading ? (
        <Spinner />
      ) : (
        <Suspense fallback={<Spinner />}>
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
            <Route
              path="/*"
              render={(history) => <HomePage history={history} />}
            />
          </Switch>
        </Suspense>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsUserFetching,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: (history) => dispatch(checkUserSession(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

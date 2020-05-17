import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import { auth } from "./firebase/firebase.utils";
import HomePage from "./pages/homePage/homePage.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        history.push("/");
        this.setState({ currentUser: userAuth });
      } else {
        history.replace("/signin");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/(signin|signup)" component={SignInAndSignUpPage} />
          <Route path="/*" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

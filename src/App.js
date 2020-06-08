import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import HomePage from "./pages/homePage/homePage.component";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.component";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    const { history, setCurrentUser } = this.props;
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        history.push("/");
        const userLibrary = {
          songs: null,
          playlists: null,
          artists: null,
          albums: null,
        };
        const userRef = await createUserProfileDocument(userAuth, userLibrary);
        const userSnapshot = await userRef.get();
        console.log(userSnapshot);
        setCurrentUser({ id: userSnapshot.id, ...userSnapshot.data() });
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (userCredentials) =>
    dispatch(setCurrentUser(userCredentials)),
});

export default connect(null, mapDispatchToProps)(withRouter(App));

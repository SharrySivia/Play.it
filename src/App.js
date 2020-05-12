import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import HomePage from "./pages/homePage/homePage.component";
import SongsPage from "./pages/songsPage/songsPage.component";
import PlaylistsPage from "./pages/playlistsPage/playlistsPage.component";
import ArtistsPage from "./pages/artistsPage/artistsPage.componenet";
import AlbumsPage from "./pages/albumsPage/albumsPage.scomponent";
import SignInAndSignUpPage from "./pages/sign-in-sign-up/sign-in-sign-up.cmponent";

import "./App.css";

// const HomePage = () => (
//   <div>
//     <h2>Home Page</h2>
//     <div style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>
//       Log out
//     </div>
//   </div>
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/songs" component={SongsPage} />
          <Route exact path="/playlists" component={PlaylistsPage} />
          <Route exact path="/artists" component={ArtistsPage} />
          <Route exact path="/albums" component={AlbumsPage} />
          <Route path="/:authType" component={SignInAndSignUpPage} />
        </Switch>
        <Redirect to={this.state.currentUser ? "/home" : "/signin"} />
      </div>
    );
  }
}

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import Songs from "../../components/songs/songs.component";
import Playlists from "../../components/playlists/playlists.component";
import Artists from "../../components/artists/artists.component";
import Albums from "../../components/albums/albums.component";
import "./homePage.styles.scss";

const HomePage = () => (
  <div className="home-page">
    <Sidebar />
    <div className="page-content">
      <Header />
      <div style={{ cursor: "pointer" }} onClick={() => auth.signOut()}>
        Log out
      </div>
      <Switch>
        <Route exact path="/collections/songs" component={Songs} />
        <Route exact path="/collections/playlists" component={Playlists} />
        <Route exact path="/collections/artists" component={Artists} />
        <Route exact path="/collections/albums" component={Albums} />
      </Switch>
    </div>
  </div>
);

export default HomePage;

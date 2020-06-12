import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import Player from "../../components/player/player.component";
import RecentlyPlayed from "../../components/recentlyPlayed/recentlyPlayed.component";
import Songs from "../../components/songs/songs.component";
import Playlists from "../../components/playlists/playlists.component";
import Artists from "../../components/artists/artists.component";
import Albums from "../../components/albums/albums.component";
import "./homePage.styles.scss";

const HomePage = ({ currentTrack }) => (
  <div
    className="home-page"
    style={{
      backgroundImage: currentTrack
        ? `url(${currentTrack.imgSrc})`
        : "transparent",
    }}
  >
    <Sidebar />
    <div className="page-content">
      <Header />
      <Switch>
        <Route exact path="/" component={RecentlyPlayed} />
        <Route exact path="/collections/songs" component={Songs} />
        <Route exact path="/collections/playlists" component={Playlists} />
        <Route exact path="/collections/artists" component={Artists} />
        <Route exact path="/collections/albums" component={Albums} />
      </Switch>
    </div>
    <Player />
  </div>
);

const mapStateToProps = ({ player: { currentTrack } }) => ({
  currentTrack,
});

export default connect(mapStateToProps)(HomePage);

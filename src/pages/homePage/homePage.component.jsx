import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentTrack } from "../../redux/player/player.selector";

import Sidebar from "../../components/sidebar/sidebar.component";
import Header from "../../components/header/header.component";
import Player from "../../components/player/player.component";
import RecentlyPlayed from "../../components/recentlyPlayed/recentlyPlayed.component";

import "./homePage.styles.scss";

const Tracks = lazy(() => import("../../components/tracks/tracks.component"));
const Playlists = lazy(() =>
  import("../../components/playlists/playlists.component")
);
const Artists = lazy(() =>
  import("../../components/artists/artists.component")
);
const Albums = lazy(() => import("../../components/albums/albums.component"));

const HomePage = ({ currentTrack, match }) => (
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
      {match.url === "/" ? <RecentlyPlayed /> : null}
      <Suspense fallback={<div>Loading.....</div>}>
        <Switch>
          <Route exact path="/collections/tracks" component={Tracks} />
          <Route exact path="/collections/playlists" component={Playlists} />
          <Route exact path="/collections/artists" component={Artists} />
          <Route exact path="/collections/albums" component={Albums} />
        </Switch>
      </Suspense>
    </div>
    <Player />
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentTrack: selectCurrentTrack,
});

export default connect(mapStateToProps)(HomePage);

import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentTrack } from "../../redux/player/player.selector";
import {
  selectIsRecentsFetching,
  selectRecentlyPlayed,
} from "../../redux/recents/recents.selector";

import Navbar from "../../components/navbar/navbar.component";
import Player from "../../components/player/player.component";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import RecentlyPlayed from "../../components/recentlyPlayed/recentlyPlayed.component";
import Spinner from "../../components/spinner/spinner.component";

import "./homePage.styles.scss";

const Tracks = lazy(() => import("../../components/tracks/tracks.component"));
const Playlists = lazy(() =>
  import("../../components/playlists/playlists.component")
);

const HomePage = ({
  currentTrack,
  recentlyPlayed,
  isRecentsFetching,
  history,
}) => (
    <div
      className="home-page"
      style={{
        backgroundImage: currentTrack
          ? `url(${currentTrack.imgSrc})`
          : "transparent",
      }}
    >
      <Navbar />
      <div className="page-content">

        {isRecentsFetching ? (
          <Spinner />
        ) : (
            <Suspense fallback={<Spinner />}>
              <TransitionGroup>
                <CSSTransition
                  key={history.location.key}
                  timeout={400}
                  classNames="page"
                >
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() =>
                        recentlyPlayed ? (
                          <RecentlyPlayed />
                        ) : (
                            <Redirect to="/collections/tracks" />
                          )
                      }
                    />
                    <Route exact path="/collections/tracks" component={Tracks} />
                    <Route
                      exact
                      path="/collections/playlists"
                      component={Playlists}
                    />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </Suspense>
          )}

      </div>
      <Player />
    </div>
  );

const mapStateToProps = createStructuredSelector({
  currentTrack: selectCurrentTrack,
  recentlyPlayed: selectRecentlyPlayed,
  isRecentsFetching: selectIsRecentsFetching,
});

export default connect(mapStateToProps)(HomePage);

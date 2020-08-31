import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import TrackCard from "../track-card/track-card.component";
import { selectRecentlyPlayed } from "../../redux/recents/recents.selector";

import "./recentlyPlayed.styles.scss";

const RecentlyPlayed = ({ recentlyPlayed }) => (
  <div className="recentlyPlayed">
    <h2 className="title">Recently Played</h2>
    <TransitionGroup>
      {recentlyPlayed ? (
        recentlyPlayed.map((track) => (
          <CSSTransition
            key={track.id}
            timeout={600}
            appear={true}
            classNames="fade"
          >
            <TrackCard key={track.id} track={track} />
          </CSSTransition>
        ))
      ) : (
        <p>Nothing to show here please play a track.</p>
      )}
    </TransitionGroup>
  </div>
);

const mapStateToProps = createStructuredSelector({
  recentlyPlayed: selectRecentlyPlayed,
});

export default connect(mapStateToProps)(RecentlyPlayed);

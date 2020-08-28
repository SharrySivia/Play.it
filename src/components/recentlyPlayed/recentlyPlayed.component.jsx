import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import TrackCard from "../track-card/track-card.component";
import { selectRecentlyPlayed } from "../../redux/recents/recents.selector";

import "./recentlyPlayed.styles.scss";

const RecentlyPlayed = ({ recentlyPlayed }) => (
  <div className="recentlyPlayed">
    <h2 className="title">Recently Played</h2>
    {recentlyPlayed ? (
      recentlyPlayed.map((track) => <TrackCard key={track.id} track={track} />)
    ) : (
      <p>Nothing to show here please play a track.</p>
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  recentlyPlayed: selectRecentlyPlayed,
});

export default connect(mapStateToProps)(RecentlyPlayed);

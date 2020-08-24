import React from "react";
import { connect } from "react-redux";
import TrackCard from "../track-card/track-card.component";

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

const mapStateToProps = ({ recents: { recentlyPlayed } }) => ({
  recentlyPlayed,
});

export default connect(mapStateToProps)(RecentlyPlayed);

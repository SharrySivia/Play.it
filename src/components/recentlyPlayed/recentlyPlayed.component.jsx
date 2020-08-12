import React from "react";
import { connect } from "react-redux";
import SongCard from "../song-card/song-card.component";

import "./recentlyPlayed.styles.scss";

const RecentlyPlayed = ({ recentlyPlayed }) => (
  <div className="recentlyPlayed">
    <h1>Recently Played</h1>
    {recentlyPlayed ? (
      recentlyPlayed.map((song) => <SongCard key={song.id} song={song} />)
    ) : (
      <p>Nothing to show here please play a song.</p>
    )}
  </div>
);

const mapStateToProps = ({ recents: { recentlyPlayed } }) => ({
  recentlyPlayed,
});

export default connect(mapStateToProps)(RecentlyPlayed);

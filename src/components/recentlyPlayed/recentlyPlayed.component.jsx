import React from "react";

import { songs } from "../../collections";
import SongCard from "../song-card/song-card.component";

import "./recentlyPlayed.styles.scss";

const RecentlyPlayed = () => (
  <div className="recentlyPlayed">
    <h1>Recently Played</h1>
    {songs.map((song) => (
      <SongCard key={song.id} song={song} />
    ))}
  </div>
);

export default RecentlyPlayed;

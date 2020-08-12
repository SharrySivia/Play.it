import React from "react";

import { songs } from "../../collections";
import SongCard from "../song-card/song-card.component";

import "./songs.styles.scss";

const Songs = () => {
  return (
    <div className="songs-container">
      {songs.map((song) => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
};

export default Songs;

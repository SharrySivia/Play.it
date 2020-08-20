import React from "react";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import "./song-preview.styles.scss";

const SongPreview = ({ song, addToSelectedSongs, isSelected }) => (
  <div
    className="song-preview-container"
    onClick={() => addToSelectedSongs(song)}
  >
    <div className="image-container">
      <img
        className="image"
        style={isSelected ? { filter: "opacity(30%)" } : null}
        src={song.imgSrc}
        alt={song.name}
      />
      {isSelected ? <DoneRoundedIcon /> : null}
    </div>
    <div className="details">
      <h4 className="song-name">{song.name}</h4>
      <p className="singer-name">{song.singer}</p>
    </div>
  </div>
);

export default SongPreview;

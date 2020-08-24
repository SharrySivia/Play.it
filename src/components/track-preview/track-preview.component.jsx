import React from "react";
import DoneRoundedIcon from "@material-ui/icons/DoneRounded";
import "./track-preview.styles.scss";

const TrackPreview = ({ track, addToSelectedTracks, isSelected }) => (
  <div
    className="track-preview-container"
    onClick={() => addToSelectedTracks(track)}
  >
    <div className="image-container">
      <img
        className="image"
        style={isSelected ? { filter: "opacity(30%)" } : null}
        src={track.imgSrc}
        alt={track.name}
      />
      {isSelected ? <DoneRoundedIcon /> : null}
    </div>
    <div className="details">
      <h4 className="track-name">{track.name}</h4>
      <p className="singer-name">{track.singer}</p>
    </div>
  </div>
);

export default TrackPreview;

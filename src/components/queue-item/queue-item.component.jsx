import React from "react";

import Bars from "../bars/bars.component";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";

import "./queue-item.styles.scss";

const QueueItem = ({
  track,
  currentlyPlaying,
  setCurrentTrack,
  isPaused,
  removeFromQueue,
}) => (
  <div
    className="queue-item"
    onClick={currentlyPlaying ? null : () => setCurrentTrack(track)}
  >
    <img src={track.imgSrc} alt={track.name} />
    <div className="info">
      <span className="title">{track.name}</span>
      <span className="subtitle">{track.singer}</span>
    </div>
    {currentlyPlaying && !isPaused ? <Bars /> : null}
    {currentlyPlaying ? null : (
      <span
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation();
          removeFromQueue(track);
        }}
      >
        <RemoveCircleIcon />
      </span>
    )}
  </div>
);

export default QueueItem;

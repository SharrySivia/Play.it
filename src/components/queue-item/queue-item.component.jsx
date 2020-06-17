import React from "react";

import Bars from "../bars/bars.component";

import "./queue-item.styles.scss";

const QueueItem = ({
  track,
  currentlyPlaying,
  setCurrentTrack,
  isPaused,
  removeFromQueue,
}) => (
  <div className="queue-item">
    <img src={track.imgSrc} alt={track.name} />
    <div className="info">
      <span
        className="title"
        onClick={currentlyPlaying ? null : () => setCurrentTrack(track)}
      >
        {track.name}
      </span>
      <span className="subtitle">{track.singer}</span>
    </div>
    {currentlyPlaying && !isPaused ? <Bars /> : null}
    {currentlyPlaying ? null : (
      <span className="remove-button" onClick={() => removeFromQueue(track)}>
        &#10005;
      </span>
    )}
  </div>
);

export default QueueItem;

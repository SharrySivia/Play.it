import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Bars from "../bars/bars.component";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircleOutline";
import { setCurrentTrack } from "../../redux/player/player.actions";
import { removeFromQueue } from "../../redux/queue/queue.actions";
import {
  selectCurrentTrack,
  selectPaused,
} from "../../redux/player/player.selector";

import "./queue-item.styles.scss";

const QueueItem = ({
  track,
  currentTrack,
  setCurrentTrack,
  isPaused,
  removeFromQueue,
}) => {
  const currentlyPlaying = currentTrack.id === track.id;
  const handleRemove = (evt) => {
    evt.stopPropagation();
    removeFromQueue(track);
  };
  return (
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
        <span className="remove-button" onClick={handleRemove}>
          <RemoveCircleIcon />
        </span>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentTrack: selectCurrentTrack,
  isPaused: selectPaused,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  removeFromQueue: (track) => dispatch(removeFromQueue(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueueItem);

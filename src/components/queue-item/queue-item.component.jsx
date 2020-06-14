import React from "react";
import { connect } from "react-redux";

import { playTrack } from "../../redux/player/player.actions";
import Bars from "../bars/bars.component";

import "./queue-item.styles.scss";

const QueueItem = ({ track, currentTrack, playTrack, isPaused }) => {
  const isCurrentlyPlaying = track.id === currentTrack.id;
  return (
    <div className="queue-item">
      <img src={track.imgSrc} alt={track.name} />
      <span className="title" onClick={() => playTrack(track)}>
        {track.name}
      </span>
      {isCurrentlyPlaying && !isPaused ? <Bars /> : null}
      <span className="remove-button">&#10005;</span>
    </div>
  );
};

const mapStateToProps = ({ player: { currentTrack, isPaused } }) => ({
  currentTrack,
  isPaused,
});

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueueItem);

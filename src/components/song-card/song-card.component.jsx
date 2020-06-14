import React from "react";
import { connect } from "react-redux";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
// import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
// import StarRoundedIcon from "@material-ui/icons/StarRounded";
import AddToQueueRoundedIcon from "@material-ui/icons/AddToQueueRounded";

import { playTrack } from "../../redux/player/player.actions";
import { addToQueue } from "../../redux/queue/queue.actions";

import "./song-card.styles.scss";

const SongCard = ({ song, playTrack, addToQueue }) => (
  <div className="song-card">
    <div
      className="art-display"
      style={{ backgroundImage: `url(${song.imgSrc})` }}
    >
      <div className="play-button">
        <PlayArrowRoundedIcon
          onClick={() => playTrack(song)}
          fontSize="large"
        />
        <AddToQueueRoundedIcon onClick={() => addToQueue(song)} />
      </div>
    </div>
    <h3 className="song-name">{song.name}</h3>
    <span className="artist-name">{song.singer}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
  addToQueue: (track) => dispatch(addToQueue(track)),
});

export default connect(null, mapDispatchToProps)(SongCard);

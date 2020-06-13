import React from "react";
import { connect } from "react-redux";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";

import { playTrack } from "../../redux/player/player.actions";

import "./song-card.styles.scss";

const SongCard = ({ song, playTrack }) => (
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
      </div>
    </div>
    <h3 className="song-name">{song.name}</h3>
    <span className="artist-name">{song.singer}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  playTrack: (track) => dispatch(playTrack(track)),
});

export default connect(null, mapDispatchToProps)(SongCard);

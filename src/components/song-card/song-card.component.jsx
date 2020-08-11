import React from "react";
import { connect } from "react-redux";
// import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
// import StarRoundedIcon from "@material-ui/icons/StarRounded";

import {
  PlayButton,
  AddToQueueButton,
} from "../player-buttons/player-buttons.component";

import { setCurrentTrack } from "../../redux/player/player.actions";
import { addToQueue } from "../../redux/queue/queue.actions";

import "./song-card.styles.scss";

const SongCard = ({ song, currentTrack, setCurrentTrack, addToQueue }) => {
  const disabled = currentTrack ? currentTrack.id === song.id : false;
  return (
    <div className="song-card">
      <div
        className="art-display"
        style={{ backgroundImage: `url(${song.imgSrc})` }}
      >
        <div className="buttons">
          <StarBorderRoundedIcon fontSize="default" />
          <PlayButton
            isDisabled={disabled}
            playTrack={() => setCurrentTrack(song)}
          />
          <AddToQueueButton
            isDisabled={disabled}
            addToQueue={addToQueue}
            song={song}
          />
        </div>
      </div>
      <h3 className="song-name">{song.name}</h3>
      <span className="artist-name">{song.singer}</span>
    </div>
  );
};

const mapStateToProps = ({ player: { currentTrack } }) => ({
  currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  addToQueue: (track) => dispatch(addToQueue(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);

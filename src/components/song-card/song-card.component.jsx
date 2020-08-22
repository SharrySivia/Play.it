import React, { Fragment } from "react";
import { connect } from "react-redux";

import {
  PlayButton,
  AddToQueueButton,
  NowPlayingButton,
} from "../player-buttons/player-buttons.component";

import { setCurrentTrack } from "../../redux/player/player.actions";
import { addTrackToQueue } from "../../redux/queue/queue.actions";

import "./song-card.styles.scss";

const SongCard = ({ song, currentTrack, setCurrentTrack, addTrackToQueue }) => {
  const isCurrentlyPlaying = currentTrack ? currentTrack.id === song.id : false;
  return (
    <div className="song-card">
      <div
        className="art-display"
        style={{ backgroundImage: `url(${song.imgSrc})` }}
      >
        <div className="buttons">
          {isCurrentlyPlaying ? (
            <NowPlayingButton />
          ) : (
            <Fragment>
              <PlayButton handleClick={() => setCurrentTrack(song)} />
              <AddToQueueButton handleClick={() => addTrackToQueue(song)} />
            </Fragment>
          )}
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
  addTrackToQueue: (track) => dispatch(addTrackToQueue(track)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);

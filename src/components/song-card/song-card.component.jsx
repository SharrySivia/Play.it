import React, { Fragment } from "react";
import { connect } from "react-redux";

import {
  PlayButton,
  AddToQueueButton,
  NowPlayingButton,
} from "../player-buttons/player-buttons.component";

import { setCurrentTrack } from "../../redux/player/player.actions";
import { addTrackToQueue, clearQueue } from "../../redux/queue/queue.actions";
import {
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
} from "../../redux/playlists/playlists.actions";

import "./song-card.styles.scss";

const SongCard = ({
  song,
  currentTrack,
  setCurrentTrack,
  addTrackToQueue,
  isPlaylistsPlaying,
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
  clearQueue,
}) => {
  const isCurrentlyPlaying = currentTrack ? currentTrack.id === song.id : false;

  const handlePlay = () => {
    if (isPlaylistsPlaying) {
      toggleIsPlaylistsPlaying();
      setIsPlaylistPlaying();
      clearQueue();
    }
    setCurrentTrack(song);
  };

  const handleAddToQueue = () => {
    if (!currentTrack) {
      setCurrentTrack(song);
    }
    addTrackToQueue(song);
  };
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
              <PlayButton handleClick={handlePlay} />
              <AddToQueueButton handleClick={handleAddToQueue} />
            </Fragment>
          )}
        </div>
      </div>
      <h3 className="song-name">{song.name}</h3>
      <span className="artist-name">{song.singer}</span>
    </div>
  );
};

const mapStateToProps = ({
  player: { currentTrack },
  playlists: { isPlaylistsPlaying },
}) => ({
  currentTrack,
  isPlaylistsPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  addTrackToQueue: (track) => dispatch(addTrackToQueue(track)),
  clearQueue: () => dispatch(clearQueue()),
  setIsPlaylistPlaying: () => dispatch(setIsPlaylistPlaying(null)),
  toggleIsPlaylistsPlaying: () => dispatch(toggleIsPlaylistsPlaying()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SongCard);

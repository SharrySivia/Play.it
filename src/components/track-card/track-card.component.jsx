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

import "./track-card.styles.scss";

const TrackCard = ({
  track,
  currentTrack,
  setCurrentTrack,
  addTrackToQueue,
  isPlaylistsPlaying,
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
  clearQueue,
}) => {
  const isCurrentlyPlaying = currentTrack
    ? currentTrack.id === track.id
    : false;

  const handlePlay = () => {
    if (isPlaylistsPlaying) {
      toggleIsPlaylistsPlaying();
      setIsPlaylistPlaying();
      clearQueue();
    }
    setCurrentTrack(track);
  };

  const handleAddToQueue = () => {
    if (!currentTrack) {
      setCurrentTrack(track);
    }
    addTrackToQueue(track);
  };
  return (
    <div className="track-card">
      <div
        className="art-display"
        style={{ backgroundImage: `url(${track.imgSrc})` }}
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
      <h3 className="track-name">{track.name}</h3>
      <span className="artist-name">{track.singer}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrackCard);

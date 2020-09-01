import React, { Fragment } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import useToggle from "../../hooks/useToggle";

import { selectPlaylistsPlaying } from "../../redux/playlists/playlists.selector";

import { addPlaylistToQueue } from "../../redux/queue/queue.actions";

import {
  removePlaylistFromPlaylists,
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
} from "../../redux/playlists/playlists.actions";

import { setCurrentTrack } from "../../redux/player/player.actions";

import {
  NowPlayingButton,
  DeleteButton,
} from "../player-buttons/player-buttons.component";

import PlaylistPreviewDialog from "../playlist-preview-dialog/playlist-preview-dialog.component";

import "./playlist-overview.styles.scss";

const PlaylistOverview = ({
  playlist,
  isPlaylistsPlaying,
  setCurrentTrack,
  addPlaylistToQueue,
  removePlaylistFromPlaylists,
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
}) => {
  const [isPreviewDialogHidden, togglePreviewDialogHidden] = useToggle(true);
  const handlePlay = (evt) => {
    evt.stopPropagation();
    if (!isPlaylistsPlaying) toggleIsPlaylistsPlaying();
    addPlaylistToQueue(playlist);
    setCurrentTrack(playlist.tracks[0]);
    setIsPlaylistPlaying(playlist);
  };

  const handleRemove = (evt) => {
    evt.stopPropagation();
    removePlaylistFromPlaylists(playlist);
  };

  return (
    <Fragment>
      <div className="playlist-overview" onClick={togglePreviewDialogHidden}>
        <div
          className="image"
          style={{ backgroundImage: `url(${playlist.tracks[0].imgSrc})` }}
          alt="oops"
        />
        <h3 className="title">{playlist.name}</h3>
        {playlist.isPlaying ? (
          <NowPlayingButton />
        ) : (
          <Fragment>
            <button className="btn" onClick={handlePlay}>
              Play
            </button>
            <DeleteButton handleClick={handleRemove} />
          </Fragment>
        )}
      </div>
      <TransitionGroup>
        {isPreviewDialogHidden ? null : (
          <CSSTransition timeout={300} classNames="fade">
            <PlaylistPreviewDialog
              playlist={playlist}
              handlePlay={handlePlay}
              toggleHidden={togglePreviewDialogHidden}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  isPlaylistsPlaying: selectPlaylistsPlaying,
});

const mapDispatchToProps = (dispatch) => ({
  addPlaylistToQueue: (playlist) => dispatch(addPlaylistToQueue(playlist)),
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  removePlaylistFromPlaylists: (playlist) =>
    dispatch(removePlaylistFromPlaylists(playlist)),
  setIsPlaylistPlaying: (playlist) => dispatch(setIsPlaylistPlaying(playlist)),
  toggleIsPlaylistsPlaying: () => dispatch(toggleIsPlaylistsPlaying()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistOverview);

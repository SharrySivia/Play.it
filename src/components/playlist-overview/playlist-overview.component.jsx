import React, { Fragment } from "react";
import { connect } from "react-redux";

import useToggle from "../../hooks/useToggle";

import {
  addPlaylistToQueue,
  clearQueue,
} from "../../redux/queue/queue.actions";

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
  queue,
  isPlaylistsPlaying,
  clearQueue,
  setCurrentTrack,
  addPlaylistToQueue,
  removePlaylistFromPlaylists,
  setIsPlaylistPlaying,
  toggleIsPlaylistsPlaying,
}) => {
  const [isPreviewDialogHidden, togglePreviewDialogHidden] = useToggle(true);
  const handlePlay = (evt) => {
    evt.stopPropagation();
    if (queue) {
      clearQueue();
    }
    if (!isPlaylistsPlaying) toggleIsPlaylistsPlaying();
    addPlaylistToQueue(playlist);
    setCurrentTrack(playlist.songs[0]);
    setIsPlaylistPlaying(playlist);
  };

  const handleRemove = (evt) => {
    evt.stopPropagation();
    removePlaylistFromPlaylists(playlist);
  };

  return (
    <Fragment>
      <div className="playlist-overview" onClick={togglePreviewDialogHidden}>
        <img className="image" src={playlist.songs[0].imgSrc} alt="oops" />
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
      {isPreviewDialogHidden ? null : (
        <PlaylistPreviewDialog
          playlist={playlist}
          handlePlay={handlePlay}
          toggleHidden={togglePreviewDialogHidden}
        />
      )}
    </Fragment>
  );
};

const mapStateToProps = ({
  queue: { queue },
  playlists: { isPlaylistsPlaying },
}) => ({
  queue,
});

const mapDispatchToProps = (dispatch) => ({
  addPlaylistToQueue: (playlist) => dispatch(addPlaylistToQueue(playlist)),
  clearQueue: () => dispatch(clearQueue()),
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  removePlaylistFromPlaylists: (playlist) =>
    dispatch(removePlaylistFromPlaylists(playlist)),
  setIsPlaylistPlaying: (playlist) => dispatch(setIsPlaylistPlaying(playlist)),
  toggleIsPlaylistsPlaying: () => dispatch(toggleIsPlaylistsPlaying()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistOverview);

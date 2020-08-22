import React from "react";
import { connect } from "react-redux";
import useToggle from "../../hooks/useToggle";

import CreatePlaylistDialoge from "../create-playlist-dialog/create-playlist-dialog.component";
import PlaylistOverview from "../playlist-overview/playlist-overview.component";

import {
  addPlaylistToQueue,
  clearQueue,
} from "../../redux/queue/queue.actions";

import { removeFromPlaylists } from "../../redux/playlists/playlists.actions";

import { setCurrentTrack } from "../../redux/player/player.actions";

import "./playlists.styles.scss";

const Playlists = ({
  playlists,
  queue,
  clearQueue,
  setCurrentTrack,
  addPlaylistToQueue,
  removeFromPlaylists,
}) => {
  const [isCreateDialogHidden, toggleCreateDialogHidden] = useToggle(true);
  const handlePlay = (evt, playlist) => {
    evt.stopPropagation();
    if (queue) {
      clearQueue();
    }
    addPlaylistToQueue(playlist);
    setCurrentTrack(playlist.songs[0]);
  };

  const handleRemove = (evt, playlist) => {
    evt.stopPropagation();
    removeFromPlaylists(playlist);
  };

  return (
    <div className="playlists-container">
      <div className="title-container">
        <h2 className="title">User Playlists</h2>
        <button
          type="button"
          className="create-playlist-btn"
          onClick={toggleCreateDialogHidden}
        >
          + Create new playlist
        </button>
      </div>
      {isCreateDialogHidden ? null : (
        <CreatePlaylistDialoge toggleDialog={toggleCreateDialogHidden} />
      )}
      <div className="playlists-overview">
        {playlists ? (
          playlists.map((playlist) => (
            <PlaylistOverview
              key={playlist.id}
              playlist={playlist}
              handlePlay={(evt) => handlePlay(evt, playlist)}
              handleRemove={(evt) => handleRemove(evt, playlist)}
            />
          ))
        ) : (
          <p>Nothing to show here.Please create a playlist.</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ playlists: { playlists }, queue: { queue } }) => ({
  playlists,
  queue,
});

const mapDispatchToProps = (dispatch) => ({
  addPlaylistToQueue: (playlist) => dispatch(addPlaylistToQueue(playlist)),
  clearQueue: () => dispatch(clearQueue()),
  setCurrentTrack: (track) => dispatch(setCurrentTrack(track)),
  removeFromPlaylists: (playlist) => dispatch(removeFromPlaylists(playlist)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);

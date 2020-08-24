import React from "react";
import { connect } from "react-redux";

import { DeleteButton } from "../player-buttons/player-buttons.component";

import { removeTrackFromPlaylist } from "../../redux/playlists/playlists.actions";
import { removeFromQueue } from "../../redux/queue/queue.actions";

import "./playlist-preview-item.styles.scss";

const PlaylistPreviewItem = ({
  track,
  playlistId,
  isDeleteable,
  isPlaylistPlaying,
  currentTrack,
  handleTrackPlay,
  removeFromQueue,
  removeTrackFromPlaylist,
}) => {
  const handleDelete = (evt) => {
    evt.stopPropagation();
    if (isPlaylistPlaying) {
      removeFromQueue(track);
    }
    removeTrackFromPlaylist(playlistId, track);
  };

  const isCurrentlyPlaying = isPlaylistPlaying && currentTrack.id === track.id;

  return (
    <li
      className={`playlist-item ${isCurrentlyPlaying ? "active" : ""}`}
      onClick={isCurrentlyPlaying ? null : handleTrackPlay}
    >
      <span className="track-name">{track.name}</span>
      <span className="singer-name">{track.singer}</span>
      {isCurrentlyPlaying || !isDeleteable ? null : (
        <div className="btn-container">
          <DeleteButton handleClick={handleDelete} />
        </div>
      )}
    </li>
  );
};

const mapStateToProps = ({ player: { currentTrack } }) => ({
  currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  removeTrackFromPlaylist: (playlistId, trackToRemove) =>
    dispatch(removeTrackFromPlaylist({ playlistId, trackToRemove })),
  removeFromQueue: (track) => dispatch(removeFromQueue(track)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPreviewItem);

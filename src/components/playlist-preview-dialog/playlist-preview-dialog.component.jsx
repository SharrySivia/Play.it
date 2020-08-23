import React from "react";

import { connect } from "react-redux";

import {
  DeleteButton,
  NowPlayingButton,
} from "../player-buttons/player-buttons.component";

import { removeTrackFromPlaylist } from "../../redux/playlists/playlists.actions";

import "./playlist-preview-dialog.styles.scss";

const PlaylistPreviewDialog = ({
  playlist,
  toggleHidden,
  handlePlay,
  removeTrackFromPlaylist,
  currentTrack,
}) => {
  let isDeleteable = playlist.songs.length > 1;
  const isPlaylistPlaying = playlist.isPlaying;
  return (
    <div className="playlist-preview-dialog">
      <div className="title-container">
        <h2 className="title">{playlist.name}</h2>
        {isPlaylistPlaying ? (
          <NowPlayingButton />
        ) : (
          <button className="btn" onClick={handlePlay}>
            Play
          </button>
        )}
        <span className="close-btn" onClick={toggleHidden}>
          X
        </span>
      </div>
      <div className="playlist-details">
        <div className="image-container">
          <img className="image" src={playlist.songs[0].imgSrc} alt="oops" />
        </div>
        <ul className="songs-list">
          {playlist.songs.map((song) => (
            <li
              key={song.id}
              className={`list-item ${
                isPlaylistPlaying && currentTrack.id === song.id ? "active" : ""
              }`}
            >
              <span className="song-name">{song.name}</span>
              <span className="singer-name">{song.singer}</span>
              {isPlaylistPlaying ? null : (
                <div className="btn-container">
                  <DeleteButton
                    isDisabled={!isDeleteable}
                    handleClick={() =>
                      removeTrackFromPlaylist(playlist.id, song)
                    }
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ player: { currentTrack } }) => ({
  currentTrack,
});

const mapDispatchToProps = (dispatch) => ({
  removeTrackFromPlaylist: (playlistId, trackToRemove) =>
    dispatch(removeTrackFromPlaylist({ playlistId, trackToRemove })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistPreviewDialog);

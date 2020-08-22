import React from "react";

import "./playlist-preview-dialog.styles.scss";

const PlaylistPreviewDialog = ({ playlist, toggleHidden }) => (
  <div className="playlist-preview-dialog">
    <div className="title-container">
      <h2 className="title">{playlist.name}</h2>
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
          <li key={song.id} className="list-item">
            <span className="song-name">{song.name}</span>
            <span className="singer-name">{song.singer}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default PlaylistPreviewDialog;

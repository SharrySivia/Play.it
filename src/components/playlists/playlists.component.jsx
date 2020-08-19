import React from "react";

import CreatePlaylistDialoge from "../create-playlist-dialog/create-playlist-dialog.component";

import "./playlists.styles.scss";

const Playlists = () => (
  <div className="playlists-container">
    <div className="title-container">
      <h2 className="title">User Playlists</h2>
      <button type="button" className="create-playlist-btn">
        + Create new playlist
      </button>
    </div>
    <CreatePlaylistDialoge />
  </div>
);

export default Playlists;

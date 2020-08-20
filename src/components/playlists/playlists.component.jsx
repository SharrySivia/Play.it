import React, { useState } from "react";
import { connect } from "react-redux";

import CreatePlaylistDialoge from "../create-playlist-dialog/create-playlist-dialog.component";

import "./playlists.styles.scss";

const Playlists = ({ playlists }) => {
  const [isDialogHidden, toggleDialogHidden] = useState(true);
  const toggleDialog = () => toggleDialogHidden(!isDialogHidden);

  return (
    <div className="playlists-container">
      <div className="title-container">
        <h2 className="title">User Playlists</h2>
        <button
          type="button"
          className="create-playlist-btn"
          onClick={toggleDialog}
        >
          + Create new playlist
        </button>
      </div>
      {isDialogHidden ? null : (
        <CreatePlaylistDialoge toggleDialog={toggleDialog} />
      )}

      {playlists.length > 0 ? (
        <h3>{playlists[0].playlistName}</h3>
      ) : (
        <p>Nothing to show here.Please create a playlist.</p>
      )}
    </div>
  );
};

const mapStateToProps = ({ playlists: { playlists } }) => ({
  playlists,
});

export default connect(mapStateToProps)(Playlists);

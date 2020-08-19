import React from "react";
import "./create-playlist-dialog.styles.scss";

const CreatePlaylistDialog = () => (
  <div className="dialog">
    <div className="title-container">
      <h3 className="title"> Create new playlist</h3>
      <button type="button" className="close-btn">
        X
      </button>
    </div>
  </div>
);

export default CreatePlaylistDialog;

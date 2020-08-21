import React, { Fragment } from "react";

import useToggle from "../../hooks/useToggle";

import PlaylistPreviewDialog from "../playlist-preview-dialog/playlist-preview-dialog.component";

import "./playlist-overview.styles.scss";

const PlaylistOverview = ({ playlist }) => {
  const [isPreviewDialogHidden, togglePreviewDialogHidden] = useToggle(true);
  return (
    <Fragment>
      <div className="playlist-overview" onClick={togglePreviewDialogHidden}>
        <img className="image" src={playlist.songs[0].imgSrc} alt="oops" />
        <h3 className="title">{playlist.name}</h3>
        <span className="time">Created at: {playlist.timestamp}</span>
      </div>
      {isPreviewDialogHidden ? null : (
        <PlaylistPreviewDialog
          playlist={playlist}
          toggleHidden={togglePreviewDialogHidden}
        />
      )}
    </Fragment>
  );
};

export default PlaylistOverview;

import React, { Fragment } from "react";

import useToggle from "../../hooks/useToggle";

import { DeleteButton } from "../player-buttons/player-buttons.component";
import PlaylistPreviewDialog from "../playlist-preview-dialog/playlist-preview-dialog.component";

import "./playlist-overview.styles.scss";

const PlaylistOverview = ({ playlist, handlePlay, handleRemove }) => {
  const [isPreviewDialogHidden, togglePreviewDialogHidden] = useToggle(true);
  return (
    <Fragment>
      <div className="playlist-overview" onClick={togglePreviewDialogHidden}>
        <img className="image" src={playlist.songs[0].imgSrc} alt="oops" />
        <h3 className="title">{playlist.name}</h3>
        <button className="btn" onClick={handlePlay}>
          Play
        </button>
        <DeleteButton handleClick={handleRemove} />
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

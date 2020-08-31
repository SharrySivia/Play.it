import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useToggle from "../../hooks/useToggle";

import { selectUserPlaylists } from "../../redux/playlists/playlists.selector";

import CreatePlaylistDialoge from "../create-playlist-dialog/create-playlist-dialog.component";
import PlaylistOverview from "../playlist-overview/playlist-overview.component";

import "./playlists.styles.scss";

const Playlists = ({ playlists }) => {
  const [isCreateDialogHidden, toggleCreateDialogHidden] = useToggle(true);
  return (
    <div className="playlists-container">
      <div className="title-container">
        <h2 className="title">Your Playlists</h2>
        <button
          type="button"
          className="create-playlist-btn"
          onClick={toggleCreateDialogHidden}
        >
          + Create new playlist
        </button>
      </div>
      <TransitionGroup>
        {isCreateDialogHidden ? null : (
          <CSSTransition timeout={300} classNames="fade">
            <CreatePlaylistDialoge toggleDialog={toggleCreateDialogHidden} />
          </CSSTransition>
        )}
      </TransitionGroup>
      <div className="playlists-overview">
        {playlists ? (
          playlists.map((playlist) => (
            <PlaylistOverview key={playlist.id} playlist={playlist} />
          ))
        ) : (
          <p>Nothing to show here.Please create a playlist.</p>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  playlists: selectUserPlaylists,
});

export default connect(mapStateToProps)(Playlists);

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { v4 as uuid } from "uuid";

import { tracks } from "../../collections";
import TrackPreview from "../track-preview/track-preview.component";

import { addToPlaylists } from "../../redux/playlists/playlists.actions";
import { selectUserPlaylists } from "../../redux/playlists/playlists.selector";

import "./create-playlist-dialog.styles.scss";

const CreatePlaylistDialog = ({ toggleDialog, addToPlaylists, playlists }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [playlistNameError, setPlaylistNameError] = useState("");

  const handleChange = (evt) => {
    setPlaylistName(evt.target.value);
  };

  useEffect(() => {
    function checkPlaylistName() {
      if (playlists && playlistName) {
        const isDuplicateNames = playlists.some(
          (playlist) =>
            playlist.name.toLowerCase() === playlistName.toLowerCase()
        );
        if (isDuplicateNames) {
          setPlaylistNameError("Playlist already exists!");
          return;
        }
        setPlaylistNameError("");
      }
    }
    checkPlaylistName();
  }, [playlistName, playlists]);

  const addToSelectedTracks = (trackToAdd) => {
    if (!selectedTracks) {
      setSelectedTracks([trackToAdd]);
      return;
    }
    let existingTrack = selectedTracks.includes(trackToAdd);
    if (existingTrack) {
      const newSelectedTracks = removeFromSelectedTracks(trackToAdd);
      setSelectedTracks(newSelectedTracks);
      return;
    }
    setSelectedTracks([...selectedTracks, trackToAdd]);
  };

  const removeFromSelectedTracks = (trackToRemove) => {
    //remove the existing track
    let newSelectedTracks = selectedTracks.filter(
      (track) => track.id !== trackToRemove.id
    );
    return newSelectedTracks;
  };

  const isAlreadySelected = (track) => {
    return selectedTracks ? selectedTracks.includes(track) : false;
  };

  const handleSubmit = (evt) => {
    const id = uuid();
    const playlist = {
      id,
      name: playlistName,
      tracks: selectedTracks,
      isPlaying: false,
    };
    addToPlaylists(playlist);
    toggleDialog();
  };

  const isDisabled = !(playlistName && selectedTracks.length);

  return (
    <div className="dialog">
      <div className="title-container">
        <h3 className="title"> Create new playlist</h3>
      </div>
      <p className="subtitle">Select tracks to add them to playlist</p>
      <div className="tracks-container">
        {tracks.map((track) => (
          <TrackPreview
            addToSelectedTracks={addToSelectedTracks}
            key={track.id}
            track={track}
            isSelected={isAlreadySelected(track)}
          />
        ))}
      </div>
      <div className="footer">
        {playlistNameError ? (
          <span className="error">{playlistNameError}</span>
        ) : null}
        <input
          type="text"
          className="text-input"
          required
          value={playlistName}
          onChange={handleChange}
          placeholder="Playlist name"
          style={{ borderColor: playlistNameError ? "rgb(255, 51, 0)" : "" }}
        />
        <button
          type="button"
          disabled={isDisabled || playlistNameError}
          className={`btn btn-primary ${
            isDisabled || playlistNameError ? "btn-disabled" : null
          }`}
          onClick={handleSubmit}
        >
          Done
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={toggleDialog}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  playlists: selectUserPlaylists,
});

const mapDispatchToProps = (dispatch) => ({
  addToPlaylists: (playlist) => dispatch(addToPlaylists(playlist)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePlaylistDialog);

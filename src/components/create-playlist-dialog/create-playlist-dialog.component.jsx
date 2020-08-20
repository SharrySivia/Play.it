import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import SongPreview from "../song-preview/song-preview.component";

import { addToPlaylists } from "../../redux/playlists/playlists.actions";
import { songs } from "../../collections";

import "./create-playlist-dialog.styles.scss";

const CreatePlaylistDialog = ({ toggleDialog, addToPlaylists }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  const handleChange = (evt) => {
    setPlaylistName(evt.target.value);
  };

  const addToSelectedSongs = (songToAdd) => {
    if (!selectedSongs) {
      setSelectedSongs([songToAdd]);
      return;
    }
    let existingItem = selectedSongs.includes(songToAdd);
    if (existingItem) {
      //remove the exixting song
      let newSelectedSongs = selectedSongs.filter(
        (song) => song.id !== songToAdd.id
      );
      setSelectedSongs(newSelectedSongs);
      return;
    }
    setSelectedSongs([...selectedSongs, songToAdd]);
  };

  const isAlreadySelected = (song) => {
    return selectedSongs.includes(song);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addToPlaylists({ playlistName, songs: selectedSongs });
    toggleDialog();
  };

  return (
    <div className="dialog">
      <div className="title-container">
        <h3 className="title"> Create new playlist</h3>

        <button type="button" className="close-btn" onClick={toggleDialog}>
          x
        </button>
      </div>
      <p className="subtitle">Select songs to add them to playlist</p>
      <div className="songs-container">
        {songs.map((song) => (
          <SongPreview
            addToSelectedSongs={addToSelectedSongs}
            key={song.id}
            song={song}
            isSelected={isAlreadySelected(song)}
          />
        ))}
      </div>
      <form className="submit-form" onSubmit={handleSubmit}>
        <FormInput
          required
          value={playlistName}
          onChange={handleChange}
          placeholder="Enter playlist name"
        />
        <button type="submit" className="btn">
          Done
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToPlaylists: (playlist) => dispatch(addToPlaylists(playlist)),
});

export default connect(null, mapDispatchToProps)(CreatePlaylistDialog);

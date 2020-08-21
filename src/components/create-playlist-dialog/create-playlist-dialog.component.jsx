import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuid } from "uuid";

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
      const newSelectedSongs = removeFromSelectedSongs(songToAdd);
      setSelectedSongs(newSelectedSongs);
      return;
    }
    setSelectedSongs([...selectedSongs, songToAdd]);
  };

  const removeFromSelectedSongs = (songToRemove) => {
    //remove the existing song
    let newSelectedSongs = selectedSongs.filter(
      (song) => song.id !== songToRemove.id
    );
    return newSelectedSongs;
  };

  const isAlreadySelected = (song) => {
    return selectedSongs ? selectedSongs.includes(song) : false;
  };

  const handleSubmit = (evt) => {
    const id = uuid();
    const date = new Date();
    const timestamp = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    const playlist = {
      id,
      name: playlistName,
      songs: selectedSongs,
      timestamp,
    };
    addToPlaylists(playlist);
    toggleDialog();
  };

  const isDisabled = !(playlistName && selectedSongs.length);

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
      <div className="footer">
        <FormInput
          required
          value={playlistName}
          onChange={handleChange}
          placeholder="Playlist name"
        />
        <button
          type="button"
          disabled={isDisabled}
          className={`btn ${isDisabled ? "btn-disabled" : null}`}
          onClick={handleSubmit}
        >
          Done
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToPlaylists: (playlist) => dispatch(addToPlaylists(playlist)),
});

export default connect(null, mapDispatchToProps)(CreatePlaylistDialog);

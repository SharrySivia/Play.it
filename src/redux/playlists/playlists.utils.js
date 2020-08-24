export const removePlaylistFromPlaylists = (playlists, playlistToRemove) => {
  if (playlists.length > 1) {
    return playlists.filter((playlist) => playlist.id !== playlistToRemove.id);
  }
  return null;
};

export const removeTrackFromPlaylist = (
  playlists,
  { playlistId, trackToRemove }
) => {
  return playlists.map((playlist) => {
    if (playlist.id === playlistId) {
      return {
        ...playlist,
        tracks: playlist.tracks.filter(
          (track) => track.id !== trackToRemove.id
        ),
      };
    }
    return playlist;
  });
};

const checkIsPlaying = (playlist) => {
  return playlist.isPlaying ? { ...playlist, isPlaying: false } : playlist;
};

export const setIsPlaylistPlaying = (playlists, playlistToSet) => {
  if (!playlistToSet) {
    return playlists.map((playlist) => checkIsPlaying(playlist));
  }
  return playlists.map((playlist) =>
    playlist.id === playlistToSet.id
      ? { ...playlist, isPlaying: true }
      : checkIsPlaying(playlist)
  );
};

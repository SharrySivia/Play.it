export const removeFromPlaylists = (playlists, playlistToRemove) => {
  return playlists.filter((playlist) => playlist.id !== playlistToRemove.id);
};

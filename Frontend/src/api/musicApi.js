import axios from "axios";

export const getAllSongs = async () => {
  const response = await axios.get(
    "https://tuneflow-qgbu.onrender.com/api/music",
    {
      withCredentials: true
    }
  );

  return response.data.musics;
};

export const getMySongs = async () => {
  const response = await axios.get(
    "https://tuneflow-qgbu.onrender.com/api/music/my-songs",
    {
      withCredentials: true
    }
  );

  return response.data.songs;
};

export const deleteSong = async (id) => {
  const response = await axios.delete(
    `https://tuneflow-qgbu.onrender.com/api/music/${id}`,
    {
      withCredentials: true
    }
  );

  return response.data;
};

export const getAllAlbums = async () => {
  const response = await axios.get(
    "https://tuneflow-qgbu.onrender.com/api/music/albums",
    {
      withCredentials: true
    }
  );

  return response.data.albums;
};

export const getAlbumById = async (albumId) => {

  const response = await axios.get(
    `https://tuneflow-qgbu.onrender.com/api/music/albums/${albumId}`,
    {
      withCredentials: true
    }
  );

  return response.data.album;
};

export const searchSongs = async (query) => {

  const response = await axios.get(
    `https://tuneflow-qgbu.onrender.com/api/music/search?query=${query}`,
    {
      withCredentials: true
    }
  );

  return response.data.songs;
};

export const toggleLikeSong = async (musicId) => {

  const response = await axios.post(
    `https://tuneflow-qgbu.onrender.com/api/music/like/${musicId}`,
    {},
    {
      withCredentials: true
    }
  );

  return response.data;
};

export const getLikedSongs = async () => {

  const response = await axios.get(
    "https://tuneflow-qgbu.onrender.com/api/music/liked",
    {
      withCredentials: true
    }
  );

  return response.data.songs;
};

export const addToRecentlyPlayed = async (musicId) => {

  const response = await axios.post(
    `https://tuneflow-qgbu.onrender.com/api/music/recent/${musicId}`,
    {},
    {
      withCredentials: true
    }
  );

  return response.data;
};

export const getRecentlyPlayed = async () => {

  const response = await axios.get(
    "https://tuneflow-qgbu.onrender.com/api/music/recently-played",
    {
      withCredentials: true
    }
  );

  return response.data.songs;
};

export const getMyPlaylists = async () => {

  const response = await axios.get(
    "https://tuneflow-qgbu.onrender.com/api/playlists/my-playlists"
  );

  return response.data.playlists;
};

export const createPlaylist = async (name) => {

  const response = await axios.post(
    "https://tuneflow-qgbu.onrender.com/api/playlists/create",
    {
      name
    }
  );

  return response.data;
};

export const addSongToPlaylist = async (
  playlistId,
  songId
) => {

  const response = await axios.post(
    "https://tuneflow-qgbu.onrender.com/api/playlists/add-song",
    {
      playlistId,
      songId
    }
  );

  return response.data;
};

export const getPlaylistById = async (playlistId) => {

  const response = await axios.get(
    `https://tuneflow-qgbu.onrender.com/api/playlists/${playlistId}`
  );

  return response.data.playlist;
};

export const removeSongFromPlaylist = async (
  playlistId,
  songId
) => {

  const response = await axios.delete(
    `https://tuneflow-qgbu.onrender.com/api/playlists/${playlistId}/song/${songId}`
  );

  return response.data;
};

export const deletePlaylist = async (playlistId) => {

  const response = await axios.delete(
    `https://tuneflow-qgbu.onrender.com/api/playlists/${playlistId}`
  );

  return response.data;
};

export const getArtistProfile = async (artistId) => {

  const response = await axios.get(
    `https://tuneflow-qgbu.onrender.com/api/music/artist/${artistId}`
  );

  return response.data;
};

export const getProfile = async () => {

  const response = await axios.get(
    "https://tuneflow-qgbu.onrender.com/api/auth/profile",
    {
      withCredentials: true
    }
  );

  return response.data.user;
};
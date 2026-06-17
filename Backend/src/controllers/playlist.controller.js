const playlistModel = require("../models/playlist.model");

async function createPlaylist(req, res) {

  const { name } = req.body;

  const playlist = await playlistModel.create({

    name,
    user: "6a0d6940561e7bd27f450c15"

  });

  return res.status(201).json({
    playlist
  });

}

async function getMyPlaylists(req, res) {

  const playlists = await playlistModel.find({
    user: "6a0d6940561e7bd27f450c15"
  });

  return res.status(200).json({
    playlists
  });

}

async function addSongToPlaylist(req, res) {

  const { playlistId, songId } = req.body;

  const playlist = await playlistModel.findById(
    playlistId
  );

  if (!playlist) {

    return res.status(404).json({
      message: "Playlist not found"
    });

  }

  if (!playlist.songs.includes(songId)) {

    playlist.songs.push(songId);

    await playlist.save();

  }

  return res.status(200).json({
    message: "Song added successfully"
  });

}

async function getPlaylistById(req, res) {

  const playlist = await playlistModel
    .findById(req.params.playlistId)
    .populate("songs")
    .populate("user", "username");

  if (!playlist) {

    return res.status(404).json({
      message: "Playlist not found"
    });

  }

  return res.status(200).json({
    playlist
  });

}

async function removeSongFromPlaylist(req, res) {

  const { playlistId, songId } = req.params;

  const playlist = await playlistModel.findById(playlistId);

  if (!playlist) {

    return res.status(404).json({
      message: "Playlist not found"
    });

  }

  playlist.songs.pull(songId);

  await playlist.save();

  return res.status(200).json({
    message: "Song removed"
  });

}

async function deletePlaylist(req, res) {

  const { playlistId } = req.params;

  const playlist = await playlistModel.findById(playlistId);

  if (!playlist) {

    return res.status(404).json({
      message: "Playlist not found"
    });

  }

  await playlistModel.findByIdAndDelete(playlistId);

  return res.status(200).json({
    message: "Playlist deleted successfully"
  });

}

module.exports = {
  createPlaylist, getMyPlaylists, addSongToPlaylist, getPlaylistById, removeSongFromPlaylist, deletePlaylist
};
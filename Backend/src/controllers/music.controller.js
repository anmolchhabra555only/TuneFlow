const fs = require("fs");
const userModel = require("../models/user.model");
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model")
const {uploadFile} = require("../services/storage.service")
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {

  console.log("CREATE MUSIC CALLED");
  console.log(req.body);
  console.log(req.file);
  
  try {

    const { title } = req.body;

    const musicFile = req.file;

    if (!musicFile) {
      return res.status(400).json({
        message: "Music file is required"
      });
    }

    console.log(req.file);

    const audioUpload = await uploadFile(
      musicFile.buffer,
      "music_" + Date.now(),
      "yt-complete-backend/music"
    );

    console.log(audioUpload);

    const music = await musicModel.create({
      title,
      artist: req.user.id,
      audio: audioUpload.url,
      image: ""
    });

    return res.status(201).json({
      message: "Music Created Successfully",
      music
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message
    });

  }
}

async function createAlbum(req, res){

    const { title, musics } = req.body;

    const album = await albumModel.create({
      title,
      artist: req.user.id,
      musics: musics,
    })

    res.status(201).json({
      message: "Album created successfully",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        musics: album.musics,
      }
    })

}

async function getAllMusics(req, res){
  const musics = await musicModel
  .find()
  .populate("artist", "username email")

  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics,
  })
}

async function getAllAlbums(req, res) {

  const albums = await albumModel.find().select("title artist").populate("artist", "username, email")
  
  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  })
}

async function getAlbumById(req, res) {
  const albumId = req.params.albumId;

  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate({
      path: "musics",
      populate: {
        path: "artist",
        select: "username email",
      },
    });

  return res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  })
}

async function getMySongs(req, res) {

  const songs = await musicModel
    .find({ artist: req.user.id });

  return res.status(200).json({
    songs
  });
}

async function deleteMusic(req, res) {

  const { musicId } = req.params;

  const music = await musicModel.findOne({
    _id: musicId,
    artist: req.user.id
  });

  if (!music) {
    return res.status(404).json({
      message: "Music not found"
    });
  }

  await musicModel.findByIdAndDelete(musicId);

  return res.status(200).json({
    message: "Music deleted successfully"
  });
}

async function searchSongs(req, res) {

  try {

    const { query } = req.query;

    const songs = await musicModel.find({
      title: {
        $regex: query,
        $options: "i"
      }
    });

    return res.status(200).json({
      songs
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }
}

async function toggleLike(req, res) {

  const musicId = req.params.musicId;

  const music = await musicModel.findById(musicId);

  console.log("Music ID:", req.params.musicId);
  console.log("Music Found:", music?.title);
  console.log("Liked By:", music?.likedBy);
  console.log("User ID:", req.user.id);

  const alreadyLiked = music.likedBy.some(
    id => id.toString() === req.user.id
  );

  if (alreadyLiked) {

    music.likedBy.pull(req.user.id);

  } else {

    music.likedBy.push(req.user.id);

  }

  await music.save();

  return res.status(200).json({
    message: "Like updated"
  });
}

async function getLikedSongs(req, res) {

  const songs = await musicModel
    .find({
      likedBy: req.user.id
    })
    .populate("artist", "username");

  return res.status(200).json({
    songs
  });
}

async function addToRecentlyPlayed(req, res) {

  const { musicId } = req.params;

  const user = await userModel.findById(req.user.id);

  user.recentlyPlayed = user.recentlyPlayed.filter(
    id => id.toString() !== musicId
  );

  user.recentlyPlayed.unshift(musicId);

  user.recentlyPlayed = user.recentlyPlayed.slice(0, 10);

  await user.save();

  return res.status(200).json({
    message: "Added to recently played"
  });
}

async function getRecentlyPlayed(req, res) {

  const user = await userModel
    .findById(req.user.id)
    .populate({
      path: "recentlyPlayed",
      populate: {
        path: "artist",
        select: "username"
      }
    });

  return res.status(200).json({
    songs: user.recentlyPlayed
  });
}

async function getArtistProfile(req, res) {

  const { artistId } = req.params;

  const songs = await musicModel.find({
    artist: artistId
  });

  const albums = await albumModel.find({
    artist: artistId
  });

  return res.status(200).json({
    songs,
    albums
  });

}

async function deleteAlbum(req, res) {
  try {
    const { albumId } = req.params;

    const album = await albumModel.findById(albumId);

    if (!album) {
      return res.status(404).json({
        message: "Album not found"
      });
    }

    if (album.artist.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await albumModel.findByIdAndDelete(albumId);

    res.status(200).json({
      message: "Album deleted successfully"
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
}

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById, getMySongs, deleteMusic, searchSongs, toggleLike, getLikedSongs, addToRecentlyPlayed, getRecentlyPlayed, getArtistProfile, deleteAlbum }  
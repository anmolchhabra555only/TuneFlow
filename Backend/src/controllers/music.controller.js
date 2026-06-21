const userModel = require("../models/user.model");
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model")
const {uploadFile} = require("../services/storage.service")
const jwt = require("jsonwebtoken");


  async function createMusic(req, res) {
    try {
  
      const { title } = req.body;
      const musicFile = req.files.music[0];
      const imageFile = req.files.image[0];
  
      console.log("Music:", musicFile?.originalname);
      console.log("Image:", imageFile?.originalname);

      console.log("Music Size:", musicFile.size);
      console.log("Image Size:", imageFile.size);

        if (!musicFile || !imageFile) {
        return res.status(400).json({
        message: "Music and image are required"
    });
  }
      const audioUpload = await uploadFile(
        musicFile.buffer,
        "music_" + Date.now(),
        "yt-complete-backend/music"
      );

      const imageUpload = await uploadFile(
        imageFile.buffer,
        "cover_" + Date.now(),
        "yt-complete-backend/images"
      );
  
      const music = await musicModel.create({
        title,
        artist: req.user.id,
        audio: audioUpload.url,
        image: imageUpload.url
      });
  
      return res.status(201).json({
        message: "Music Created Successfully",
        music: {
          id: music._id,
          title: music.title,
          uri: music.uri,
          artist: music.artist
        }
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

  const album = await albumModel.findById(albumId).populate("artist", "username email").populate("musics")

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

module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById, getMySongs, deleteMusic, searchSongs, toggleLike, getLikedSongs, addToRecentlyPlayed, getRecentlyPlayed, getArtistProfile }  
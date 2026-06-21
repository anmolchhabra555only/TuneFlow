const express = require("express");
const musicController = require("../controllers/music.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const multer = require("multer");

const path = require("path");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});


const router = express.Router();

router.post(
  "/upload",
  upload.single("music"),
  authMiddleware.authArtist,
  musicController.createMusic
);

router.post("/album", authMiddleware.authArtist, musicController.createAlbum)

router.get("/", authMiddleware.authUser, musicController.getAllMusics)
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums)

router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumById)

router.get("/my-songs", authMiddleware.authArtist, musicController.getMySongs)

router.delete("/:musicId", authMiddleware.authArtist, musicController.deleteMusic)

router.get("/search", authMiddleware.authUser, musicController.searchSongs)

router.post("/like/:musicId", authMiddleware.authUser, musicController.toggleLike)

router.get("/liked", authMiddleware.authUser, musicController.getLikedSongs)

router.post("/recent/:musicId", authMiddleware.authUser, musicController.addToRecentlyPlayed)

router.get("/recently-played", authMiddleware.authUser, musicController.getRecentlyPlayed)

router.get("/artist/:artistId", musicController.getArtistProfile)


module.exports = router;
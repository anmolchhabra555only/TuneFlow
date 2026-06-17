const express = require("express");

const router = express.Router();

const playlistController =
require("../controllers/playlist.controller");

const authMiddleware =
require("../middlewares/auth.middleware");

router.post(
  "/create",
  playlistController.createPlaylist
);

router.get("/my-playlists", playlistController.getMyPlaylists)

router.post("/add-song", playlistController.addSongToPlaylist)

router.get("/:playlistId", playlistController.getPlaylistById)

router.delete(
  "/:playlistId/song/:songId",
  playlistController.removeSongFromPlaylist
);

router.delete("/:playlistId", playlistController.deletePlaylist)

module.exports = router;
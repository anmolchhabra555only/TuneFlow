const playlistRoutes = require("./routes/playlist.routes");
const cookieParser = require("cookie-parser");
const express = require ("express");
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes")
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use('/api/auth', authRoutes)
app.use('/api/music', musicRoutes)
app.use("/api/playlists", playlistRoutes)


module.exports = app;
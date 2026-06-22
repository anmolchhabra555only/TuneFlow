const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  audio: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: "",
  },

  title: {
    type: String,
    required: true,
  },

  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const musicModel = mongoose.model("music", musicSchema);

module.exports = musicModel;
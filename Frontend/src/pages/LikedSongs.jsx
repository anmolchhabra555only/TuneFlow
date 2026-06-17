import { useEffect, useState } from "react";
import { getLikedSongs } from "../api/musicApi";

const LikedSongs = () => {

  const [songs, setSongs] = useState([]);

  useEffect(() => {

    const fetchSongs = async () => {

      try {

        const data = await getLikedSongs();

        setSongs(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchSongs();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        ❤️ Liked Songs
      </h1>

      {
        songs.map(song => (

          <div
            key={song._id}
            className="bg-zinc-900 p-4 rounded mb-3"
          >
            {song.title}
          </div>

        ))
      }

    </div>
  );
};

export default LikedSongs;
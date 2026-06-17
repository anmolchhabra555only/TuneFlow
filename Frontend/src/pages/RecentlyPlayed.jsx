import { useEffect, useState } from "react";
import { getRecentlyPlayed } from "../api/musicApi";

const RecentlyPlayed = () => {

  const [songs, setSongs] = useState([]);

  useEffect(() => {

    const fetchSongs = async () => {

      try {

        const data = await getRecentlyPlayed();

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
        Recently Played
      </h1>

      {songs.map(song => (

        <div
          key={song._id}
          className="bg-zinc-900 p-4 rounded mb-3"
        >
          <h2>{song.title}</h2>

          <p className="text-gray-400">
            {song.artist?.username}
          </p>

        </div>

      ))}

    </div>
  );
};

export default RecentlyPlayed;
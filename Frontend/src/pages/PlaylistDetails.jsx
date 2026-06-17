import music1 from "../assets/music1.jfif";
import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById, removeSongFromPlaylist } from "../api/musicApi";

const PlaylistDetails = () => {

  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);

  const handleRemoveSong = async (songId) => {

    try {
  
      await removeSongFromPlaylist(
        playlist._id,
        songId
      );
  
      const updatedPlaylist =
        await getPlaylistById(playlist._id);
  
      setPlaylist(updatedPlaylist);
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };

  const { playSong } = useContext(MusicContext);

  useEffect(() => {

    const fetchPlaylist = async () => {

      try {

        const data = await getPlaylistById(playlistId);

        setPlaylist(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchPlaylist();

  }, [playlistId]);

  if (!playlist) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        {playlist.name}
      </h1>

      {

        playlist.songs.map(song => (

          <div
            key={song._id}
            onClick={() =>
            playSong(
          {
            _id: song._id,
            title: song.title,
            artist: playlist.user.username,
            audio: song.uri,
            image: music1
          },
            0
          )
        }
            className="bg-zinc-900 p-4 rounded mb-3 cursor-pointer hover:bg-zinc-800"
          >

          <div className="flex justify-between items-center">

            <h2 className="font-semibold">
              {song.title}
            </h2>

          <button
            onClick={(e) => {

              e.stopPropagation();

              handleRemoveSong(song._id);

          }}
            className="text-red-500 font-bold text-xl cursor-pointer"
          >
            ❌
          </button>

          </div>

          </div>

        ))

      }

    </div>

  );

};

export default PlaylistDetails;
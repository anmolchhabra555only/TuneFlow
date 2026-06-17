import { Link } from "react-router-dom";
import { FaPlay, FaHeart } from "react-icons/fa"
import { useContext, useState } from "react"

import { MusicContext } from "../context/MusicContext"
import { toggleLikeSong, getMyPlaylists, addSongToPlaylist } from "../api/musicApi"

const MusicCard = ({ song, index }) => {


  const [liked, setLiked] = useState(song.likedBy?.length > 0);

  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);

  const {
    playSong,
    currentSong
  } = useContext(MusicContext)

  
  return (

    <div
      onClick={() => playSong(song, index)}
      className={`

    bg-[#181818]
      p-4
      rounded-lg
      cursor-pointer
      group
      transition-all
      duration-300    

      ${currentSong?.audio === song.audio
         ? "border border-green-500"
         : "hover:bg-[#282828]"
      }

       `}
    >

      <div className="relative">

        <img
          src={song.image}
          alt="music"
          className="rounded-lg mb-4 h-[200px] w-full object-cover"
        />

        <button className="absolute bottom-2 right-2 bg-green-500 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300">

          <FaPlay className="text-black" />

        </button>

      </div>

      <h2 className="text-white text-lg font-semibold">
        {song.title}
      </h2>

      <button
        onClick={async (e) => {

        e.stopPropagation();

    try {

      console.log("Sending Like For:", song._id);

      await toggleLikeSong(song._id);

      console.log("Like Success");

      setLiked(!liked);

    } catch (err) {

      console.log(err);

    }

  }}
  className={`mt-3 hover:scale-110 transition cursor-pointer ${
    liked ? "text-red-500" : "text-gray-500"
  }`}
    >
      <FaHeart size={20} />
      </button>

      <button
        onClick={async (e) => {

        e.stopPropagation();

    try {

      const data = await getMyPlaylists();

      setPlaylists(data);

      setShowPlaylists(!showPlaylists);

    } catch (err) {

      console.log(err);

    }

  }}
      className="ml-4 text-green-500 font-semibold"
    >
  +
    </button>

  {
    showPlaylists && (

    <div className="mt-3 bg-zinc-800 rounded p-2">

      {
        playlists.map((playlist) => (

          <div
            key={playlist._id}
            onClick={async (e) => {

              e.stopPropagation();

              try {

                await addSongToPlaylist(
                  playlist._id,
                  song._id
                );

                alert("Song Added");

              } catch (err) {

                console.log(err);

              }

            }}
            className="cursor-pointer hover:text-green-500 py-1"
          >
            {playlist.name}
          </div>

        ))
      }

    </div>

  )
}

    </div>
  )
}

export default MusicCard
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyPlaylists, createPlaylist, deletePlaylist } from "../api/musicApi";

const Playlists = () => {

  const [playlists, setPlaylists] = useState([]);

  const [playlistName, setPlaylistName] = useState("");

  const handleCreatePlaylist = async () => {

    if (!playlistName.trim()) return;
  
    try {
  
      await createPlaylist(playlistName);
  
      const data = await getMyPlaylists();
  
      setPlaylists(data);
  
      setPlaylistName("");
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };

  const handleDeletePlaylist = async (playlistId) => {

    try {
  
      await deletePlaylist(playlistId);
  
      const data = await getMyPlaylists();
  
      setPlaylists(data);
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };

  useEffect(() => {

    const fetchPlaylists = async () => {

      try {

        const data = await getMyPlaylists();

        setPlaylists(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchPlaylists();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Playlists
      </h1>

      <div className="flex gap-3 mb-6">

      <input
        type="text"
        placeholder="Playlist name..."
        value={playlistName}
        onChange={(e) =>
        setPlaylistName(e.target.value)
      }
        className="bg-zinc-900 px-4 py-2 rounded flex-1"
      />

      <button
        onClick={handleCreatePlaylist}
        className="bg-green-500 text-black px-4 py-2 rounded font-semibold cursor-pointer"
      >
        Create
      </button>

      </div>

      {playlists.map((playlist) => (

    <Link
      to={`/playlists/${playlist._id}`}
      key={playlist._id}
    >
    <div
      className="bg-zinc-900 p-4 rounded mb-3 hover:bg-zinc-800"
    >
    <h2 className="font-semibold text-xl">
      {playlist.name}
    </h2>

    <button
    onClick={() =>
      handleDeletePlaylist(playlist._id)
    }
    className="text-red-500 text-xl cursor-pointer"
  >
    🗑️
    </button>
  </div>
    </Link>

      ))}

    </div>
  );
};

export default Playlists;
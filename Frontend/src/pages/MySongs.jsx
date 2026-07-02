import { deleteSong } from "../api/musicApi";
import { useEffect, useState } from "react";
import { getMySongs } from "../api/musicApi";
import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

const MySongs = () => {

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const [songs, setSongs] = useState([]);

  const {
    currentSong,
    setCurrentSong,
    audioRef,
    setCurrentIndex
  } = useContext(MusicContext);

  useEffect(() => {

    const fetchSongs = async () => {

      try {

        const data = await getMySongs();
        setSongs(data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchSongs();

  }, []);

  const handleDelete = async () => {

    try {
  
      await deleteSong(selectedSongId);
  
      // Agar deleted song hi play ho raha hai
      if (currentSong?._id === selectedSongId) {
        audioRef.current.pause();
        audioRef.current.src = "";
        setCurrentSong(null);
        setCurrentIndex(0);
      }
  
      setSongs(
        songs.filter(song => song._id !== selectedSongId)
      );
  
      setShowDeleteModal(false);
      setSelectedSongId(null);
  
    } catch (err) {
      console.log(err);
    }
  
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Songs
      </h1>

      {songs.map(song => (
        <div
          key={song._id}
          className="bg-zinc-900 p-4 rounded mb-3 flex justify-between items-center"
        >
          <span>{song.title}</span>

          <button
            onClick={() => {
            setSelectedSongId(song._id);
            setShowDeleteModal(true);
          }}
            className="bg-red-500 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

{showDeleteModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

        <div className="bg-zinc-900 p-6 rounded-lg w-[400px]">

          <h2 className="text-xl font-bold mb-3">
            Delete Song
          </h2>

          <p className="text-gray-400 mb-6">
            Are you sure you want to delete this song?
          </p>

          <div className="flex justify-end gap-3">

            <button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedSongId(null);
              }}
              className="px-4 py-2 border border-gray-600 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 rounded"
            >
              Delete
            </button>

          </div>

        </div>

      </div>
    )}

  </div>
  );
};

export default MySongs;
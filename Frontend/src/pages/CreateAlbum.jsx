import { useEffect, useState } from "react";
import { getMySongs } from "../api/musicApi";
import axios from "axios";

const CreateAlbum = () => {

  const [title, setTitle] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {

    const fetchSongs = async () => {

      const data = await getMySongs();
      setSongs(data);

    };

    fetchSongs();

  }, []);

  const handleCheckbox = (id) => {

    if (selectedSongs.includes(id)) {

      setSelectedSongs(
        selectedSongs.filter(songId => songId !== id)
      );

    } else {

      setSelectedSongs([
        ...selectedSongs,
        id
      ]);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://tuneflow-qgbu.onrender.com",
        {
          title,
          musics: selectedSongs
        },
        {
          withCredentials: true
        }
      );

      alert("Album Created");

    } catch (err) {

      console.log(err);

    }

  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Create Album
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          placeholder="Album Name"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="bg-zinc-900 p-3 rounded w-full"
        />

        <div>

          <h2 className="mb-3">
            Select Songs
          </h2>

          {
            songs.map(song => (

              <div
                key={song._id}
                className="mb-2"
              >

                <input
                  type="checkbox"
                  onChange={() => handleCheckbox(song._id)}
                />

                <span className="ml-2">
                  {song.title}
                </span>

              </div>

            ))
          }

        </div>

        <button
          className="bg-green-500 px-5 py-3 rounded cursor-pointer"
        >
          Create Album
        </button>

      </form>

    </div>
  );
};

export default CreateAlbum;
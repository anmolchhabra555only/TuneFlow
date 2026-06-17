import { useState } from "react";
import { searchSongs } from "../api/musicApi";

const Search = () => {

  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const [currentAudio, setCurrentAudio] = useState(null);

  const handleSearch = async (e) => {

    const value = e.target.value;

    setQuery(value);

    if (!value.trim()) {
    setSongs([]);
    return;
  }

  const data = await searchSongs(value);

  setSongs(data);
};

return (
  <div className="min-h-screen bg-black text-white p-10">

    <h1 className="text-3xl font-bold mb-6">
      Search Songs
    </h1>

    <input
      type="text"
      placeholder="Search song..."
      value={query}
      onChange={handleSearch}
      className="w-full bg-zinc-900 p-3 rounded mb-6"
    />

    <div className="space-y-3">

      {query.trim() === "" ? (

        <p className="text-gray-400 text-center mt-10">
          Start typing to search songs...
        </p>

      ) : (

        songs.map(song => (

          <div
            key={song._id}
            className="bg-zinc-900 p-4 rounded mb-3"
          >

            <p className="mb-3 font-semibold">
              {song.title}
            </p>

            <audio
              controls
              className="w-full"
              onPlay={(e) => {

                if (
                  currentAudio &&
                  currentAudio !== e.target
                ) {
                  currentAudio.pause();
                }

                setCurrentAudio(e.target);
              }}
            >
              <source
                src={song.uri}
                type="audio/mpeg"
              />
            </audio>

          </div>

        ))

      )}

    </div>

  </div>
);
};

export default Search;
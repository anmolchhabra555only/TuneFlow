import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getAlbumById } from "../api/musicApi";
import { MusicContext } from "../context/MusicContext";
import music1 from "../assets/music1.jfif";
import { deleteAlbum } from "../api/musicApi";
import { useNavigate } from "react-router-dom";

const AlbumDetails = () => {

  const navigate = useNavigate();

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Delete this album?"
    );
  
    if (!confirmDelete) return;
  
    try {
  
      await deleteAlbum(album._id);
  
      alert("Album deleted successfully");
  
      navigate("/");
  
    } catch (err) {
  
      console.log(err);
  
    }
  
  };

  const { albumId } = useParams();

  const { playSong, setSongs } = useContext(MusicContext);

  const [album, setAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const data = await getAlbumById(albumId);
        setAlbum(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbum();
  }, [albumId]);

  useEffect(() => {
    if (album) {
      setSongs(album.musics);
    }
  }, [album, setSongs]);

  if (!album) {
    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-2">
        {album.title}
      </h1>

      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-4"
      >
        Delete Album
      </button>

      <p className="text-gray-400 mb-8">
        Artist: {album.artist?.username}
      </p>

      <div className="space-y-3">

        {album.musics.map((song, index) => (

          <div
            key={song._id}
            onClick={() =>
              playSong(
                {
                  ...song,
                  artist:
                    typeof song.artist === "object"
                      ? song.artist.username
                      : song.artist,
                  image: song.image || music1,
                },
                index
              )
            }
            className="bg-zinc-900 p-4 rounded flex items-center justify-between cursor-pointer hover:bg-zinc-800"
          >

            <div className="flex items-center gap-4">

              <img
                src={song.image || music1}
                alt={song.title}
                className="w-14 h-14 rounded object-cover"
              />

              <div>
                <h3 className="font-semibold">
                  {song.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {album.artist?.username}
                </p>

              </div>

            </div>

            <span className="text-green-500">
              ▶
            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default AlbumDetails;
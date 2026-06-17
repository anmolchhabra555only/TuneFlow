import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getAllAlbums } from "../api/musicApi";

const Albums = () => {

  const [albums, setAlbums] = useState([]);

  useEffect(() => {

    const fetchAlbums = async () => {

      const data = await getAllAlbums();
      setAlbums(data);

    };

    fetchAlbums();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Albums
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {albums.map(album => (

      <Link
        to={`/albums/${album._id}`}
        key={album._id}
      >
        <div className="bg-zinc-900 p-5 rounded-lg hover:bg-zinc-800 transition">

        <h2 className="font-bold text-xl">
        {album.title}
        </h2>

        <p className="text-gray-400">
        {album.artist?.username}
        </p>

      </div>
    </Link>

        ))}

      </div>

    </div>
  );
};

export default Albums;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtistProfile } from "../api/musicApi";

const ArtistProfile = () => {

  const { artistId } = useParams();

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {

    const fetchArtist = async () => {

      try {

        const data = await getArtistProfile(artistId);

        setSongs(data.songs);
        setAlbums(data.albums);

      } catch (err) {

        console.log(err);

      }

    };

    fetchArtist();

  }, [artistId]);

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        Artist Profile
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Songs
      </h2>

      {songs.map(song => (

        <div
          key={song._id}
          className="bg-zinc-900 p-4 rounded mb-3"
        >
          {song.title}
        </div>

      ))}

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Albums
      </h2>

      {albums.map(album => (

        <div
          key={album._id}
          className="bg-zinc-900 p-4 rounded mb-3"
        >
          {album.title}
        </div>

      ))}

    </div>

  );

};

export default ArtistProfile;
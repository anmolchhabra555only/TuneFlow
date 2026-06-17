import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumById } from "../api/musicApi";

const AlbumDetails = () => {

  const { albumId } = useParams();

  const [album, setAlbum] = useState(null);

  const [currentAudio, setCurrentAudio] = useState(null);

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

      <p className="text-gray-400 mb-8">
        Artist: {album.artist?.username}
      </p>

      <div className="space-y-3">

        {album.musics.map((song) => (

          <div
            key={song._id}
            className="bg-zinc-900 p-4 rounded flex justify-between"
          >

            <span>{song.title}</span>

            <audio controls
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

        ))}

      </div>

    </div>
  );
};

export default AlbumDetails;
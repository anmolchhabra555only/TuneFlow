import { useState } from "react";
import axios from "axios";

const UploadMusic = () => {

  const [title, setTitle] = useState("");

  const [audio, setAudio] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {

    <h1 className="text-red-500 text-5xl">
       TEST TEST TEST
    </h1>

    e.preventDefault();

    const response = await axios.post(
      "https://tuneflow-qgbu.onrender.com/api/music/upload",
      {
        title,
        audio,
        image
      },
      {
        withCredentials: true
      }
    );

  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        Upload Music
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-md"
      >

        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="w-full p-3 rounded bg-zinc-900"
        />

        <input
          type="text"
          placeholder="Audio URL"
          value={audio}
          onChange={(e) => setAudio(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />


        <button
          className="bg-green-500 px-5 py-3 rounded cursor-pointer"
        >
          Upload Song
        </button>

      </form>

    </div>
  );
};

export default UploadMusic;
import { useState } from "react";
import axios from "axios";

const UploadMusic = () => {

  const [title, setTitle] = useState("");
  const [music, setMusic] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("music", music);

    try {

      const response = await axios.post(
        "https://tuneflow-qgbu.onrender.com/api/music/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      alert(response.data.message);

      setTitle("");
      setMusic(null);

    } catch (err) {

      console.log(err);

      alert("Upload Failed");

    }

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
          type="file"
          accept=".mp3"
          onChange={(e)=>setMusic(e.target.files[0])}
          className="w-full"
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
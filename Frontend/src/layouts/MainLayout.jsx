import { useState } from "react"
import { useContext, useEffect } from "react"
import { MusicContext } from "../context/MusicContext"

import music1 from "../assets/music1.jfif"

import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import MusicCard from "../components/MusicCard"
import Player from "../components/Player"
import { getAllSongs } from "../api/musicApi.js"

const MainLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [songs, setSongsState] = useState([])

  const { setSongs } = useContext(MusicContext)

  useEffect(() => {

    const fetchSongs = async () => {
  
      try {
  
        const data = await getAllSongs()

        console.log("Songs from Backend:", data);
  
        const formattedSongs = data.map(song => ({
          _id: song._id,
          title: song.title,
          artist: song.artist.username,
          audio: song.audio || song.uri,
          image: song.image || music1,
          likedBy: song.likedBy
        }));
        
        setSongsState(formattedSongs)
  
        setSongs(formattedSongs)
  
      } catch(error) {
  
        console.log(error)
  
      }
  
    }
  
    fetchSongs()
  
  }, [setSongs])

  return (

    <div className="flex bg-black text-white min-h-screen">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 p-8 overflow-y-auto pb-32">

        <Navbar setSidebarOpen={setSidebarOpen} />

        <h1 className="text-2xl font-bold mb-6">
          Trending Songs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

    {
      songs.map((song, index) => (
        <MusicCard
          key={index}
          song={song}
          index={index}

    />
  ))
}

        </div>

      </div>

      <Player />

    </div>
  )
}

export default MainLayout
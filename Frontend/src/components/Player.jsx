import { FaVolumeUp } from "react-icons/fa"
import {
  FaPlay,
  FaPause
} from "react-icons/fa"

import {
  IoPlaySkipBack,
  IoPlaySkipForward
} from "react-icons/io5"

import { useContext } from "react"

import { MusicContext } from "../context/MusicContext"

const Player = () => {

  const {
    currentSong,
    isPlaying,
    playSong, 
    currentTime,
    duration,
    nextSong,
    prevSong,
    audioRef,
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    queue,

  } = useContext(MusicContext)

  if (!currentSong) return null;


  const formatTime = (time) => {

    if (!time) return "0:00"
  
    const minutes = Math.floor(time / 60)
  
    const seconds = Math.floor(time % 60)
  
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const handleSeek = (e) => {

    const width = e.currentTarget.clientWidth
  
    const clickX = e.nativeEvent.offsetX
  
    const seekTime = (clickX / width) * duration
  
    audioRef.current.currentTime = seekTime
  }

  const handleVolume = (e) => {

    audioRef.current.volume = e.target.value
  }

  return (

    <div className="fixed bottom-0 left-0 lg:left-[280px] w-full lg:w-[calc(100%-280px)] bg-[#181818] border-t border-gray-800 px-6 py-4 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        <img
          src={currentSong?.image}
          alt="music"
          className="w-14 h-14 rounded object-cover"
        />

        <div>

          <h2 className="text-white font-semibold">

            {
              currentSong
                ? currentSong.title
                : "No Song Selected"
            }

          </h2>

          <p className="text-gray-400 text-sm">

            {
              currentSong
                ? currentSong.artist
                : "Unknown Artist"
            }

          </p>

        </div>

      </div>

      {/* Center */}

      <div className="flex flex-col items-center gap-3 flex-1 min-w-0">

      <div className="flex items-center gap-3 md:gap-6 text-white text-lg md:text-xl whitespace-nowrap">

      <button
        onClick={() => setShuffle(!shuffle)}
        className={`cursor-pointer text-xl transition-all duration-300 ${
        shuffle
          ? "text-green-500 scale-125"
          : "text-gray-400 hover:text-white"
      }`}
      >
         🔀
      </button>

        <IoPlaySkipBack
          onClick={prevSong}
          className="cursor-pointer hover:text-green-500 transition-all duration-300"
        />

        <button
          onClick={() => playSong(currentSong)}
          className="bg-white text-black p-3 rounded-full hover:scale-105 transition-all duration-300"
        >
        {
        isPlaying
          ? <FaPause />
          : <FaPlay />
        }
      </button>

        <IoPlaySkipForward
           onClick={nextSong}
           className="cursor-pointer hover:text-green-500 transition-all duration-300"
      />

        <button
          onClick={() => setRepeat(!repeat)}
          className={`cursor-pointer text-xl transition-all duration-300 ${
         repeat
          ? "text-green-500 scale-125"
          : "text-gray-400 hover:text-white"
        }`}
        >
          🔁
        </button>

    </div>

        <div
          onClick={handleSeek}
          className="w-[300px] h-1 bg-gray-600 rounded-full cursor-pointer"
        >

          <div   className="h-1 bg-green-500 rounded-full"
            style={{
            width: `${(currentTime / duration) * 100 || 0}%`
          }}></div>

        </div>

      </div>

      {
        queue.length > 0 && (
      <div className="hidden lg:block absolute right-6 bottom-24 bg-zinc-900 p-4 rounded-lg w-64">

      <h3 className="font-semibold mb-3">
        Up Next
      </h3>

      {
        queue.slice(0, 5).map(song => (
          <p
            key={song._id}
            className="text-sm text-gray-300 mb-2"
          >
            {song.title}
          </p>
        ))
      }

    </div>
  )
}

      {/* Right */}

      <div className="hidden md:flex items-center gap-3">

        <FaVolumeUp />

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={handleVolume}
        />

</div>

    </div>
  )
}

export default Player
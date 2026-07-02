import { addToRecentlyPlayed } from "../api/musicApi";
import axios from "axios";
import { createContext, useRef, useState, useEffect } from "react"

export const MusicContext = createContext()

const MusicProvider = ({ children }) => {

  const audioRef = useRef()

  const [currentSong, setCurrentSong] = useState(null)

  const [isPlaying, setIsPlaying] = useState(false)

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const [songs, setSongs] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [queue, setQueue] = useState([]);

  const [shuffle, setShuffle] = useState(false);

  const [repeat, setRepeat] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        "https://tuneflow-qgbu.onrender.com/api/auth/profile",
        {
          withCredentials: true
        }
      );
  
      console.log("Profile Response:", response.data);
  
      setUser(response.data.user);
    } catch {
      setUser(null);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;
  
    const playAudio = async () => {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log(err);
      }
    };
  
    playAudio();
  
  }, [currentSong]);

  const nextSong = () => {

    console.log("Shuffle:", shuffle);
    console.log("Songs Length:", songs.length);
    console.log("Current Index:", currentIndex);

    if (songs.length === 0) return;
  
    let nextIndex;
  
    if (shuffle) {
  
      nextIndex = Math.floor(
        Math.random() * songs.length
      );
  
    } else {
  
      nextIndex =
        (currentIndex + 1) % songs.length;
  
    }
  
    setCurrentIndex(nextIndex);
  
    setCurrentSong(songs[nextIndex]);

    const upcomingSongs = songs.filter(
      (_, i) => i > nextIndex
    );
    
    setQueue(upcomingSongs);
  
    setIsPlaying(true);
  
  };

  const prevSong = () => {

    if(songs.length === 0) return
  
    const prevIndex =
      currentIndex === 0
        ? songs.length - 1
        : currentIndex - 1
  
    setCurrentIndex(prevIndex)
  
    setCurrentSong(songs[prevIndex])
  
  
    setIsPlaying(true)
  }

  const playSong = async (song, index = 0) => {

    if (currentSong?.audio === song.audio) {
  
      if (isPlaying) {
  
        audioRef.current.pause();  

      } else {

        await audioRef.current.play();  
      }
  
      return;
    }

    try {
      await addToRecentlyPlayed(song._id);
    } catch (err) {
      console.log(err);
    }
  
    setCurrentSong(song);
    setCurrentIndex(index);
  
  };


  return (

    <MusicContext.Provider
      value={{
        audioRef,
        currentSong,
        setCurrentSong,
        isPlaying,
        playSong,
        currentTime,
        duration,
        setCurrentTime,
        setDuration,
        songs,
        setSongs,
        currentIndex,
        setCurrentIndex,
        nextSong,
        prevSong,
        user,
        setUser,
        loading,

        shuffle,
        setShuffle,
        repeat,
        setRepeat,
        queue,
        setQueue,
      }}
    >

      {children}

      <audio
        ref={audioRef}
        src={currentSong?.audio}

       onPlay={() => setIsPlaying(true)}
       onPause={() => setIsPlaying(false)}

       onEnded={() => {

      if (repeat) {

      audioRef.current.currentTime = 0;
      audioRef.current.play();

    } else {

      nextSong();

    }

  }}

  onTimeUpdate={() => {
    setCurrentTime(audioRef.current.currentTime);
  }}

  onLoadedMetadata={() => {
    setDuration(audioRef.current.duration);
  }}
/>

    </MusicContext.Provider>
  )
}

export default MusicProvider
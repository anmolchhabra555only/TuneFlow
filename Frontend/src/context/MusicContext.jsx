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
  
      setUser(response.data.user);
    } catch (err) {
      setUser(null);
    }
  
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
  
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  
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
  
    setTimeout(() => {
      audioRef.current.play()
    }, 100)
  
    setIsPlaying(true)
  }

  const playSong = async (song, index = 0) => {

    if (songs.length > 0) {

      const upcomingSongs = songs.filter(
        (_, i) => i > index
      );

    console.log("Queue:", upcomingSongs);

    
      setQueue(upcomingSongs);
    
    }

    console.log("Playing Song:", song);

    setCurrentIndex(index)

    if(currentSong?.audio === song.audio){

      if(isPlaying){
        audioRef.current.pause()
        setIsPlaying(false)
      }

      else{
        audioRef.current.play()
        setIsPlaying(true)
      }

    }

    else{

      setCurrentSong(song)
      setCurrentIndex(index)

      setTimeout(() => {
        audioRef.current.play()
      }, 100)

      setIsPlaying(true)

      try {

        await addToRecentlyPlayed(song._id);
      
      } catch (err) {
      
        console.log(err);
      
      }

    }

  }


  return (

    <MusicContext.Provider
      value={{
        audioRef,
        currentSong,
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
        onEnded={() => {

          if (repeat) {
        
            audioRef.current.currentTime = 0;
        
            audioRef.current.play();
        
          } else {
        
            nextSong();
        
          }
        
        }}
        onTimeUpdate={() => {
          setCurrentTime(audioRef.current.currentTime)
        }}
        onLoadedMetadata={() => {
          setDuration(audioRef.current.duration)
        }}
      />

    </MusicContext.Provider>
  )
}

export default MusicProvider
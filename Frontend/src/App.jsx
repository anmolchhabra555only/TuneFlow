import { Routes, Route } from "react-router-dom"
import React from 'react'
import MainLayout from './layouts/MainLayout'
import Login from "./pages/Login"
import UploadMusic from "./pages/UploadMusic"
import MySongs from "./pages/MySongs"
import CreateAlbum from "./pages/CreateAlbum"
import Albums from "./pages/Albums"
import AlbumDetails from "./pages/AlbumDetails"
import Search from "./pages/Search"
import LikedSongs from "./pages/LikedSongs"
import RecentlyPlayed from "./pages/RecentlyPlayed"
import Playlists from "./pages/Playlists"
import PlaylistDetails from "./pages/PlaylistDetails"
import Player from "./components/Player";
import ArtistProfile from "./pages/ArtistProfile"
import UserProfile from "./pages/UserProfile"
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MusicContext } from "./context/MusicContext";

const App = () => {

  const { user, loading } = useContext(MusicContext);
  return (
    <>
      <Routes>
  
        <Route
          path="/"
          element={
          loading
            ? <div>Loading...</div>
            : user
            ? <Navigate to="/home" />
            : <Login />
          }
        />
  
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadMusic />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/my-songs"
          element={
            <ProtectedRoute>
              <MySongs />
            </ProtectedRoute>
           }
        />
  
        <Route
          path="/create-album"
          element={
            <ProtectedRoute>
              <CreateAlbum />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/albums"
          element={
            <ProtectedRoute>
              <Albums />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/albums/:albumId"
          element={
            <ProtectedRoute>
              <AlbumDetails />
            </ProtectedRoute>
           }
        />
  
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/liked-songs"
          element={
            <ProtectedRoute>
              <LikedSongs />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/recently-played"
          element={
            <ProtectedRoute>
              <RecentlyPlayed />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <Playlists />
            </ProtectedRoute>
          }
        />
  
        <Route
          path="/playlists/:playlistId"
          element={
            <ProtectedRoute>
              <PlaylistDetails />
            </ProtectedRoute>
          }
        />

        <Route
         path="/artist/:artistId"
         element={
          <ProtectedRoute>
            <ArtistProfile />
          </ProtectedRoute>
          } 
        />

        <Route 
         path="/profile"
         element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
          }
        />
  
      </Routes>
  
      <Player />
    </>
  )
}

export default App

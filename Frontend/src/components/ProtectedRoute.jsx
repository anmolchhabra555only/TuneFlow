import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(MusicContext);

  console.log("User:", user);
  console.log("Loading:", loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user
    ? children
    : <Navigate to="/" />;
};

export default ProtectedRoute;
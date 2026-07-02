import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(MusicContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user
    ? children
    : <Navigate to="/" />;
};

export default ProtectedRoute;
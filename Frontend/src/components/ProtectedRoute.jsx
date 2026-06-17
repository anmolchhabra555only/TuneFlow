import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  console.log("Cookies:", document.cookie);

  const isLoggedIn = document.cookie.includes("token");

  console.log("isLoggedIn:", isLoggedIn);

  return isLoggedIn
    ? children
    : <Navigate to="/" />;
};

export default ProtectedRoute;
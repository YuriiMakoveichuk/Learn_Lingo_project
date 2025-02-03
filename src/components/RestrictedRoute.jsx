import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/user.auth.js";

export const RestrictedRoute = ({ component, redirectTo = "/" }) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : component;
};

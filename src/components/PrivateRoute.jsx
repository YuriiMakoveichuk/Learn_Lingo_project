import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/user.auth.js";

export const PrivateRoute = ({ component, redirectTo = "/" }) => {
  const { isAuth } = useAuth();

  return isAuth ? component : <Navigate to={redirectTo} />;
};

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const accessToken = Cookies.get("accessToken") || null;

  return accessToken ? children : <Navigate to="/auth/login" replace />;
};

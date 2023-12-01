import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {
  const { logged} = useSelector((state) => state.login);
  return logged ? <Navigate to="/home" /> : children;
};

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken } from "./auth/authSlice";

const RequireAuth = () => {
  // Понять как получить стейт из authSlice
  const token = useSelector(selectCurrentAccessToken());
  const location = useLocation();
  console.log(`Редирект. Токен: ${token}`);

  return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};
export default RequireAuth;

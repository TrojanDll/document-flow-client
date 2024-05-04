import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  // Понять как получить стейт из authSlice
  const token = localStorage.getItem("accessToken");
  console.log(`access из RequireAuth ${token}`);
  const location = useLocation();
  console.log(`Редирект. access: ${token}`);
  console.log(`Редирект. refresh: ${localStorage.getItem("refreshToken")}`);

  return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};
export default RequireAuth;

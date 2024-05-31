import { Navigate, Outlet } from "react-router-dom";

const AdminRoleRequired = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (token && role === "ADMIN") {
    return <Outlet />;
  } else {
    console.log("RequireAuth");
    return token ? <Navigate to="/profile" replace /> : <Outlet />;
  }
};
export default AdminRoleRequired;

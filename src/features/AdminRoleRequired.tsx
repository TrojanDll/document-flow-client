import { Navigate, Outlet } from "react-router-dom";

const AdminRoleRequired = () => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  // const location = useLocation();

  if (token && role === "ADMIN") {
    // Если есть токен, перенаправляем на предыдущую страницу
    // history.back();
    return <Navigate to="/profile" replace />; // Возвращаем null, чтобы компонент ничего не рендерил
  } else {
    console.log("RequireAuth");
    return token ? <Navigate to="/profile" replace /> : <Outlet />;
  }
};
export default AdminRoleRequired;

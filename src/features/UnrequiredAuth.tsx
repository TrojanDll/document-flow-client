import { Outlet, Navigate, useLocation } from "react-router-dom";

const UnrequiredAuth = () => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  console.log("UnrequiredAuth");
  console.log(location.pathname);

  if (token && location.pathname !== "/") {
    // Если есть токен, перенаправляем на предыдущую страницу

    history.back();
    return null; // Возвращаем null, чтобы компонент ничего не рендерил
  } else {
    console.log("RequireAuth");
    return token ? <Navigate to="/" replace /> : <Outlet />;
  }
};
export default UnrequiredAuth;

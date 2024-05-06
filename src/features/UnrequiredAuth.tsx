import { Outlet, Navigate } from "react-router-dom";

const UnrequiredAuth = () => {
  const token = localStorage.getItem("accessToken");
  console.log("UnrequiredAuth");

  if (token) {
    // Если есть токен, перенаправляем на предыдущую страницу
    history.back();
    return null; // Возвращаем null, чтобы компонент ничего не рендерил
  } else {
    console.log("RequireAuth");
    return token ? <Navigate to="/" replace /> : <Outlet />;
  }
};
export default UnrequiredAuth;

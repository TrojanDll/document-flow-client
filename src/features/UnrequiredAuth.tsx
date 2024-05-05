import { useLocation, Outlet } from "react-router-dom";

const UnrequiredAuth = () => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  if (token) {
    // Если есть токен, перенаправляем на предыдущую страницу
    history.back();
    return null; // Возвращаем null, чтобы компонент ничего не рендерил
  } else {
    return <Outlet />;
  }
};
export default UnrequiredAuth;

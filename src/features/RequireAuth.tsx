import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = localStorage.getItem("accessToken");
  const location = useLocation();
  // const { data: currientUser, isSuccess } = useGetCurrientUserQuery();
  // useEffect(() => {
  //   if (isSuccess && currientUser) {
  //     localStorage.setItem("currientUserId", currientUser.id.toString());
  //     console.log(localStorage.getItem("currientUserId"));
  //   }
  // }, []);

  return token ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};
export default RequireAuth;

import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";

const LoginPage: FC = () => {
  return (
    <div>
      <Link to="/documents">documents</Link>
      <Outlet />
    </div>
  );
};

export default LoginPage;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "./../../utils/path";
const UserLayout = () => {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  if (!isLoggedIn || !current)
    return <Navigate to={`${path.LOGIN}`} replace={true} />;
  return (
    <div>
      UserLayout
      <Outlet />
    </div>
  );
};

export default UserLayout;

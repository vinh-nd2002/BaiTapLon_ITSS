import React from "react";

import { Navigation, TopHeader } from "../../components";
import { Outlet } from "react-router-dom";
const UserLayout = () => {

  return (
    <div className="w-full flex flex-col items-center ">
      <TopHeader />
      <Navigation />
      <div className="w-main">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

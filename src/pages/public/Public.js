import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navigation, TopHeader } from "./../../components";
const Public = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full flex flex-col items-center ">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;

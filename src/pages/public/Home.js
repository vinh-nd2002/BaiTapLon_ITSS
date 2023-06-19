import React from "react";
import { Banner, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 flex-auto w-[30%] border">
        <Sidebar />
        <span>Deal Daily</span>
      </div>

      <div className="flex flex-col gap-5 pl-5 flex-auto border w-[70%]">
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Banner, BestSeller, Sidebar } from "../../components";

const Home = () => {
  return (
    <div>
      <div className="w-main flex mb-10">
        <div className="flex flex-col gap-5 flex-auto w-[20%] ">
          <Sidebar />
        </div>

        <div className="flex flex-col gap-5 pl-5 flex-auto  w-[80%]">
          <Banner />
        </div>
      </div>
      <BestSeller />
    </div>
  );
};

export default Home;

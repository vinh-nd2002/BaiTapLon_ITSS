import React from "react";
import {
  Banner,
  BestSeller,
  FlashSale,
  Services,
  ShopMall,
  Sidebar,
} from "../../components";

const Home = () => {
  return (
    <div className="w-main flex flex-col mt-6">
      <div className="w-main flex mb-10">
        <div className="flex flex-col gap-5 flex-auto w-[20%] ">
          <Sidebar />
        </div>
        <div className="flex flex-col gap-5 pl-5 flex-auto  w-[80%]">
          <Banner />
        </div>
      </div>
      <div>
        <FlashSale />
        <BestSeller />
        <ShopMall />
        <Services />
      </div>
    </div>
  );
};

export default Home;

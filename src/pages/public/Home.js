import React from "react";
import {
  Banner,
  BestSeller,
  FeatureProduct,
  FlashSale,
  Services,
  ShopMall,
  Sidebar,
} from "../../components";

const Home = () => {
  return (
    <div className="mb-[100px]">
      <div className="w-main flex mb-10">
        <div className="flex flex-col gap-5 flex-auto w-[20%] ">
          <Sidebar />
        </div>

        <div className="flex flex-col gap-5 pl-5 flex-auto  w-[80%]">
          <Banner />
        </div>
      </div>
      <FlashSale />
      <BestSeller />
      <FeatureProduct />
      <ShopMall />
      <Services />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { getShopsTop } from "../apis/shop";
import ShopItem from "./ShopItem";

const ShopMall = () => {
  const [shopsMall, setShopsMall] = useState(null);
  const fetchShopsMall = async () => {
    const response = await getShopsTop();
    if (response.success) {
      setShopsMall(response.data);
    }
  };

  useEffect(() => {
    fetchShopsMall();
  }, []);

  return (
    <div className="w-full mb-[15px]">
      <div className="border-main border-b-2 ">
        <h3
          className="flex justify-center items-center font-medium capitalize w-[200px] text-center p-5 cursor-pointer   border-t-[1px] bg-main text-white 
            "
        >
          Shop Mall
        </h3>
      </div>
      <div className="flex flex-wrap mt-[15px] mx-[15x]">
        {shopsMall &&
          shopsMall.map((shop) => <ShopItem shop={shop} key={shop.id} />)}
      </div>
    </div>
  );
};

export default ShopMall;

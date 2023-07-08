import React from "react";

const ShopItem = ({ shop }) => {
  const { phone_number, shop_name, shop_logo, address } = shop;


  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="flex items-center border w-full">
        <img
          src={
            shop_logo ||
            "https://thumbs.dreamstime.com/b/lets-shopping-logo-design-template-cart-icon-designs-134743663.jpg"
          }
          alt={shop_name}
          className="w-[90px] object-contain p-4"
        />
        <div className="flex flex-col items-start px-[15px] gap-2 ">
          <span className="line-clamp-1 text-sm">{shop_name}</span>
          <span className="text-xs text-main">{address}</span>
          <span className="text-[10px] ">{phone_number}</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ShopItem;

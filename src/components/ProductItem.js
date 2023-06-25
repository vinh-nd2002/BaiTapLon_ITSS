import React from "react";
import { formatMoney, renderStarFromNumber } from "../utils/helpers";

const ProductItem = ({ title, totalRatings, price, thumb }) => {
  return (
    <div className="w-1/3 flex-auto px-[10px] mb-[20px]">
      <div className="flex items-center border w-full">
        <img src={thumb} alt={title} className="w-[90px] object-contain p-4" />
        <div className="flex flex-col items-start px-[15px] ">
          <span className="line-clamp-1 text-sm">{title}</span>
          <span className="text-xs text-main">${formatMoney(price)}</span>
          <span className="flex text-[10px] ">
            {renderStarFromNumber(totalRatings)}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductItem;

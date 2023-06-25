import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "./../utils/helpers";
import bestSellerLabel from "./../assets/best-seller.png";
import newLabel from "./../assets/new.png";
import flashSaleLabel from "./../assets/flash_sale.png";
import SelectOption from "./SelectOption";

import icons from "./../utils/icons";

const { BsFillHandbagFill, AiFillEye } = icons;

const ProductCard = ({ product, labelTab, flashSale }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="w-full px-[10px] mb-[10px]">
      <div
        className="border border-gray-400 w-full py-[5px] "
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShow(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShow(false);
        }}
      >
        <div className="relative w-full ">
          {isShow && (
            <div className=" absolute bottom-0 right-0 left-0 flex justify-center items-center gap-4 animate-slide-top ">
              <SelectOption icon={<BsFillHandbagFill />} />
              <SelectOption icon={<AiFillEye />} />
            </div>
          )}

          <img
            src={
              product?.thumb ||
              "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
            }
            alt={product.title}
            className="h-[200px] object-contain"
          />
          <img
            src={
              flashSale ? flashSaleLabel : labelTab ? bestSellerLabel : newLabel
            }
            alt="new"
            className={`absolute object-cover top-[-5px] ${
              flashSale
                ? "w-[60px] "
                : labelTab
                ? "left-[-10px] w-[70px]"
                : "left-0 w-[40px] top-0 "
            }`}
          />
        </div>
        <div className="flex flex-col items-start px-[15px] ">
          <span className="line-clamp-1 text-[10px]">{product?.title}</span>
          <span className="text-xs text-main">
            {" "}
            ${formatMoney(product?.price)}
          </span>
          <span className="flex text-[10px] ">
            {renderStarFromNumber(product?.totalRatings)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

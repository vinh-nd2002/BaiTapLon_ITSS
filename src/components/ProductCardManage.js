import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "./../utils/helpers";
import SelectOption from "./SelectOption";

import icons from "./../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "../utils/path";
import Swal from "sweetalert2";
import { apiDeleteProductById } from "../apis";

const { BsFillTrashFill, AiFillEdit } = icons;

const ProductCardManage = ({ product, dispatch, setProducts }) => {
  const [isShow, setIsShow] = useState(false);
  const handleClickOption = async (e, product) => {
    e.preventDefault();
    const response = await apiDeleteProductById(product.id);
    if (response.success) {
      setProducts((prev) => prev.id !== product.id);
      Swal.fire("Thông báo!", "Đã xóa thành công", "success");
    } else{
      Swal.fire("Toang!", "Đã có lỗi xảy ra", "error");
    }
  };

  return (
    <div
      className="w-full my-4 p-2 h-[300px]"
      onMouseEnter={(e) => {
        e.stopPropagation();
        setIsShow(true);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        setIsShow(false);
      }}
    >
      {product && (
        <div className="border border-gray-400 w-full py-[5px] h-full flex flex-col">
          <div className="relative w-full h-3/4">
            {isShow && (
              <div className=" absolute bottom-0 right-0 left-0 flex justify-center items-center gap-4 animate-slide-top ">
                <SelectOption
                  icon={<BsFillTrashFill />}
                  handleClickOption={handleClickOption}
                  product={product}
                />
                <SelectOption
                  icon={<AiFillEdit />}
                  handleClickOption={() => {}}
                />
              </div>
            )}

            <img
              src={
                product.thumbnail ||
                "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
              }
              alt={product.name}
              className="object-contain h-3/4 flex justify-center items-center"
            />
          </div>
          <div className="flex flex-col gap-2 px-[15px] h-1/4 flex-1">
            <span className="line-clamp-1 text-[10px]">{product.name}</span>
            <span className="text-xs text-main">
              {formatMoney(product.price)} VND
            </span>
            {renderStarFromNumber(product.totalRatings, 10)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardManage;

import React, { memo } from "react";
import icons from "./../utils/icons";
const SelectQuantity = ({ quantity, handleQuantity, handleChangeQuantity }) => {
  const { AiOutlinePlus, AiOutlineMinus } = icons;

  return (
    <div className="flex items-center">
      <span
        className="p-2 border-r border-gray-600 cursor-pointer"
        onClick={() => handleChangeQuantity("minus")}
      >
        <AiOutlineMinus />
      </span>
      <input
        type="text"
        value={quantity}
        className="outline-none py-2 w-[60px] text-center"
        onChange={(e) => handleQuantity(e.target.value)}
      />
      <span
        className="p-2 border-l  border-gray-600 cursor-pointer"
        onClick={() => handleChangeQuantity("plus")}
      >
        <AiOutlinePlus />
      </span>
    </div>
  );
};

export default memo(SelectQuantity);

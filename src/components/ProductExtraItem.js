import React, { memo } from "react";

const ProductExtraItem = ({ icon, title, sub }) => {
  return (
    <div className="flex items-center justify-start gap-6 my-4">
      <span className="flex justify-center items-center w-[40px] h-[40px] bg-main rounded-full">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="font-semibold text-main">{title}</span>
        <span className="text-gray-500 text-xs">{sub}</span>
      </div>
    </div>
  );
};

export default memo(ProductExtraItem);

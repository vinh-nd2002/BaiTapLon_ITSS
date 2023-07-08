import React, { useState } from "react";
import { productTabs } from "../utils/contants";

const ProductInformation = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-2">
        {productTabs.map((ele) => (
          <span
            className={` py-2 px-4 cursor-pointer ${
              activeTab === ele.id
                ? "bg-white border border-gray-300"
                : "bg-gray-400"
            }`}
            key={ele.id}
            onClick={() => setActiveTab(ele.id)}
          >
            {ele.name}
          </span>
        ))}
      </div>
      <div className="w-full h-[300px] mt-[-1px] border-t border-gray-300">
        <span className="text-xl">
          {productTabs.find((ele) => ele.id === activeTab).name}
        </span>
      </div>
    </div>
  );
};

export default ProductInformation;

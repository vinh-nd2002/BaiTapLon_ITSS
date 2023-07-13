import React, { useEffect, useState } from "react";
import { getProducts } from "../apis/product";

import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
};

const tabs = [
  { id: 1, name: "Bán chạy" },
  { id: 2, name: "Hàng hot" },
];

const BestSeller = () => {
  const { bestSellers, lastTests } = useSelector((state) => state.product);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {}, [activeTab]);

  const renderProducts = () => {
    if (activeTab === 1) {
      return (
        bestSellers &&
        bestSellers.map((ele) => (
          <ProductCard
            key={ele.id}
            product={ele}
            labelTab={activeTab === 1 ? true : false}
          />
        ))
      );
    } else {
      return (
        lastTests &&
        lastTests.map((ele) => (
          <ProductCard
            key={ele.id}
            product={ele}
            labelTab={activeTab === 1 ? true : false}
          />
        ))
      );
    }
  };

  return (
    <div className="mt-5 mb-10">
      <div className="flex text-base border-main border-b-2 mb-3 ">
        {tabs.map((ele) => (
          <h3
            key={ele.id}
            className={`font-medium capitalize w-[200px] text-center p-5 cursor-pointer border-gray-400 border-x-[1px] border-t-[1px] ${
              activeTab === ele.id
                ? "bg-main text-white border-none"
                : "text-gray-400 hover:text-main"
            }
              ${ele.id === tabs.length ? "" : "border-r"}
            `}
            onClick={() => setActiveTab(ele.id)}
          >
            {ele.name}
          </h3>
        ))}
      </div>
      <div>
        <Slider {...settings}>{renderProducts()}</Slider>
      </div>
    </div>
  );
};

export default BestSeller;

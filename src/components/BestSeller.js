import React, { useEffect, useState } from "react";
import { getProducts } from "../apis/product";

import Slider from "react-slick";
import ProductCard from "./ProductCard";
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
};

const tabs = [
  { id: 1, name: "Best seller" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activeTab, setActiveTab] = useState(1);

  const fetchProducts = async () => {
    const [bestSellers, newProducts] = await Promise.all([
      getProducts({ sort: "-sold" }),
      getProducts({ sort: "-createdAt" }),
    ]);
    if (bestSellers.success) setBestSellers(bestSellers);
    if (newProducts.success) setNewProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex text-base gap-8 border-main border-b-2">
        {tabs.map((ele) => (
          <span
            key={ele.id}
            className={`font-medium capitalize border-r p-5 cursor-pointer ${
              activeTab === ele.id
                ? "text-black"
                : "text-gray-500 hover:text-black"
            }`}
            onClick={() => setActiveTab(ele.id)}
          >
            {ele.name}
          </span>
        ))}
      </div>
      <Slider {...settings}>
        {bestSellers &&
          bestSellers.data.map((ele) => (
            <ProductCard key={ele._id} product={ele} />
          ))}
      </Slider>
    </div>
  );
};

export default BestSeller;

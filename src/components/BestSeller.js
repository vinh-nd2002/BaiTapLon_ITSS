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
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
};

const tabs = [
  { id: 1, name: "Best seller" },
  { id: 2, name: "new arrivals" },
];

const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [products, setProducts] = useState(null);

  const fetchProducts = async () => {
    const [bestSellers, newProducts] = await Promise.all([
      getProducts({ sort: "-sold" }),
      getProducts({ sort: "-createdAt" }),
    ]);
    if (bestSellers.success) {
      setBestSellers(bestSellers);
      setProducts(bestSellers);
    }
    if (newProducts.success) setNewProducts(newProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 1) {
      setProducts(bestSellers);
    }
    if (activeTab === 2) {
      setProducts(newProducts);
    }
  }, [activeTab]);

  return (
    <div className="mt-5 mb-10">
      <div className="flex text-base border-main border-b-2 mb-3 ">
        {tabs.map((ele) => (
          <span
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
          </span>
        ))}
      </div>
      <div>
        <Slider {...settings}>
          {products &&
            products.data.map((ele) => (
              <ProductCard
                key={ele._id}
                product={ele}
                labelTab={activeTab === 1 ? true : false}
                // labelIcon={activeTab === 1 ? bestSellerLabel : newLabel}
              />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default BestSeller;

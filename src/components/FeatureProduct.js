import React, { useEffect, useState } from "react";
import { getProducts } from "../apis";
import ProductItem from "./ProductItem";

const FeatureProduct = () => {
  const [featureProducts, setFeatureProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await getProducts({
      limit: 9,
      "totalRatings[gte]": 4,
      sort: "-totalRatings",
    });

    if (response.success) {
      setFeatureProducts(response.data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="w-full mb-[15px]">
      <div className="border-main border-b-2 ">
        <h3
          className="flex justify-center items-center font-medium capitalize w-[200px] text-center p-5 cursor-pointer   border-t-[1px] bg-main text-white 
            "
        >
          Feature Products
        </h3>
      </div>
      <div className="flex flex-wrap mt-[15px] mx-[15x]">
        {featureProducts?.map((ele) => (
          <ProductItem
            key={ele._id}
            title={ele.title}
            price={ele.price}
            thumb={ele.thumb}
            totalRatings={ele.totalRatings}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;

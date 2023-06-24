import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="w-1/3 ">
      <img
        src={
          product?.images[0] ||
          "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/g/t/gtt_7766_3__1.jpg"
        }
        alt={product.title}
        className="w-full object-contain"
      />
    </div>
  );
};

export default ProductCard;

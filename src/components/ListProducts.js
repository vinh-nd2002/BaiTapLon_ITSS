import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

const ListProducts = ({ products, slidesToShow, slidesToScroll, rows }) => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 6,
    slidesToScroll: slidesToScroll || 2,
    autoplay: true,
    autoplaySpeed: 3000,
    rows: rows || 1,
    cssEase: "linear",
  };
  return (
    <div>
      <div>
        <Slider {...settings}>
          {products &&
            products?.map((ele) => <ProductCard key={ele._id} product={ele} />)}
        </Slider>
      </div>
    </div>
  );
};

export default ListProducts;

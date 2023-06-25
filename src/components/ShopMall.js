import React from "react";
import Slider from "react-slick";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  rows: 3,
  arrows: false,
};

const ShopMall = () => {
  return (
    <div>
      <div className=" items-center border-main border-b-2 mb-4">
        <h3
          className="flex justify-center items-center font-medium capitalize w-[200px] text-center p-5 cursor-pointer   border-t-[1px] bg-main text-white 
            "
        >
          Shop Mall
        </h3>
      </div>
      <div>{/* <Slider {...settings}></Slider> */}</div>
    </div>
  );
};

export default ShopMall;

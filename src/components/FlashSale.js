import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { getProducts } from "../apis/product";
import CountDown from "./CountDown";
import moment from "moment";
import { secondsToHms } from "../utils/helpers";

var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  rows: 2,
  arrows: false,
};

let idInterval;

const FlashSale = () => {
  const [products, setProducts] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [expiry, setExpiry] = useState(false);
  const fetchProducts = async () => {
    const response = await getProducts();
    if (response.success) {
      setProducts(response);

      const today = `${moment().format("MM/DD/YYYY")} 00:00:00`;

      const s =
        new Date(today).getTime() - new Date().getTime() + 24 * 60 * 60 * 1000;

      const number = secondsToHms(s);
      setHours(number.h);
      setMinutes(number.m);
      setSeconds(number.s);
    } else {
      setHours(0);
      setMinutes(5);
      setSeconds(0);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    idInterval = setInterval(() => {
      if (seconds > 0) setSeconds((prev) => prev - 1);
      else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours((prev) => prev - 1);
            setMinutes(59);
          } else {
            setExpiry(!expiry);
          }
        }
      }
    }, 1000);
    return () => clearInterval(idInterval);
  }, [seconds, minutes, hours]);

  useEffect(() => {
    expiry && clearInterval(idInterval);
    fetchProducts();
  }, [expiry]);

  return (
    <div>
      <div className=" items-center border-main border-b-2 mb-4">
        <div className=" flex justify-start items-center gap-2 ">
          <span
            className="flex justify-center items-center font-medium capitalize w-[200px] text-center p-5 cursor-pointer   border-t-[1px] bg-main text-white 
            "
          >
            Flash Sale
          </span>
          <div className="flex gap-1">
            <CountDown unit={"Hours"} number={hours} />
            <CountDown unit={"Minutes"} number={minutes} />
            <CountDown unit={"Seconds"} number={seconds} />
          </div>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          {products &&
            products.data.map((ele) => (
              <ProductCard key={ele._id} product={ele} flashSale={true} />
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default FlashSale;

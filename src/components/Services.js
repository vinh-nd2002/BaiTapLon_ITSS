import React from "react";
import visa from "./../assets/visa.png";
import bocongthuong from "./../assets/bocongthuong.jpg";
import ghn from "./../assets/ghn.png";
import jt from "./../assets/j&t.png";
import masterCard from "./../assets/mastercard.png";
import momo from "./../assets/momo.png";
import ninja from "./../assets/ninja.png";
import zaloPay from "./../assets/zalopay.png";
import viettelPay from "./../assets/viettelpay.png";
import paypal from "./../assets/paypal.png";
import viettelpost from "./../assets/viettelpost.png";
import ahamove from "./../assets/ahamove.png";

const Services = () => {
  return (
    <div className="flex border-t-2 border-main mb-4">
      <div className="flex-col flex-wrap flex-2">
        <h4 className="text-gray-600 mb-5 mt-3">Phương thức thanh toán</h4>
        <div className="flex  gap-x-6 ">
          <img src={visa} alt="visa" className="w-[60px] object-contain" />
          <img
            src={masterCard}
            alt="masterCard"
            className="w-[60px] object-contain"
          />
          <img src={momo} alt="momo" className="w-[60px] object-contain" />
          <img
            src={zaloPay}
            alt="zaloPay"
            className="w-[60px] object-contain"
          />
          <img
            src={viettelPay}
            alt="viettelPay"
            className="w-[60px] object-contain"
          />
          <img src={paypal} alt="paypal" className="w-[60px] object-contain" />
        </div>
      </div>

      <div className="flex-col flex-1 ">
        <h4 className="text-gray-600 mb-5 mt-3">Dịch vụ giao hàng</h4>
        <div className="flex gap-4 flex-wrap">
          <img src={ghn} alt="ghn" className="w-[60px] object-contain" />
          <img src={ninja} alt="ninja" className="w-[60px] object-contain" />
          <img src={jt} alt="jt" className="w-[60px] object-contain" />
          <img
            src={viettelpost}
            alt="viettelpost"
            className="w-[60px] object-contain"
          />
          <img
            src={ahamove}
            alt="ahamove"
            className="w-[60px] object-contain"
          />
        </div>
      </div>
      <div className="flex-col flex-1">
        <h4 className="text-gray-600 mb-5 mt-3 ml-6">Đã được kiểm chứng</h4>
        <img
          src={bocongthuong}
          alt="bocongthuong"
          className="w-[150px] object-contain"
        />
      </div>
    </div>
  );
};

export default Services;

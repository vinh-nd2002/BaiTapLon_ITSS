import React, { memo } from "react";
import icons from "./../utils/icons";

const { MdEmail, ImLocation, RiPhoneFill } = icons;
const Footer = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-col">
        <div className="bg-main w-full h-[110px] flex items-center justify-center ">
          <div className="w-main flex justify-between items-center">
            <div className="flex flex-col flex-1">
              <h4 className="text-white font-bold text-[20px]">
                SIGN UP TO NEWSLETTER
              </h4>
              <h6 className="text-gray-300">
                Subscribe now and receive weekly newsletter
              </h6>
            </div>
            <div className="flex-1 flex items-center justify-between">
              <input
                type="text"
                placeholder="Email address"
                className="pl-5 py-4 rounded-l-full bg-[#F04646] outline-none w-full text-gray-100 placeholder:text-sm placeholder:text-gray-200
              placeholder:italic
              placeholder:opacity-60"
              />
              <div className="h-[56px] w-[56px] text-white text-2xl flex justify-center items-center bg-[#F04646] rounded-r-full">
                <MdEmail />
              </div>
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full flex items-center justify-center bg-[#191919] text-white">
          <div className="w-main flex ">
            <div className="flex-2 flex flex-col">
              <h3 className="mb-[20px] text-[15px]  border-main border-l-2 px-5 font-medium">
                About Us
              </h3>
              <span className="flex items-center justify-start gap-4 mt-1 text-sm">
                <span className=" gap-2 flex items-center justify-between">
                  <ImLocation size={20} />
                  Address:
                </span>
                <span className="text-xs text-gray-400">
                  Số 1, Đại Cồ Việt, Hai Bà Trưng
                </span>
              </span>
              <span className="flex items-center justify-start gap-4 mt-1 text-sm">
                <span className="gap-2  flex items-center justify-between">
                  <RiPhoneFill size={20} />
                  Phone:
                </span>

                <span className="text-xs text-gray-400">(+1234)56789xxx</span>
              </span>
              <span className="flex items-center justify-start gap-4 mt-1 text-sm">
                <span className="gap-2  flex items-center justify-between">
                  <MdEmail size={20} />
                  Mail:
                </span>
                <span className="text-xs text-gray-400">
                  nhom10_ITSS_VN@gmail.com
                </span>
              </span>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="mb-[20px] text-[15px]  border-main border-l-2 px-5 font-medium">
                Information
              </h3>
              <span className="text-xs text-gray-400">Typography</span>
              <span className="text-xs text-gray-400">Gallery</span>
              <span className="text-xs text-gray-400">Store Location</span>
              <span className="text-xs text-gray-400">Today's Deals</span>
              <span className="text-xs text-gray-400">Contact</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="mb-[20px] text-[15px]  border-main border-l-2 px-5 font-medium">
                Who We Are
              </h3>
              <span className="text-xs text-gray-400">Help</span>
              <span className="text-xs text-gray-400">Free Shipping</span>
              <span className="text-xs text-gray-400">FAQs</span>
              <span className="text-xs text-gray-400">Return & Exchange</span>
              <span className="text-xs text-gray-400">Testimonials</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="mb-[20px] text-[15px]  border-main border-l-2 px-5 font-medium">
                #SOPPINGU
                <div> </div>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);

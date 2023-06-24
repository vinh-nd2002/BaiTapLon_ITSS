import React from "react";
import icons from "./../utils/icons";
import { Link } from "react-router-dom";
import path from "./../utils/path";
const Header = () => {
  const { RiPhoneFill, AiOutlineMail, BsFillHandbagFill, FaUserCircle } = icons;
  return (
    <div className="w-main h-[110px] py-[35px] flex justify-between">
      {/* <img src="" alt="logo" className="object-contain" /> */}
      <Link to={`/${path.HOME}`}>
        <div>Ecomemerce</div>
      </Link>

      <div className="flex text-[13px]">
        <div className="flex flex-col px-6 border-r">
          <span className="flex gap-2 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-2 items-center">
            <AiOutlineMail color="red" />
            <span className="font-semibold">nhom10_ITSS_VN@gmail.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6 border-r">
          <BsFillHandbagFill color="red" />
          <span>0 items</span>
        </div>
        <div className="flex items-center justify-center px-6 ">
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;

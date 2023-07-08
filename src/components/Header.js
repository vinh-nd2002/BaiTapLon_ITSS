import React from "react";
import icons from "./../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "./../utils/path";
import logo from "./../assets/logo.png";
const Header = () => {
  const navigate = useNavigate();
  const { RiPhoneFill, MdEmail, BsFillHandbagFill, FaUserCircle } = icons;
  return (
    <div className="w-main h-[110px] py-[35px] flex justify-between">
      <div className="flex items-center">
        <Link to={`/${path.HOME}`}>
          <img src={logo} alt="logo" className="object-contain h-[80px]" />
        </Link>
      </div>

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
            <MdEmail color="red" />
            <span className="font-semibold">nhom10_ITSS_VN@gmail.com</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <div
          className="flex items-center justify-center gap-2 px-6 border-r cursor-pointer"
          onClick={() => navigate(`${path.CART}`)}
        >
          <span>0 items</span>
          <BsFillHandbagFill color="red" />
        </div>

        <div className="flex items-center justify-center px-6 cursor-pointer gap-2 text-main">
          <FaUserCircle size={24} />
          <span className="font-semibold">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

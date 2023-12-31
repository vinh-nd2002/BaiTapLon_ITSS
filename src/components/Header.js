import React from "react";
import icons from "./../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "./../utils/path";
import logo from "./../assets/logo.png";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const { RiPhoneFill, MdEmail, BsFillHandbagFill, FaUserCircle } = icons;

  const { isLoggedIn, role } = useSelector((state) => state.user);

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
          <span>T2 - T6 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-center px-6 border-r">
          <span className="flex gap-2 items-center">
            <MdEmail color="red" />
            <span className="font-semibold">nhom10_ITSS_VN@gmail.com</span>
          </span>
          <span>Hỗ trợ online 24/7</span>
        </div>

        <div
          className="flex items-center justify-center gap-2 px-6 border-r cursor-pointer"
          onClick={() => navigate(`${path.CART}`)}
        >
          <span>Giỏ hàng</span>
          <BsFillHandbagFill color="red" />
        </div>

        {isLoggedIn && (
          <Link
            className="flex items-center justify-center px-6 cursor-pointer gap-2 text-main "
            to={
              isLoggedIn && +role === 3
                ? `/${path.USER}/${path.PROFILE}`
                : `/${path.HOME}`
            }
          >
            <FaUserCircle size={24} />
            <span className="font-semibold">Cá nhân</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;

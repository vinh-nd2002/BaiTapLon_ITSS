import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";

const TopHeader = () => {
  return (
    <div className="h-[40px] bg-main w-full flex justify-center items-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        <Link to={`/${path.LOGIN}`} className="hover:text-black duration-300">
          Sign In or Create Account
        </Link>
      </div>
    </div>
  );
};

export default memo(TopHeader);

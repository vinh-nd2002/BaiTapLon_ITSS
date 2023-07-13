import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { useDispatch, useSelector } from "react-redux";
import icons from "./../utils/icons";
import { logout } from "../stores/users/userSlice";
import { getCurrent } from "../stores/users/userAction";
import { clearCart } from "../stores/cart/cartSlice";

const TopHeader = () => {
  const { FiLogOut } = icons;
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrent());
    }
  }, [dispatch]);

  return (
    <div className="h-[40px] bg-main w-full flex justify-center items-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>MUA HÀNG ONLINE hoặc GỌI ĐẾN (+1800) 000 8808</span>
        {!isLoggedIn ? (
          <Link to={`/${path.LOGIN}`} className="hover:text-black duration-300">
            Đăng nhập hoặc đăng ký mới
          </Link>
        ) : (
          <div className="flex gap-2 items-center text-white">
            <span>Xin chào, {current?.username}</span>
            <FiLogOut
              size={16}
              className="cursor-pointer"
              onClick={() => {
                dispatch(logout());
                dispatch(clearCart({ data: [] }));
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);

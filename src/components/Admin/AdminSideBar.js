import React, { Fragment, memo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "./../../assets/logo.png";
import { adminSideBar } from "../../utils/contants";
import clsx from "clsx";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import path from "../../utils/path";
import { logout } from "../../stores/users/userSlice";

const activeStyle = "px-4 py-2 flex items-center gap-2 font-bold bg-gray-400";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 font-bold hover:bg-gray-400";

const AdminSideBar = () => {
  const [active, setActive] = useState([]);

  const dispatch = useDispatch();
  const handleShowTab = (tabId) => {
    if (active.some((ele) => ele === tabId)) {
      setActive((prev) => prev.filter((el) => el !== tabId));
    } else {
      setActive((prev) => [...prev, tabId]);
    }
  };
  return (
    <div className="h-full py-4">
      <div className="flex flex-col justify-center gap-2 items-center ">
        <img src={logo} alt="logo" className="object-contain w-[150px]" />
        <small className="text-white font-bold">Admin workspace</small>
      </div>
      <div>
        {adminSideBar.map((ele) => (
          <Fragment key={ele.id}>
            {ele.type === "SINGLE" && (
              <NavLink
                className={({ isActive }) =>
                  clsx(isActive && activeStyle, !isActive && notActiveStyle)
                }
                onClick={() => {
                  if (ele.text === "Đăng xuất") {
                    dispatch(logout());
                  }
                }}
                to={ele.path}
              >
                <span>{ele.icon}</span>
                <span> {ele.text}</span>
              </NavLink>
            )}
            {ele.type === "PARENT" && (
              <div
                className="flex flex-col font-bold"
                onClick={() => handleShowTab(+ele.id)}
              >
                <div className="flex items-center gap-2 hover:bg-gray-400 cursor-pointer justify-between px-4 py-2 ">
                  <div className="flex items-center gap-2">
                    <span>{ele.icon}</span>
                    <span> {ele.text}</span>
                  </div>
                  {active.some((id) => id === ele.id) ? (
                    <AiFillCaretDown />
                  ) : (
                    <AiFillCaretRight />
                  )}
                </div>
                {active.some((id) => +id === +ele.id) && (
                  <div className="flex flex-col ">
                    {ele.submenu.map((item) => (
                      <NavLink
                        to={ele.path}
                        key={item.text}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activeStyle,
                            !isActive && notActiveStyle,
                            "pl-10"
                          )
                        }
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span> {item.text}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSideBar);

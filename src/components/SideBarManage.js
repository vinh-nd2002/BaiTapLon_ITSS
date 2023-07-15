import React, { Fragment, memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import logo from "./../assets/logo.png";
import { adminSideBar, shopSideBar } from "../utils/contants";
import { logout } from "../stores/users/userSlice";

const activeStyle = "px-4 py-2 flex items-center gap-2 font-bold bg-gray-400";
const notActiveStyle =
  "px-4 py-2 flex items-center gap-2 font-bold hover:bg-gray-400";

const SideBarManage = () => {
  const { role } = useSelector((state) => state.user);
  const [active, setActive] = useState([]);
  const sidebar = role === 1 ? adminSideBar : shopSideBar;

  const dispatch = useDispatch();
  const handleShowTab = (tabId) => {
    if (active.some((ele) => ele === tabId)) {
      setActive((prev) => prev.filter((el) => el !== tabId));
    } else {
      setActive((prev) => [...prev, tabId]);
    }
  };
  const renderSideBar = () => {
    return (
      <div>
        {sidebar.map((ele) => (
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
                        to={item.path}
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
    );
  };

  return (
    <div className="h-full py-4">
      <div className="flex flex-col justify-center gap-2 items-center ">
        <img src={logo} alt="logo" className="object-contain w-[150px]" />
        {role === 1 ? (
          <small className="text-white font-bold">Admin workspace</small>
        ) : (
          <small className="text-white font-bold">Shop workspace</small>
        )}
      </div>
      {renderSideBar()}
    </div>
  );
};

export default memo(SideBarManage);

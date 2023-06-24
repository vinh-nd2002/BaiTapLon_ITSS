import React from "react";
import { navigation } from "./../utils/contants";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-main h-[48px] py-2 border-y  mb-6 flex items-center">
      {navigation.map((ele) => (
        <NavLink
          to={ele.path}
          key={ele.id}
          className={(isActive) =>
            isActive ? "pl-4 pr-10 hover:text-main" : "pr-10"
          }
        >
          {ele.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;

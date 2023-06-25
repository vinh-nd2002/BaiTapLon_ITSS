import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="flex flex-col border border-gray-300">
      {categories?.map((category) => (
        <NavLink
          to={category.slug}
          key={category.slug}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 py-4 text-sm "
              : "px-5 text-sm  py-4 hover:bg-main hover:text-white duration-200"
          }
        >
          {category.title}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

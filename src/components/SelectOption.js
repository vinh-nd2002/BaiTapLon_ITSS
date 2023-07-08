import React from "react";

const SelectOption = ({ icon, handleClickOption, title, product }) => {
  return (
    <div
      className="w-10 h-10 bg-white rounded-full border-main border-[1px] shadow-md flex text-main justify-center items-center cursor-pointer hover:bg-main hover:text-white duration-300 "
      title={title}
      onClick={(e) => handleClickOption(e, product)}
    >
      {icon}
    </div>
  );
};

export default SelectOption;

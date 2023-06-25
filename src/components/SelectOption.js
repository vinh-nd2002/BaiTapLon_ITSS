import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="w-10 h-10 bg-white rounded-full border-gray-800 border-[1px] shadow-md flex justify-center items-center cursor-pointer hover:bg-gray-800 hover:text-white duration-300">
      {icon}
    </div>
  );
};

export default SelectOption;

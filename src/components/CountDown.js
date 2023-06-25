import React, { memo } from "react";

const CountDown = ({ unit, number }) => {
  return (
    <div className="flex justify-center items-center gap-1">
      <div className="w-[30px] h-[40px] bg-main border flex justify-center items-center text-white rounded-md font-bold">
        <span className="">
          {number < 10 ? "0" : ""}
          {number}
        </span>
      </div>
      <span className="font-bold text-gray-400">
        {unit === "Seconds" ? "" : ":"}
      </span>
    </div>
  );
};

export default memo(CountDown);

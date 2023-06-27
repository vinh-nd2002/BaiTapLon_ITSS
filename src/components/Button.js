import React from "react";

const Button = ({
  title,
  handleOnClick,
  className,
  iconsBefore,
  iconsAfter,
}) => {
  return (
    <button
      type="button"
      className={
        className
          ? className
          : "p-4 rounded-md text-white bg-main font-semibold"
      }
      onClick={() => handleOnClick && handleOnClick()}
    >
      {iconsBefore}
      <span>{title}</span>
      {iconsAfter}
    </button>
  );
};

export default Button;

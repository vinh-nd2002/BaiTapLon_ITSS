import React, { memo } from "react";

const Select = ({
  label,
  disable,
  register,
  errors,
  id,
  validate,
  placeholder,
  className,
  options = [],
}) => {
  return (
    <div className="flex flex-col justify-center flex-auto">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        {...register(id, validate)}
        disabled={disable}
        placeholder={placeholder}
        className={className}
      >
        <option value="">--Lựa chọn--</option>
        {options.map((ele) => (
          <option key={ele.code} value={ele.code}>
            {ele.value}
          </option>
        ))}
      </select>
      {errors["category_id"] && (
        <small className="text-main text-xs">
          {errors["category_id"]?.message}
        </small>
      )}
    </div>
  );
};

export default memo(Select);

import React, { memo } from "react";

const InputForm = ({
  label,
  disable,
  register,
  errors,
  id,
  validate,
  type = "text",
  placeholder,
  className,
  value,
}) => {
  return (
    <div className="flex flex-col justify-center">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disable}
        placeholder={placeholder}
        className={className}
        defaultValue={value}
      />
      {errors[id] && (
        <small className="text-main text-xs">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForm);

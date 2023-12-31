import React from "react";

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  placeholder,
  className,
  label,
}) => {
  return (
    <div className="w-full ">
      <label className="capitalize">{label ? label : nameKey}</label>
      <input
        className={
          className
            ? className
            : "border relative bg-gray-100 py-2 px-4 outline-none w-full rounded-sm placeholder:text-xs text-sm"
        }
        type={type ? type : "text"}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        placeholder={placeholder}
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields?.some((ele) => ele.nameKey === nameKey) && (
        <small className="text-[10px] italic text-main">
          {invalidFields.find((ele) => ele.nameKey === nameKey).mes}
        </small>
      )}
    </div>
  );
};

export default InputField;

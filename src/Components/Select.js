import React, { useId } from "react";

const Select = ({ options, label, className = "", ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        className={`px-3 py-2 rounded-lg outline-none w-full ${className}`}
        {...props}
        ref={ref}
      >
        {options?.map((option) => {
          return (
            <option className="p-2" key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
